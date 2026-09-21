import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { KeyRound, User, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../api/auth';
import { Input } from '../components/common/Input';
import { PasswordInput } from '../components/common/PasswordInput';
import { Button } from '../components/common/Button';

const getErrorMessage = (error: any): string => {
  if (error.response?.data) {
    if (typeof error.response.data.detail === 'string') {
      return error.response.data.detail;
    }
    if (Array.isArray(error.response.data.detail)) {
      return error.response.data.detail.map((err: any) => err.msg).join(', ');
    }
    if (error.response.data.message) {
      return error.response.data.message;
    }
  }
  return error.message || 'An unexpected error occurred';
};

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { username?: string; email?: string } | null;
  
  const [loading, setLoading] = useState(false);
  
  const [username, setUsername] = useState(state?.username || '');
  const [email, setEmail] = useState(state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const isValid = 
    username.trim() !== '' && 
    email.trim() !== '' &&
    otp.trim().length === 6 &&
    newPass.length >= 6 &&
    newPass === confirmPass;

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    setLoading(true);
    try {
      await authApi.resetPassword({ username, email, otp, newPass });
      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl shadow-black/50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Reset Password</h2>
            <p className="text-text-secondary text-center">
              Enter your reset code and choose a new password
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4">
            {(!state?.username || !state?.email) && (
              <>
                <Input
                  label="Username"
                  type="text"
                  placeholder="yourusername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  icon={<User className="w-5 h-5" />}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                  required
                />
              </>
            )}

            {(state?.username && state?.email) && (
              <div className="bg-background/50 border border-border rounded-lg p-4 mb-4">
                <p className="text-sm text-text-secondary mb-1">Resetting password for:</p>
                <p className="font-medium text-text-primary">{username}</p>
                <p className="font-medium text-text-primary">{email}</p>
              </div>
            )}

            <Input
              label="Reset Code (OTP)"
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              icon={<KeyRound className="w-5 h-5" />}
              maxLength={6}
              required
            />
            <PasswordInput
              label="New Password"
              placeholder="At least 6 characters"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
            <PasswordInput
              label="Confirm New Password"
              placeholder="Repeat new password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
            
            {newPass && confirmPass && newPass !== confirmPass && (
              <p className="text-negative text-sm mt-1">Passwords do not match</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              disabled={!isValid || loading}
              isLoading={loading}
            >
              Reset Password
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="text-text-secondary hover:text-primary transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
