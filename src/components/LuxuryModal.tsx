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
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
        style={{ 
          width: '95vw', 
          height: '95vh',
          maxWidth: 'none',
          maxHeight: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default LuxuryModal;