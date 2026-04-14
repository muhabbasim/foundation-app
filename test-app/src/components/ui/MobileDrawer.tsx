import { X } from 'lucide-react';
import { useTranslation } from 'node_modules/react-i18next';
import { type ReactNode, useEffect, useRef } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'full';
}

export const MobileDrawer = ({ isOpen, onClose, title, children, footer, width = 'md' }: MobileDrawerProps) => {
  const { i18n } = useTranslation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';

  // Width classes mapping
  const widthClasses = {
    sm: 'w-64', 
    md: 'w-80', 
    lg: 'w-96', 
    full: 'w-full max-w-md'  // Full width with max constraint
  };

  // Focus trap - focus first focusable element when opened
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/50 dark:bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed top-0 bottom-0 z-50 ${widthClasses[width]} bg-white dark:bg-gray-900 shadow-xl md:hidden transition-transform duration-300 ease-in-out flex flex-col
          ${isRTL ? 'left-0' : 'right-0'}
          ${isOpen 
            ? 'translate-x-0' 
            : isRTL ? '-translate-x-full' : 'translate-x-full'
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </span>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-red-500 focus:text-red-500 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-5 border-t border-gray-100 dark:border-gray-800 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};
