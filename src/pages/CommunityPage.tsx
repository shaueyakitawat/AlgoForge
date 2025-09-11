import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Users, 
  MessageSquare, 
  Star,
  TrendingUp,
  Trophy,
  Filter,
  Search,
  ThumbsUp,
  Eye,
  Clock
} from 'lucide-react';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'discussions' | 'competitions'>('marketplace');

  const strategies = [
    {
      id: 1,
      title: 'Bank Nifty Iron Condor Pro',
      author: 'OptionsExpert_91',
      authorVerified: true,
      price: 999,
      rating: 4.8,
      reviews: 89,
      downloads: 1234,
      returns: '+127%',
      winRate: '78%',
      description: 'Consistent weekly income through systematic iron condor deployment',
      tags: ['Options', 'Weekly Income', 'Conservative'],
      image: 'gradient-from-blue-500-to-purple-600'
    },
    {
      id: 2,
      title: 'Momentum Breakout System',
      author: 'TrendFollower',
      authorVerified: false,
      price: 0,
      rating: 4.5,
      reviews: 156,
      downloads: 2341,
      returns: '+89%',
      winRate: '65%',
      description: 'Capture strong momentum moves with volume confirmation',
      tags: ['Momentum', 'Breakout', 'High Frequency'],
      image: 'gradient-from-green-500-to-teal-600'
    },
    {
      id: 3,
      title: 'Mean Reversion Master',
      author: 'QuantTrader',
      authorVerified: true,
      price: 1499,
      rating: 4.9,
      reviews: 67,
      downloads: 892,
      returns: '+156%',
      winRate: '72%',
      description: 'Sophisticated mean reversion strategy with dynamic position sizing',
      tags: ['Mean Reversion', 'Quantitative', 'Advanced'],
      image: 'gradient-from-purple-500-to-pink-600'
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best risk management practices for options trading?',
      author: 'NewTrader123',
      replies: 23,
      views: 456,
      lastActivity: '2 hours ago',
      category: 'Risk Management',
      isHot: true
    },
    {
      id: 2,
      title: 'Bank Nifty vs Nifty - Which is better for algo trading?',
      author: 'AlgoExpert',
      replies: 18,
      views: 234,
      lastActivity: '5 hours ago',
      category: 'Strategy Discussion',
      isHot: false
    },
    {
      id: 3,
      title: 'How to backtest strategies with options data?',
      author: 'DataScientist',
      replies: 31,
      views: 678,
      lastActivity: '1 day ago',
      category: 'Technical Help',
      isHot: true
    }
  ];

  const competitions = [
    {
      id: 1,
      title: 'August Algo Challenge',
      description: 'Best performing strategy wins ₹50,000',
      participants: 234,
      prize: '₹50,000',
      timeLeft: '8 days',
      status: 'active'
    },
    {
      id: 2,
      title: 'Options Mastery Contest',
      description: 'Showcase your options trading skills',
      participants: 156,
      prize: '₹25,000',
      timeLeft: '15 days',
      status: 'active'
    },
    {
      id: 3,
      title: 'Risk-Adjusted Returns',
      description: 'Highest Sharpe ratio wins',
      participants: 89,
      prize: '₹15,000',
      timeLeft: 'Ended',
      status: 'completed'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Community</h1>
            <p className="text-gray-600">Connect, share, and learn with fellow traders</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>10,234 active members</span>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">10.2K</div>
            <div className="text-sm text-gray-600">Active Traders</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1.5K</div>
            <div className="text-sm text-gray-600">Strategies Shared</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">8.9K</div>
            <div className="text-sm text-gray-600">Discussions</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹2.5L</div>
            <div className="text-sm text-gray-600">Monthly Prizes</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'marketplace', label: 'Strategy Marketplace', count: strategies.length },
              { id: 'discussions', label: 'Discussions', count: discussions.length },
              { id: 'competitions', label: 'Competitions', count: competitions.filter(c => c.status === 'active').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Strategy Marketplace */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search strategies..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Share Strategy
              </button>
            </div>

            {/* Strategy Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {strategies.map((strategy) => (
                <div key={strategy.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  {/* Strategy Preview */}
                  <div className={`h-32 bg-${strategy.image} rounded-lg mb-4 flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm">Strategy Preview</div>
                    </div>
                  </div>

                  {/* Strategy Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{strategy.title}</h3>
                      {strategy.price === 0 ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-medium">
                          FREE
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">₹{strategy.price}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-600">by</span>
                      <span className="text-sm font-medium text-gray-900">{strategy.author}</span>
                      {strategy.authorVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {strategy.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{strategy.returns}</div>
                      <div className="text-xs text-gray-600">Returns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{strategy.winRate}</div>
                      <div className="text-xs text-gray-600">Win Rate</div>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{strategy.rating}</span>
                      <span className="text-sm text-gray-500">({strategy.reviews})</span>
                    </div>
                    <span className="text-sm text-gray-600">{strategy.downloads} downloads</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      {strategy.price === 0 ? 'Download' : 'Buy Now'}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discussions */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Categories</option>
                  <option>Strategy Discussion</option>
                  <option>Risk Management</option>
                  <option>Technical Help</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Discussion
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {discussions.map((discussion, index) => (
                <div key={discussion.id} className={`p-6 ${index !== discussions.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{discussion.title}</h3>
                        {discussion.isHot && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-xs font-medium">
                            🔥 Hot
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>by <span className="font-medium">{discussion.author}</span></span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{discussion.category}</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{discussion.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 text-gray-400 hover:text-gray-600">
                      <ThumbsUp className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competitions */}
        {activeTab === 'competitions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {competitions.map((competition) => (
                <div 
                  key={competition.id} 
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
                    competition.status === 'active' 
                      ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{competition.title}</h3>
                      <p className="text-gray-600 mb-3">{competition.description}</p>
                    </div>
                    {competition.status === 'active' && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{competition.participants}</div>
                      <div className="text-sm text-gray-600">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{competition.prize}</div>
                      <div className="text-sm text-gray-600">Prize Pool</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        competition.status === 'active' ? 'text-orange-600' : 'text-gray-600'
                      }`}>
                        {competition.timeLeft}
                      </div>
                      <div className="text-sm text-gray-600">
                        {competition.status === 'active' ? 'Time Left' : 'Status'}
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={competition.status !== 'active'}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      competition.status === 'active'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {competition.status === 'active' ? 'Join Competition' : 'Competition Ended'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;