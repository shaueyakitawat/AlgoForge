import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Brain, 
  Users,
  Star,
  Play,
  CheckCircle,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Header */}
      <header className="px-6 py-4 bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              AlgoForge
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#learning" className="text-gray-300 hover:text-white transition-colors">Learn</a>
            <a href="#community" className="text-gray-300 hover:text-white transition-colors">Community</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Democratizing 
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                {' '}Algorithmic Trading{' '}
              </span>
              for Everyone
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build, backtest, and deploy trading strategies without coding. Learn while earning credits 
              and join thousands of traders transforming their approach to the Indian stock market.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 font-semibold"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          <p className="text-sm text-gray-400">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No-Code Strategy Builder</h3>
            <p className="text-gray-300">
              Visual drag-and-drop interface to build complex trading strategies without writing a single line of code.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Trading Assistant</h3>
            <p className="text-gray-300">
              Get personalized trading insights and strategy recommendations from our advanced AI copilot.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Risk-Free Paper Trading</h3>
            <p className="text-gray-300">
              Test your strategies with virtual money before risking real capital. Perfect for learning and validation.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Earn Credits Learning</h3>
            <p className="text-gray-300">
              Gamified learning platform where you earn credits for completing courses and quizzes to unlock premium features.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="px-6 py-20 bg-black/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            See AlgoForge in Action
          </h2>
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-white/10">
            <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl flex items-center justify-center border border-white/10">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Interactive Demo</h3>
                <p className="text-gray-300">2-minute walkthrough of the platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-300">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">₹50Cr+</div>
              <div className="text-gray-300">Total Volume Traded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-300">User Success Rate</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-white">RK</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Rajesh Kumar</div>
                  <div className="text-sm text-gray-300">Professional Trader</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm">
                "AlgoForge transformed my trading approach. The AI assistant is incredibly helpful, 
                and I've improved my returns by 40% since starting."
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-white">PS</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Priya Sharma</div>
                  <div className="text-sm text-gray-300">Options Specialist</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm">
                "The options analytics tools are phenomenal. I can analyze Greeks, run scenarios, 
                and manage risk better than ever before."
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-white">AM</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Arjun Mehta</div>
                  <div className="text-sm text-gray-300">Algo Trading Enthusiast</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm">
                "Started as a complete beginner. The learning platform is amazing, 
                and now I'm running profitable strategies with confidence."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="px-6 py-16 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">SEBI Compliant</h3>
              <p className="text-gray-300 text-sm">
                Fully compliant with Indian market regulations and SEBI guidelines for algorithmic trading.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Bank-Grade Security</h3>
              <p className="text-gray-300 text-sm">
                Enterprise-level security with encrypted data transmission and secure API integrations.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">99.9% Uptime</h3>
              <p className="text-gray-300 text-sm">
                Reliable platform with high availability and real-time market data connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of traders who are already using AlgoForge to build better strategies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 font-semibold"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/login" 
              className="border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AlgoForge</span>
            </div>
            <p className="text-gray-400 text-sm">
              Democratizing algorithmic trading for everyone in the Indian market.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trading Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 AlgoForge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;