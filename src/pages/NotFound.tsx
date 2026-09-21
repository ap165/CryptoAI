import type React from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageSquare } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black text-primary/10 tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              Page Not Found
            </h2>
          </div>
        </div>
        
        <p className="text-text-secondary text-lg">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/chat" className="w-full sm:w-auto">
            <Button className="w-full flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Go to Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
