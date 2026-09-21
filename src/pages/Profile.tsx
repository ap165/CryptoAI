import type React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Hash, Mail, Shield } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const getInitial = (name?: string) => (name ? name.charAt(0).toUpperCase() : 'U');

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300 pb-10">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Your Profile</h1>
          <p className="text-text-secondary mt-1">Manage your account settings and preferences.</p>
        </header>

        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg flex-shrink-0">
              {getInitial(user?.name || user?.username)}
            </div>
            <div className="flex-1 space-y-2 pt-1 md:pt-2">
              <h2 className="text-2xl font-bold text-text-primary">{user?.name || 'Crypto User'}</h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-text-secondary">
                <Hash className="w-4 h-4" />
                <span className="font-medium">@{user?.username || 'user'}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span>{user?.email || 'user@example.com'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Account Details
          </h3>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-border">
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="text-text-secondary font-medium">Name</span>
                <span className="text-text-primary font-medium">{user?.name || 'Not provided'}</span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="text-text-secondary font-medium">Username</span>
                <span className="text-text-primary font-medium">{user?.username || 'Not provided'}</span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="text-text-secondary font-medium">Email Address</span>
                <span className="text-text-primary font-medium">{user?.email || 'Not provided'}</span>
              </div>
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="text-text-secondary font-medium">Account Status</span>
                <span className="text-positive font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-positive"></span>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border mt-8">
          <div className="bg-surface-light border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-text-primary text-lg">Sign Out</h4>
              <p className="text-sm text-text-secondary">Log out of your current session.</p>
            </div>
            <Button 
              variant="danger" 
              onClick={logout}
              className="w-full sm:w-auto min-w-[120px]"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
