import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Ravindra Chavan | Associate Software Engineer | Java Full Stack Developer",
  description = "Associate Software Engineer & Java Full Stack Developer specializing in Java 21, Spring Boot 3, Spring Security (JWT), Spring Data JPA, MySQL, React, Microservices, and Docker.",
  image = "/images/profile.jpg",
  url = "https://ravindrachavan-portfolio.vercel.app",
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Tags Helper
    const setMetaTag = (attr: string, value: string, content: string) => {
      let element = document.head.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);

    // Open Graph / Facebook
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:site_name', "Ravindra Chavan Portfolio");

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:url', url);

    // 3. Canonical Link
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // 3. JSON-LD Structured Data
    let scriptElement = document.getElementById('jsonld-seo') as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'jsonld-seo';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ravindra Chavan",
      "jobTitle": "Associate Software Engineer & Java Full-Stack Developer",
      "url": url,
      "sameAs": [
        "https://github.com/ravichavan9970",
        "https://www.linkedin.com/in/ravindra-chavan-4ba744250/",
        "https://www.instagram.com/ravi_chavan_2002?igsh=MTBsd2dnN2N0bjlyOA=="
      ],
      "description": description,
      "knowsAbout": [
        "Java 21",
        "Spring Boot 3",
        "Spring Security",
        "JWT",
        "Spring Data JPA",
        "Microservices",
        "MySQL",
        "React",
        "TypeScript",
        "Docker",
        "REST APIs",
        "JUnit 5",
        "Mockito"
      ]
    };

    scriptElement.textContent = JSON.stringify(structuredData);

    return () => {
      // Clean up JSON-LD script if SEO unmounts (optional but good practice)
      // We can leave it as it persists state
    };
  }, [title, description, image, url]);

  return null; // This component works strictly through side effects
}
