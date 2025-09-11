import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, TrendingUp, AlertCircle, CheckCircle, Loader2, GraduationCap, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'beginner' | 'pro'>('beginner');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 3) return 'Fair';
    return 'Strong';
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (passwordStrength(formData.password) < 2) {
        setError('Please choose a stronger password');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType,
        phone: formData.phone
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            AlgoForge
          </span>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-400'
              }`}>
                1
              </div>
              <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-blue-500' : 'bg-white/20'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-400'
              }`}>
                2
              </div>
              <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-blue-500' : 'bg-white/20'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-400'
              }`}>
                3
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          {/* Step 1: User Type Selection */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
                <p className="text-gray-300">Choose the path that fits your trading experience</p>
              </div>

              <div className="space-y-4">
                <div 
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                    userType === 'beginner' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-white/20 hover:border-white/40 bg-white/5'
                  }`}
                  onClick={() => setUserType('beginner')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">I'm New to Trading</h3>
                      <p className="text-gray-300 text-sm mb-2">Perfect for beginners who want to learn</p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Guided tutorials and courses</li>
                        <li>• Pre-built strategy templates</li>
                        <li>• Risk-free paper trading</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                    userType === 'pro' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-white/20 hover:border-white/40 bg-white/5'
                  }`}
                  onClick={() => setUserType('pro')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">I'm an Experienced Trader</h3>
                      <p className="text-gray-300 text-sm mb-2">Advanced tools for professional traders</p>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Advanced analytics and tools</li>
                        <li>• Custom strategy builder</li>
                        <li>• Professional risk management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] mt-8"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Basic Information */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
                <p className="text-gray-300">We'll need some basic information to get started</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <div className="bg-white/10 border border-white/20 rounded-l-lg px-3 py-3 text-gray-300 border-r-0">
                      +91
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 bg-white/10 border border-white/20 rounded-r-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400">Password strength</span>
                        <span className={`${passwordStrength(formData.password) >= 3 ? 'text-green-400' : 
                          passwordStrength(formData.password) >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {getPasswordStrengthText(passwordStrength(formData.password))}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength(formData.password))}`}
                          style={{ width: `${(passwordStrength(formData.password) / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div className="mt-1 flex items-center space-x-2">
                      {formData.password === formData.confirmPassword ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      )}
                      <span className={`text-xs ${
                        formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-white/20 text-white py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Final Confirmation */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">You're all set!</h2>
                <p className="text-gray-300">Review your information and create your account</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Account Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Name:</span>
                    <span className="text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email:</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Phone:</span>
                    <span className="text-white">+91 {formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Account Type:</span>
                    <span className="text-white capitalize">{userType}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <h4 className="text-blue-400 font-semibold mb-2">Welcome Benefits</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 100 free backtest credits</li>
                  <li>• 7-day premium trial</li>
                  <li>• Access to beginner courses</li>
                  <li>• Community forum access</li>
                </ul>
              </div>

              <div className="text-xs text-gray-400 mb-6">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>.
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={isLoading}
                  className="flex-1 border border-white/20 text-white py-3 rounded-lg hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                </button>
              </div>
            </form>
          )}

          {step < 3 && (
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;