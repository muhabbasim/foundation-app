interface HamburgerButtonProps {
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Reusable Hamburger Menu Button
 * - Animated hamburger icon
 * - Accessible
 * - Customizable
 */
export const HamburgerButton = ({ 
  onClick, 
  isOpen = false, 
  className = '',
  ariaLabel = 'Toggle menu'
}: HamburgerButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <div className="relative w-5 h-4">
        <span 
          className={`absolute h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'w-full top-1.5 rotate-45' 
              : 'w-1/2 top-0'
          }`} 
        />
        <span 
          className={`absolute h-0.5 w-full bg-current rounded-full transition-all duration-300 ease-in-out top-1.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        <span 
          className={`absolute h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'w-full top-1.5 -rotate-45' 
              : 'w-3/4 top-3'
          }`} 
        />
      </div>
    </button>
  );
};
