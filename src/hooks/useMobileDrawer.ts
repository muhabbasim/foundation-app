import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for managing mobile drawer state with accessibility features
 * - Handles open/close state
 * - Locks body scroll when open
 * - Closes on route change
 * - Supports Escape key to close
 */
export const useMobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
      
      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        // Unlock scroll
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
};
