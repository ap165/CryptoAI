import type React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Brain, MessageSquare, UserCircle, LogOut, X, Trash2, History } from 'lucide-react';
import { useGlobalChat } from '../../context/ChatContext';

interface SidebarProps {
  onLogout: () => void;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, onClose }) => {
  const { sessions, activeSessionId, loadSession, deleteSession } = useGlobalChat();
  const navigate = useNavigate();

  return (
    <aside className="bg-surface border-r border-border h-screen flex flex-col w-64">
      <div className="flex items-center justify-between px-4 py-6 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-lg font-bold text-text-primary">CryptoAI</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="py-4 flex flex-col gap-2 flex-shrink-0">
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all ${
              isActive
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
            }`
          }
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">AI Chat</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all ${
              isActive
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
            }`
          }
        >
          <UserCircle className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </NavLink>
      </nav>

      {/* Chat History Section */}
      <div className="flex-1 flex flex-col min-h-0 border-t border-border mt-2">
        <div className="px-4 py-3 flex items-center gap-2 text-text-secondary">
          <History className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Past Chats</span>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {sessions.length === 0 ? (
            <div className="text-center py-4 text-text-muted text-xs">
              No past chats found.
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {sessions.map((session) => (
                <div 
                  key={session.id}
                  className={`group relative flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors ${
                    activeSessionId === session.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-surface-light text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => {
                    loadSession(session.id);
                    navigate('/chat');
                    if (onClose) onClose();
                  }}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{session.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Delete this chat?')) {
                        deleteSession(session.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-text-muted hover:text-negative hover:bg-surface rounded-md transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-4 pb-4 px-4 flex-shrink-0">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-text-muted hover:text-negative hover:bg-surface-light transition-all text-left font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
