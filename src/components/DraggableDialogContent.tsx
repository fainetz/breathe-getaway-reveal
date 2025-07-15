import React, { useRef, useState } from 'react';
import { DialogClose } from '@/components/ui/dialog';

interface DraggableDialogContentProps {
  children: React.ReactNode;
}

const DraggableDialogContent: React.FC<DraggableDialogContentProps> = ({ children }) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setCurrentY(touch.clientY);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setCurrentY(touch.clientY);
      setDragOffset(deltaY);
      
      // Apply transform for visual feedback with resistance
      if (contentRef.current) {
        const resistance = Math.min(deltaY * 0.8, 200); // Add resistance and cap movement
        contentRef.current.style.transform = `translateY(${resistance}px)`;
        contentRef.current.style.opacity = `${Math.max(0.3, 1 - deltaY / 400)}`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentY - startY;
    setIsDragging(false);
    setDragOffset(0);
    
    // Reset transform with animation
    if (contentRef.current) {
      contentRef.current.style.transform = '';
      contentRef.current.style.opacity = '';
      contentRef.current.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      
      // Remove transition after animation
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = '';
        }
      }, 300);
    }
    
    // Close dialog if dragged down enough (more than 80px) or with sufficient velocity
    if (deltaY > 80) {
      // Find the dialog close button more reliably
      const dialogContent = contentRef.current?.closest('[role="dialog"]');
      const closeButton = dialogContent?.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
      
      if (closeButton) {
        closeButton.click();
      } else {
        // Fallback: dispatch escape key
        const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escEvent);
      }
    }
  };

  // Also handle the entire dialog content area for swipe down
  const handleContentTouchStart = (e: React.TouchEvent) => {
    // Only start drag if we're at the top of the scrollable content
    const target = e.target as HTMLElement;
    const scrollableElement = target.closest('[data-scrollable]') as HTMLElement;
    
    if (!scrollableElement || scrollableElement.scrollTop === 0) {
      handleTouchStart(e);
    }
  };

  return (
    <div 
      ref={contentRef}
      className="relative transition-none"
      onTouchStart={handleContentTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile drag handle */}
      <div 
        className="sm:hidden flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-12 h-1.5 bg-white/40 rounded-full hover:bg-white/60 transition-colors duration-200 shadow-sm"></div>
      </div>

      <div data-scrollable>{children}</div>
    </div>
  );
};

export default DraggableDialogContent;