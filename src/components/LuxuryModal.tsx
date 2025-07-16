import React from 'react';
import { X } from 'lucide-react';

interface LuxuryModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LuxuryModal: React.FC<LuxuryModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
        style={{ 
          width: 'min(95vw, 1600px)', 
          height: 'min(95vh, 1000px)',
          maxWidth: 'none',
          maxHeight: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-3 transition-colors shadow-lg"
        >
          <X className="w-7 h-7 text-gray-600 dark:text-gray-300" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default LuxuryModal;