import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  BookOpen,
  Users,
  Award,
  Zap,
  ArrowRight,
  PlayCircle,
  BarChart3
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { indices, topStocks } = useData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Mock data for demonstration
  const portfolioData = {
    value: 105450,
    todayChange: 1250,
    todayChangePercent: 1.2,
    totalReturn: 5450,
    totalReturnPercent: 5.45
  };

  const achievements = [
    { name: 'First Strategy Builder', icon: Target, earned: true },
    { name: 'Risk Management Pro', icon: BarChart3, earned: true },
    { name: 'Community Helper', icon: Users, earned: false },
    { name: 'Profit Maker', icon: TrendingUp, earned: false }
  ];

  const quickActions = [
    { 
      title: 'Build My First Strategy', 
      description: 'Use our no-code builder',
      icon: Target,
      color: 'blue',
      href: '/strategy-builder'
    },
    { 
      title: 'Try a Template', 
      description: 'Start with pre-built strategies',
      icon: Zap,
      color: 'green',
      href: '/templates'
    },
    { 
      title: 'Watch Tutorial', 
      description: 'Learn the basics',
      icon: PlayCircle,
      color: 'purple',
      href: '/learning'
    },
    { 
      title: 'Take Quiz', 
      description: 'Test your knowledge',
      icon: Award,
      color: 'orange',
      href: '/learning/quiz'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {getGreeting()}, {user?.name}!
              </h1>
              <p className="text-blue-100 mb-4">
                You're on Level {user?.level}. Complete 2 more quizzes to unlock advanced strategies!
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm">2/4 quizzes completed</span>
                </div>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Continue Learning
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Learning Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Learning Journey</h3>
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="32" 
                    stroke="#3b82f6" 
                    strokeWidth="6" 
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.3)}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">30%</span>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>3 modules completed</p>
                <p>2 badges earned</p>
                <p>1 certificate pending</p>
              </div>
              <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                Continue Course
              </button>
            </div>
          </div>

          {/* Paper Portfolio */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Paper Portfolio</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                ₹{portfolioData.value.toLocaleString()}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm mb-4">
                <div className="text-green-600">
                  Total Return: +{portfolioData.totalReturnPercent}%
                </div>
                <div className="text-green-600">
                  Today's P&L: +₹{portfolioData.todayChange}
                </div>
              </div>
              <div className="h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xs text-green-700">Portfolio growth chart</span>
              </div>
              <button className="w-full bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors">
                View Portfolio
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">First Strategy Builder</h4>
              <p className="text-sm text-gray-600 mb-4">Created your first trading strategy</p>
              <button className="w-full bg-yellow-50 text-yellow-600 py-2 rounded-lg hover:bg-yellow-100 transition-colors">
                View All Badges
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
              };

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${colorClasses[action.color as keyof typeof colorClasses]} p-6 rounded-xl text-white cursor-pointer transform hover:scale-105 transition-all duration-200`}
                >
                  <Icon className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90 mb-3">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">Beginner Friendly</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Market Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Market Open</span>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">Refresh</button>
            </div>
          </div>

          {/* Indices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {indices.map((index) => (
              <div key={index.symbol} className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-1">{index.name}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {index.value.toLocaleString()}
                </div>
                <div className={`flex items-center justify-center space-x-1 text-sm ${
                  index.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {index.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Top Movers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Movers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-green-600 mb-2">Top Gainers</h4>
                <div className="space-y-2">
                  {topStocks.slice(0, 3).filter(stock => stock.changePercent > 0).map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-600">₹{stock.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-medium">+{stock.changePercent.toFixed(2)}%</div>
                        <div className="text-xs text-gray-500">+₹{stock.change.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-600 mb-2">Top Losers</h4>
                <div className="space-y-2">
                  {topStocks.slice(0, 3).filter(stock => stock.changePercent < 0).map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-600">₹{stock.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-600 font-medium">{stock.changePercent.toFixed(2)}%</div>
                        <div className="text-xs text-gray-500">₹{stock.change.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning & Community Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Course */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white mb-4">
              <h4 className="font-semibold mb-2">Options Trading Basics</h4>
              <p className="text-sm opacity-90 mb-3">Master the fundamentals of options trading</p>
              <div className="flex items-center justify-between text-sm">
                <span>2 hours • 12 lessons</span>
                <span>⭐ 4.8 rating</span>
              </div>
            </div>
            <button className="w-full bg-purple-50 text-purple-600 py-2 rounded-lg hover:bg-purple-100 transition-colors">
              Start Course
            </button>
          </div>

          {/* Community Highlights */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Highlights</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Strategy of the Week</h4>
                <p className="text-sm text-gray-600">Bank Nifty Iron Condor by @OptionsExpert</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900">Top Discussion</h4>
                <p className="text-sm text-gray-600">Risk Management Best Practices (45 comments)</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium text-gray-900">New Members</h4>
                <p className="text-sm text-gray-600">Welcome 127 new traders this week!</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Join Discussions
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;