import { useEffect, useRef, useState } from 'react';

export const useLuxuryScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      setIsScrolling(true);
      
      lastScrollY.current = currentScrollY;

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set scroll end timeout
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Parallax calculation
  const getParallaxOffset = (speed: number = 0.5) => {
    return scrollY * speed;
  };

  // Scroll progress for full page
  const getScrollProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    return Math.min(scrollY / totalHeight, 1);
  };

  return {
    scrollY,
    scrollDirection,
    isScrolling,
    getParallaxOffset,
    getScrollProgress,
  };
};