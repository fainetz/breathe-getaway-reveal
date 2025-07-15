import React, { useRef, useState } from 'react';
import { DialogClose } from '@/components/ui/dialog';

interface DraggableDialogContentProps {
  children: React.ReactNode;
}

const DraggableDialogContent: React.FC<DraggableDialogContentProps> = ({ children }) => {
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const updatePosition = (deltaY: number) => {
    if (!contentRef.current) return;
    
    // Ultra-smooth resistance with better curve
    const resistance = deltaY > 0 ? Math.min(deltaY * 0.4, 120) : 0;
    const opacity = deltaY > 0 ? Math.max(0.7, 1 - (deltaY * 0.0008)) : 1;
    
    // Use transform only for better performance
    contentRef.current.style.transform = `translate3d(0, ${resistance}px, 0) scale(${Math.max(0.98, 1 - deltaY * 0.0001)})`;
    contentRef.current.style.opacity = `${opacity}`;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setIsDragging(true);
    
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Remove transitions for immediate response
    if (contentRef.current) {
      contentRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Prevent scroll
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY;
    
    // Use requestAnimationFrame for smooth updates
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      updatePosition(deltaY);
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.changedTouches[0];
    const deltaY = touch.clientY - startY;
    setIsDragging(false);
    
    // Cancel animation frame
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Add smooth transition back
    if (contentRef.current) {
      contentRef.current.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Close dialog if dragged down enough (lower threshold for easier closing)
    if (deltaY > 60) {
      // Find and trigger close
      const dialogContent = contentRef.current?.closest('[role="dialog"]');
      const closeButton = dialogContent?.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
      
      if (closeButton) {
        closeButton.click();
      }
    } else {
      // Spring back smoothly
      updatePosition(0);
      
      // Remove transition after spring back
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = '';
        }
      }, 400);
    }
  };

  // Handle swipe on content area only when at scroll top
  const handleContentTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const scrollableElement = target.closest('[data-scrollable]') as HTMLElement;
    
    if (!scrollableElement || scrollableElement.scrollTop <= 5) {
      handleTouchStart(e);
    }
  };

  return (
    <div 
      ref={contentRef}
      className="relative will-change-transform"
      onTouchStart={handleContentTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Mobile drag handle */}
      <div 
        className="sm:hidden flex justify-center pt-4 pb-3 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-10 h-1 bg-white/50 rounded-full shadow-sm"></div>
      </div>

      <div data-scrollable>{children}</div>
    </div>
  );
};

export default DraggableDialogContent;