import { useEffect, useRef } from 'react';

export const useScrollEffects = () => {
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (docHeight - windowHeight);
      
      // Only update if scroll distance is significant to reduce glitching
      const scrollDelta = Math.abs(scrollY - lastScrollY.current);
      if (scrollDelta < 5) return;
      
      lastScrollY.current = scrollY;

      // Gentle scale effects (reduced intensity)
      const scaleElements = document.querySelectorAll('.scroll-scale');
      scaleElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(centerY - windowHeight / 2);
        const maxDistance = windowHeight;
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        
        // Much gentler scaling to prevent glitching
        const scale = 1 + (1 - normalizedDistance) * 0.05; // Reduced from 0.3 to 0.05
        const opacity = Math.max(0.8, 1 - normalizedDistance * 0.2); // Reduced intensity
        
        (element as HTMLElement).style.transform = `scale(${scale})`;
        (element as HTMLElement).style.opacity = opacity.toString();
      });

      // Subtle parallax (reduced movement)
      const parallaxElements = document.querySelectorAll('.scroll-parallax');
      parallaxElements.forEach((element, index) => {
        const speed = (index % 3 + 1) * 0.1; // Reduced from 0.3 to 0.1
        const yPos = -(scrollY * speed);
        
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      // Gentle reveal animations
      const revealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });

      // Subtle text scaling (much reduced)
      const textElements = document.querySelectorAll('.scroll-text-scale');
      textElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        
        const fontSize = 1 + progress * 0.1; // Reduced from 0.5 to 0.1
        
        (element as HTMLElement).style.fontSize = `${fontSize}em`;
      });
    };

    // Better throttling to prevent rapid updates
    const scrollHandler = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Use passive scrolling for better performance
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
};