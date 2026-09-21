import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, KeyRound, Brain } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
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

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const isStep1Valid = email.trim() !== '' && username.trim() !== '' && password.trim() !== '';
  const isStep2Valid = otp.trim().length === 6;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid) return;
    
    setLoading(true);
    try {
      await authApi.sendLoginOtp({ username, email });
      toast.success('Login OTP sent to your email');
      setStep(2);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) return;
    
    setLoading(true);
    try {
      await login({ username, email, password, otp });
      // Redirect handled in auth context usually, or do it here if context doesn't
      navigate('/');
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
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome Back</h2>
            <p className="text-text-secondary text-center">
              {step === 1 ? 'Enter your credentials to access your account' : 'Enter the verification code sent to your email'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
                required
              />
              <Input
                label="Username"
                type="text"
                placeholder="yourusername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User className="w-5 h-5" />}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-light transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={!isStep1Valid || loading}
                isLoading={loading}
              >
                Send Login OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 fade-in">
              <div className="bg-background/50 border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-text-secondary mb-1">Logging in as:</p>
                <p className="font-medium text-text-primary">{username}</p>
                <p className="font-medium text-text-primary">{email}</p>
              </div>
              
              <Input
                label="Verification Code (OTP)"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                icon={<KeyRound className="w-5 h-5" />}
                maxLength={6}
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={!isStep2Valid || loading}
                isLoading={loading}
              >
                Login
              </Button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-sm text-primary hover:text-primary-light transition-colors"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-light font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
