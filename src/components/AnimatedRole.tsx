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

  return (
    <span className={`inline-flex items-center select-none font-mono ${className}`}>
      <span className="font-bold tracking-wide bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 dark:from-sky-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
        {displayText}
      </span>
      <span 
        className="animate-typewriter-blink ml-1 text-sky-600 dark:text-sky-400 font-normal select-none"
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
}
