import React, { useRef, useState } from 'react';
import { DialogClose } from '@/components/ui/dialog';

interface DraggableDialogContentProps {
  children: React.ReactNode;
}

const DraggableDialogContent: React.FC<DraggableDialogContentProps> = ({ children }) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setCurrentY(touch.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setCurrentY(touch.clientY);
      
      // Apply transform for visual feedback
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${deltaY}px)`;
        contentRef.current.style.opacity = `${Math.max(0.5, 1 - deltaY / 300)}`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentY - startY;
    setIsDragging(false);
    
    // Reset transform
    if (contentRef.current) {
      contentRef.current.style.transform = '';
      contentRef.current.style.opacity = '';
    }
    
    // Close dialog if dragged down enough (more than 100px)
    if (deltaY > 100) {
      // Trigger dialog close
      const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  };

  return (
    <div 
      ref={contentRef}
      className="relative transition-transform duration-200 ease-out"
    >
      {/* Mobile drag handle */}
      <div 
        className="sm:hidden flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-12 h-1 bg-white/30 rounded-full hover:bg-white/40 transition-colors duration-200"></div>
      </div>

      {children}
    </div>
  );
};

export default DraggableDialogContent;