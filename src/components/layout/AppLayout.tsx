import type React from 'react';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuth } from '../../context/AuthContext';

export const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const closeMenu = () => setIsMobileMenuOpen(false);
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const getPageTitle = () => {
    if (location.pathname.startsWith('/chat')) return 'AI Chat';
    if (location.pathname.startsWith('/profile')) return 'Profile';
    return 'CryptoAI';
  };

  return (
    <div className="flex h-screen bg-background text-text-primary overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar onLogout={handleLogout} />
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={closeMenu} 
          />
          <div className="relative h-full w-64 bg-surface animate-in slide-in-from-left duration-200 shadow-xl">
            <Sidebar onLogout={handleLogout} onClose={closeMenu} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 md:ml-0">
        <Topbar 
          onMenuToggle={toggleMenu} 
          title={getPageTitle()} 
          username={user?.username} 
        />
        <main className="flex-1 overflow-hidden relative flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
