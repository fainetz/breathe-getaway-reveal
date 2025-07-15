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
    
    // Follow finger position directly with slight resistance
    const resistance = deltaY > 0 ? deltaY * 0.8 : 0;
    const opacity = deltaY > 0 ? Math.max(0.3, 1 - (deltaY * 0.002)) : 1;
    const scale = deltaY > 0 ? Math.max(0.85, 1 - (deltaY * 0.0003)) : 1;
    
    // Use transform only for better performance
    contentRef.current.style.transform = `translate3d(0, ${resistance}px, 0) scale(${scale})`;
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
      // Find and trigger close using DialogClose or ESC key
      const dialogContent = contentRef.current?.closest('[role="dialog"]');
      let closeButton = dialogContent?.querySelector('[data-radix-dialog-close]') as HTMLButtonElement;
      
      if (!closeButton) {
        // Fallback: trigger ESC key to close dialog
        const escEvent = new KeyboardEvent('keydown', {
          key: 'Escape',
          code: 'Escape',
          keyCode: 27,
          which: 27,
          bubbles: true,
          cancelable: true
        });
        document.dispatchEvent(escEvent);
      } else {
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

      {/* Hidden DialogClose for programmatic access */}
      <DialogClose asChild>
        <button 
          className="hidden" 
          data-radix-dialog-close 
          aria-label="Close"
        />
      </DialogClose>
      
      <div data-scrollable>{children}</div>
    </div>
  );
};

export default DraggableDialogContent;