import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, AtSign, KeyRound, Brain } from 'lucide-react';
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

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');

  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: '', color: 'bg-surface-light', reqs: { length: false, upper: false, lower: false, num: false, special: false } };
    
    const reqs = {
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      num: /[0-9]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass)
    };
    
    if (reqs.length) score += 20;
    if (reqs.upper) score += 20;
    if (reqs.lower) score += 20;
    if (reqs.num) score += 20;
    if (reqs.special) score += 20;
    
    if (score <= 20) return { score, label: 'Very Weak', color: 'bg-negative', reqs };
    if (score <= 40) return { score, label: 'Weak', color: 'bg-negative', reqs };
    if (score <= 60) return { score, label: 'Fair', color: 'bg-yellow-500', reqs };
    if (score <= 80) return { score, label: 'Good', color: 'bg-primary', reqs };
    return { score, label: 'Strong', color: 'bg-positive', reqs };
  };

  const strength = calculatePasswordStrength(password);

  const isStep1Valid = 
    name.trim() !== '' && 
    email.trim() !== '' && 
    username.trim() !== '' && 
    strength.score === 100 && 
    password === confirmPassword;
    
  const isStep2Valid = otp.trim().length === 6;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid) return;
    
    setLoading(true);
    try {
      await authApi.sendOtp({ username, email });
      toast.success('Verification OTP sent to your email');
      setStep(2);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) return;
    
    setLoading(true);
    try {
      await authApi.register({ name, email, username, password, otp });
      toast.success('Account created! Please login');
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
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Create Account</h2>
            <p className="text-text-secondary text-center">
              {step === 1 ? 'Join CryptoAI to access the knowledge base' : 'Enter the verification code sent to your email'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <Input
                label="Username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<AtSign className="w-5 h-5" />}
                required
              />
              <div className="space-y-1">
                <PasswordInput
                  label="Password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-text-secondary">Password Strength:</span>
                      <span className={`font-semibold ${strength.color.replace('bg-', 'text-')}`}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-light rounded-full overflow-hidden flex gap-0.5">
                      <div className={`h-full ${strength.score >= 20 ? strength.color : 'bg-transparent'} w-1/5 transition-colors duration-300`}></div>
                      <div className={`h-full ${strength.score >= 40 ? strength.color : 'bg-transparent'} w-1/5 transition-colors duration-300`}></div>
                      <div className={`h-full ${strength.score >= 60 ? strength.color : 'bg-transparent'} w-1/5 transition-colors duration-300`}></div>
                      <div className={`h-full ${strength.score >= 80 ? strength.color : 'bg-transparent'} w-1/5 transition-colors duration-300`}></div>
                      <div className={`h-full ${strength.score >= 100 ? strength.color : 'bg-transparent'} w-1/5 transition-colors duration-300`}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1 text-xs mt-2 text-text-muted">
                      <div className={`flex items-center gap-1 ${strength.reqs.length ? 'text-positive' : ''}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${strength.reqs.length ? 'bg-positive' : 'bg-border'}`}></div>
                        8+ characters
                      </div>
                      <div className={`flex items-center gap-1 ${strength.reqs.upper ? 'text-positive' : ''}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${strength.reqs.upper ? 'bg-positive' : 'bg-border'}`}></div>
                        1 uppercase
                      </div>
                      <div className={`flex items-center gap-1 ${strength.reqs.lower ? 'text-positive' : ''}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${strength.reqs.lower ? 'bg-positive' : 'bg-border'}`}></div>
                        1 lowercase
                      </div>
                      <div className={`flex items-center gap-1 ${strength.reqs.num ? 'text-positive' : ''}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${strength.reqs.num ? 'bg-positive' : 'bg-border'}`}></div>
                        1 number
                      </div>
                      <div className={`flex items-center gap-1 ${strength.reqs.special ? 'text-positive' : ''}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${strength.reqs.special ? 'bg-positive' : 'bg-border'}`}></div>
                        1 special char
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <PasswordInput
                label="Confirm Password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-negative text-sm mt-1">Passwords do not match</p>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={!isStep1Valid || loading}
                isLoading={loading}
              >
                Send Verification OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4 fade-in">
              <div className="bg-background/50 border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-text-secondary mb-1">Creating account for:</p>
                <p className="font-medium text-text-primary">{name}</p>
                <p className="font-medium text-text-primary">{email}</p>
                <p className="font-medium text-text-primary">@{username}</p>
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
                Create Account
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-light font-medium transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
