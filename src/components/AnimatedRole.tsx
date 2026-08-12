import { useState, useEffect } from 'react';

interface AnimatedRoleProps {
  className?: string;
}

const ROLES = [
  "Java Full Stack Developer",
  "Associate Software Engineer",
  "Spring Boot 3 & Microservices",
  "High-Concurrency Systems & REST APIs"
];

export default function AnimatedRole({ className = "" }: AnimatedRoleProps) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Monitor theme changes to apply appropriate text color fallbacks and text-shadows
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedMode === 'dark';
  });

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    window.addEventListener('themechange', checkTheme);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('themechange', checkTheme);
      observer.disconnect();
    };
  }, []);

  // Typewriter core animation loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentFullText = ROLES[roleIndex];

    if (!isDeleting) {
      // Type letter-by-letter (70ms speed)
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 70);
      } else {
        // Pause for 2 seconds after complete text
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Delete letter-by-letter (40ms speed)
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 40);
      } else {
        // Switch to the next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const textStyle = {
    background: "linear-gradient(90deg, #38BDF8 0%, #60A5FA 30%, #8B5CF6 65%, #EC4899 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: isDarkMode ? "#F8FAFC" : "#0F172A",
    textShadow: isDarkMode 
      ? "0 0 10px rgba(56, 189, 248, 0.25), 0 0 20px rgba(139, 92, 246, 0.20), 0 0 30px rgba(236, 72, 153, 0.15)" 
      : "none",
    fontWeight: 700,
    letterSpacing: "0.02em",
    lineHeight: "1.2",
    opacity: 1,
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`} style={{ opacity: 1 }}>
      <span style={textStyle}>
        {displayText}
      </span>
      <span 
        className="animate-typewriter-blink ml-1"
        style={{
          color: isDarkMode ? "#60A5FA" : "#3B82F6",
          fontWeight: 400,
          lineHeight: "1.2",
        }}
      >
        |
      </span>
    </div>
  );
}
