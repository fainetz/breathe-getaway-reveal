import { useEffect } from 'react';

export const useScrollEffects = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (docHeight - windowHeight);
      
      // Scale effects for hero elements
      const scaleElements = document.querySelectorAll('.scroll-scale');
      scaleElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(centerY - windowHeight / 2);
        const maxDistance = windowHeight;
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        
        // Scale based on distance from center
        const scale = 1 + (1 - normalizedDistance) * 0.3;
        const opacity = Math.max(0.3, 1 - normalizedDistance * 0.7);
        
        (element as HTMLElement).style.transform = `scale(${scale})`;
        (element as HTMLElement).style.opacity = opacity.toString();
      });

      // Rotate effects
      const rotateElements = document.querySelectorAll('.scroll-rotate');
      rotateElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const rotation = progress * 360 * (index % 2 === 0 ? 1 : -1);
        
        (element as HTMLElement).style.transform = `rotate(${rotation}deg)`;
      });

      // Size morphing effects
      const morphElements = document.querySelectorAll('.scroll-morph');
      morphElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        
        const width = 100 + progress * 50; // Grow from 100% to 150%
        const height = 100 - progress * 20; // Shrink height slightly
        const borderRadius = progress * 50; // Increase border radius
        
        (element as HTMLElement).style.width = `${width}%`;
        (element as HTMLElement).style.height = `${height}%`;
        (element as HTMLElement).style.borderRadius = `${borderRadius}px`;
      });

      // Parallax depth layers
      const parallaxElements = document.querySelectorAll('.scroll-parallax');
      parallaxElements.forEach((element, index) => {
        const speed = (index % 4 + 1) * 0.3;
        const yPos = -(scrollY * speed);
        const scale = 1 + scrollPercent * 0.1 * (index % 2 === 0 ? 1 : -1);
        
        (element as HTMLElement).style.transform = `translateY(${yPos}px) scale(${scale})`;
      });

      // Text size effects
      const textElements = document.querySelectorAll('.scroll-text-scale');
      textElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        
        const fontSize = 1 + progress * 0.5; // Grow text up to 150%
        const letterSpacing = progress * 3; // Increase letter spacing
        
        (element as HTMLElement).style.fontSize = `${fontSize}em`;
        (element as HTMLElement).style.letterSpacing = `${letterSpacing}px`;
      });

      // 3D perspective effects
      const perspectiveElements = document.querySelectorAll('.scroll-perspective');
      perspectiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distanceFromCenter = centerY - windowHeight / 2;
        const maxDistance = windowHeight / 2;
        const normalizedDistance = distanceFromCenter / maxDistance;
        
        const rotateX = normalizedDistance * 45; // Tilt based on position
        const translateZ = Math.abs(normalizedDistance) * 100;
        
        (element as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
      });

      // Reveal animations with scale
      const revealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });

      // Dynamic background scaling
      const backgroundElements = document.querySelectorAll('.scroll-bg-scale');
      backgroundElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        
        const scale = 100 + progress * 20; // Background grows as it comes into view
        (element as HTMLElement).style.backgroundSize = `${scale}%`;
      });
    };

    // Throttle scroll events for performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initial call to set up elements
    handleScroll();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
};