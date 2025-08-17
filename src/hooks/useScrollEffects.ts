import { useEffect } from 'react';

export const useScrollEffects = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Parallax effects
      const parallaxElements = document.querySelectorAll('.scroll-parallax');
      parallaxElements.forEach((element, index) => {
        const speed = (index % 3 + 1) * 0.5; // Different speeds for variety
        const yPos = -(scrollY * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      // Reveal animations
      const revealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });

      // Dynamic lighting based on scroll position
      const lightingElements = document.querySelectorAll('.luxury-lighting, .luxury-lighting-dark');
      lightingElements.forEach((element) => {
        const scrollPercent = scrollY / (document.documentElement.scrollHeight - windowHeight);
        const brightness = 1 + (scrollPercent * 0.2);
        const contrast = 1 + (scrollPercent * 0.1);
        (element as HTMLElement).style.filter = `brightness(${brightness}) contrast(${contrast})`;
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