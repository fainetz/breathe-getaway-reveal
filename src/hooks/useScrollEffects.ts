import { useEffect } from 'react';

export const useScrollEffects = () => {
  useEffect(() => {
    // Simple, clean scroll handler without complex animations
    const handleScroll = () => {
      // Only handle basic reveal animations to avoid conflicts
      const revealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('revealed');
        }
      });
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};