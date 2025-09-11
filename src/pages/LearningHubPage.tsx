import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Play, 
  CheckCircle,
  Lock,
  Star,
  Trophy,
  Target,
  BarChart3,
  Users,
  Clock,
  Award,
  Flame
} from 'lucide-react';

const LearningHubPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'achievements' | 'leaderboard'>('courses');

  const courses = [
    {
      id: 1,
      title: 'Stock Market Basics',
      instructor: 'Rajesh Kumar',
      duration: '4 hours',
      lessons: 20,
      rating: 4.8,
      reviews: 1234,
      completed: true,
      progress: 100,
      difficulty: 1,
      description: 'Learn the fundamentals of stock market investing'
    },
    {
      id: 2,
      title: 'Technical Analysis Mastery',
      instructor: 'Priya Sharma',
      duration: '6 hours',
      lessons: 25,
      rating: 4.9,
      reviews: 856,
      completed: false,
      progress: 60,
      difficulty: 2,
      description: 'Master chart patterns, indicators and technical analysis'
    },
    {
      id: 3,
      title: 'Options Trading Fundamentals',
      instructor: 'Arjun Mehta',
      duration: '8 hours',
      lessons: 30,
      rating: 4.7,
      reviews: 642,
      completed: false,
      progress: 0,
      difficulty: 3,
      description: 'Comprehensive guide to options trading strategies'
    },
    {
      id: 4,
      title: 'Risk Management Essentials',
      instructor: 'Sneha Patel',
      duration: '5 hours',
      lessons: 18,
      rating: 4.8,
      reviews: 423,
      completed: false,
      progress: 0,
      difficulty: 2,
      description: 'Learn to protect your capital and manage risk effectively'
    }
  ];

  const achievements = [
    { name: 'First Strategy Builder', icon: Target, earned: true, date: '2024-01-15' },
    { name: 'Technical Analysis Pro', icon: BarChart3, earned: true, date: '2024-01-10' },
    { name: 'Quiz Master', icon: Trophy, earned: true, date: '2024-01-05' },
    { name: 'Community Helper', icon: Users, earned: false, date: null },
    { name: 'Options Expert', icon: Star, earned: false, date: null },
    { name: 'Risk Management Pro', icon: Target, earned: false, date: null }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya_Trader', xp: 2850, courses: 5, avatar: 'PT' },
    { rank: 2, name: 'TechAnalyst', xp: 2640, courses: 4, avatar: 'TA' },
    { rank: 3, name: 'OptionsGuru', xp: 2420, courses: 4, avatar: 'OG' },
    { rank: 4, name: 'You', xp: user?.xp || 1250, courses: 2, avatar: user?.name.charAt(0).toUpperCase() || 'U' },
    { rank: 5, name: 'RiskMaster', xp: 1180, courses: 3, avatar: 'RM' }
  ];

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Hub</h1>
          <p className="text-gray-600">Enhance your trading skills with our comprehensive courses</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Your Learning Journey</h2>
              <p className="text-blue-100 mb-4">
                Level {user?.level} • {user?.xp}/3000 XP to next level
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm">2 courses completed</span>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-1 flex items-center space-x-1">
                  <Flame className="h-4 w-4" />
                  <span className="text-sm">12-day streak</span>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm">{user?.credits} credits earned</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="36" stroke="white" strokeOpacity="0.2" strokeWidth="6" fill="none" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="36" 
                    stroke="white" 
                    strokeWidth="6" 
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - ((user?.xp || 0) / 3000))}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{Math.round(((user?.xp || 0) / 3000) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'courses', label: 'Courses', count: courses.length },
              { id: 'achievements', label: 'Achievements', count: achievements.filter(a => a.earned).length },
              { id: 'leaderboard', label: 'Leaderboard', count: 0 }
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

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {course.instructor}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </span>
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>
                    {course.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : course.progress > 0 ? (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{course.progress}%</span>
                      </div>
                    ) : (
                      <Lock className="h-6 w-6 text-gray-400" />
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({course.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">Difficulty:</span>
                      <div className="flex">{getDifficultyStars(course.difficulty)}</div>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      disabled={!course.completed && course.progress === 0}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        course.completed
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : course.progress > 0
                          ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {course.completed ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed</span>
                        </>
                      ) : course.progress > 0 ? (
                        <>
                          <Play className="h-4 w-4" />
                          <span>Continue</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          <span>Locked</span>
                        </>
                      )}
                    </button>
                    {course.completed && (
                      <div className="text-sm text-gray-600">
                        +{100 + course.lessons * 10} XP earned
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={index} 
                    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center ${
                      achievement.earned ? '' : 'opacity-50'
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                    {achievement.earned ? (
                      <p className="text-sm text-green-600">
                        Earned on {new Date(achievement.date!).toLocaleDateString()}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">Keep learning to unlock!</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Champions - This Week</h3>
              
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`text-lg font-bold ${
                        user.rank === 1 ? 'text-yellow-500' :
                        user.rank === 2 ? 'text-gray-400' :
                        user.rank === 3 ? 'text-orange-600' :
                        'text-gray-600'
                      }`}>
                        #{user.rank}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{user.avatar}</span>
                      </div>
                      <div>
                        <div className={`font-medium ${user.name === 'You' ? 'text-blue-700' : 'text-gray-900'}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">{user.courses} courses completed</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{user.xp.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LearningHubPage;