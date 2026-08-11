export interface GitHubUserData {
  publicRepos: number;
  htmlUrl: string;
  avatarUrl: string;
  bio: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
}

const CACHE_KEY_USER = 'github_user_data';
const CACHE_KEY_REPOS = 'github_repos_data';
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes cache

export async function fetchGitHubProfile(): Promise<{ user: GitHubUserData; repos: GitHubRepo[] }> {
  // Check cache first
  try {
    const cachedUser = localStorage.getItem(CACHE_KEY_USER);
    const cachedRepos = localStorage.getItem(CACHE_KEY_REPOS);
    const cachedTime = localStorage.getItem('github_cache_time');
    
    if (cachedUser && cachedRepos && cachedTime) {
      const parsedTime = parseInt(cachedTime, 10);
      if (!isNaN(parsedTime) && (Date.now() - parsedTime < CACHE_TIMEOUT)) {
        return {
          user: JSON.parse(cachedUser),
          repos: JSON.parse(cachedRepos),
        };
      }
    }
  } catch (e) {
    console.error('Failed to read from localStorage cache:', e);
  }

  // Fetch from official GitHub API
  const userResponse = await fetch('https://api.github.com/users/ravichavan9970');
  if (!userResponse.ok) {
    if (userResponse.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw new Error(`Failed to fetch user: ${userResponse.statusText}`);
  }
  const userData = await userResponse.json();

  const reposResponse = await fetch('https://api.github.com/users/ravichavan9970/repos');
  if (!reposResponse.ok) {
    if (reposResponse.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw new Error(`Failed to fetch repos: ${reposResponse.statusText}`);
  }
  const reposData: any[] = await reposResponse.json();

  const user: GitHubUserData = {
    publicRepos: userData.public_repos,
    htmlUrl: userData.html_url,
    avatarUrl: userData.avatar_url,
    bio: userData.bio || '',
  };

  const repos: GitHubRepo[] = reposData.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    url: repo.html_url,
  }));

  // Cache response
  try {
    localStorage.setItem(CACHE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(CACHE_KEY_REPOS, JSON.stringify(repos));
    localStorage.setItem('github_cache_time', Date.now().toString());
  } catch (e) {
    console.error('Failed to write to localStorage cache:', e);
  }

  return { user, repos };
}
