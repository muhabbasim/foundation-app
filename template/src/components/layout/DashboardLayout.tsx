import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../app/store/useAuthStore';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { HamburgerButton } from '../ui/HamburgerButton';
import { useMobileDrawer } from '../../hooks/useMobileDrawer';
import { ROLE_NAVIGATION } from '../../app/router/navigationConfig';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { isOpen: isMobileOpen, open: openMobile, close: closeMobile } = useMobileDrawer();

  // Desktop collapse state (persisted)
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebarExpanded');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', String(isExpanded));
  }, [isExpanded]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user ? ROLE_NAVIGATION[user.role] : [];
  const isRTL = i18n.language === 'ar';

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 w-full overflow-hidden transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside 
        role="navigation"
        aria-label="Main navigation"
        className={`shrink-0 fixed md:relative top-0 bottom-0 z-50 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out
          ${isRTL ? 'border-l' : 'border-r'}
          ${isExpanded ? 'w-64' : 'w-20'} 
          ${isMobileOpen 
            ? 'translate-x-0' 
            : isRTL ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'
          }
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            
            {isExpanded && (
              <div className="flex flex-col whitespace-nowrap transition-opacity duration-300">
                <span className="font-bold font-sans text-emerald-800 dark:text-emerald-400">AppName</span>
                <span className="text-[10px] text-gray-500 capitalize">{user?.role.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button 
            onClick={closeMobile}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-red-500 focus:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {isExpanded && <div className="px-3 pb-2 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Menu</div>}
          
          {navItems?.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobile}
              title={!isExpanded ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full p-2.5 rounded-xl transition-all duration-200 font-medium text-sm group focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isActive 
                    ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                } ${!isExpanded ? 'justify-center' : ''}`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              
              {isExpanded && (
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
          <button 
            onClick={handleLogout}
            title={!isExpanded ? "Logout" : undefined}
            className={`flex items-center gap-3 w-full p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 ${!isExpanded ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isExpanded && <span className="whitespace-nowrap overflow-hidden">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header & Desktop Toolbar */}
        <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <HamburgerButton 
              onClick={openMobile}
              isOpen={isMobileOpen}
              className="md:hidden"
              ariaLabel="Open sidebar"
            />
            <h1 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 md:hidden">AppName</h1>
          </div>

          {/* Desktop Collapse Toggle */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isRTL 
              ? (isExpanded ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)
              : (isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />)
            }
          </button>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse ml-auto rtl:ml-0 rtl:mr-auto">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
