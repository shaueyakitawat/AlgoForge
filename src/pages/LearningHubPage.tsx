import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  Play, 
  CheckCircle,
  Lock,
  Star,
  Trophy,
  Target,
  BarChart3,
  Users,
  Clock,
  Flame
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Stock Market Fundamentals',
    instructor: 'Rajesh Kumar',
    duration: '4 hours',
    lessons: 20,
    rating: 4.8,
    reviews: 1234,
    difficulty: 1,
    description: 'Learn the fundamentals of stock market investing',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLxNHpNhDaEFJsuzKNrMbr_SESDCCLmSu4'
  },
  {
    id: 2,
    title: 'Technical Analysis for Everyone',
    instructor: 'Priya Sharma',
    duration: '6 hours',
    lessons: 25,
    rating: 4.9,
    reviews: 856,
    difficulty: 2,
    description: 'Master chart patterns, indicators and technical analysis',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLxNHpNhDaEFKBbevR6wFc-4rMaFmd5tbc'
  },
  {
    id: 3,
    title: 'Options & Derivatives Made Easy',
    instructor: 'Arjun Mehta',
    duration: '8 hours',
    lessons: 30,
    rating: 4.7,
    reviews: 642,
    difficulty: 3,
    description: 'Comprehensive guide to options trading strategies',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLxNHpNhDaEFJBMvkFSGxFCUzbKNa6DbGu'
  },
  {
    id: 4,
    title: 'Backtesting Without Coding',
    instructor: 'Sneha Patel',
    duration: '5 hours',
    lessons: 18,
    rating: 4.8,
    reviews: 423,
    difficulty: 2,
    description: 'Learn to test and optimize your strategy easily and visually',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLxNHpNhDaEFKve2TjF8jUrQOKdj4tyl0U7'
  },
  {
    id: 5,
    title: 'Simple Risk Management',
    instructor: 'Amit Trivedi',
    duration: '3 hours',
    lessons: 12,
    rating: 4.6,
    reviews: 201,
    difficulty: 2,
    description: 'Essential tools to protect your capital and manage risks',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLLy_2iUCG87CTB2vv9njHaJbmQoa9S5gK'
  },
  {
    id: 6,
    title: 'Algo Trading in Python (Reference)',
    instructor: 'Vikram Gupta',
    duration: '7 hours',
    lessons: 28,
    rating: 4.9,
    reviews: 505,
    difficulty: 3,
    description: 'See how algos work under the hood (for reference only, no coding required).',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLUTKklmYVO37Ik8K1Ftdp4ULk3dMBCKYp'
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
  { rank: 4, name: 'You', xp: 1250, courses: 2, avatar: 'Y' },
  { rank: 5, name: 'RiskMaster', xp: 1180, courses: 3, avatar: 'RM' }
];

const getDifficultyStars = (difficulty: number) => (
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-3 w-3 ${
        i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'
      }`}
    />
  ))
);

// *** 15 questions for Stock Market Fundamentals; Template shown for others. ***
const quizzes = {
  1: {
    title: "Stock Market Fundamentals Quiz",
    questions: [
      { question: "What is a stock?", options: ["A type of bond", "An ownership share in a company", "A money market instrument", "A form of bank account"], answer: 1 },
      { question: "Stock represents ____ in a company.", options: ["Debt", "Ownership", "A contract", "A product"], answer: 1 },
      { question: "Who regulates India's stock markets?", options: ["RBI", "SEBI", "NSE", "Sensex"], answer: 1 },
      { question: "What is the BSE?", options: ["Banking Stock Exchange", "Bombay Stock Exchange", "Bond Stock Exchange", "British Stock Exchange"], answer: 1 },
      { question: "Order to buy/sell at a specific price is called?", options: ["Stop Order", "Limit Order", "Market Order", "Future Order"], answer: 1 },
      { question: "The ‘Sensex’ stands for:", options: ["Sensitive Index", "Sensible Exchange", "Sense Exchange", "Senior Index"], answer: 0 },
      { question: "Which one is NOT a stock exchange?", options: ["NYSE", "NSE", "BSE", "IMF"], answer: 3 },
      { question: "Dividends are paid to:", options: ["Bondholders", "Shareholders", "Employees", "Bankers"], answer: 1 },
      { question: "Highest price a buyer is willing to pay is:", options: ["Bid", "Ask", "Spread", "Quote"], answer: 0 },
      { question: "Mutual funds invest in:", options: ["Gold only", "Single stocks only", "Baskets of securities", "Bank deposits"], answer: 2 },
      { question: "Demat account holds:", options: ["Physical shares", "Electronic shares", "Gold", "Cash"], answer: 1 },
      { question: "Stock price mainly depends on:", options: ["Company age", "Supply & demand", "Book value", "Marketing"], answer: 1 },
      { question: "Short selling means:", options: ["Buying at low", "Selling borrowed shares hoping to buy back lower", "Keeping stocks for long term", "First buying then selling"], answer: 1 },
      { question: "Nifty 50 is:", options: ["Index of top 50 NSE stocks", "50 new IPOs", "50 mutual funds", "50 biggest US stocks"], answer: 0 },
      { question: "The opening price is:", options: ["First traded price of the day", "Best price in pre-market", "Price at previous close", "Highest price of the week"], answer: 0 }
    ]
  },
  2: {
    title: "Technical Analysis for Everyone Quiz",
    questions: [
      // Add 15 questions here in same format!
      { question: "What does RSI measure?", options: ["Price Momentum", "Trading Volume", "Market Cap", "Volatility"], answer: 0 },
      // ... more
    ]
  },
  3: {
    title: "Options & Derivatives Made Easy Quiz",
    questions: [
      // 15 questions here...
    ]
  },
  4: {
    title: "Backtesting Without Coding Quiz",
    questions: [
      // 15 questions here...
    ]
  },
  5: {
    title: "Simple Risk Management Quiz",
    questions: [
      // 15 questions here...
    ]
  },
  6: {
    title: "Algo Trading in Python (Reference) Quiz",
    questions: [
      // 15 questions here...
    ]
  }
};

const LearningHubPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'achievements' | 'leaderboard' | 'quiz'>('courses');
  const [selectedQuizCourse, setSelectedQuizCourse] = useState<number | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  React.useEffect(() => {
    setSelectedQuizCourse(null);
    setQuizStep(0);
    setQuizAnswers([]);
  }, [activeTab]);

  const handleStartQuiz = (courseId: number) => {
    setSelectedQuizCourse(courseId);
    setQuizStep(0);
    setQuizAnswers([]);
  };

  const handleAnswer = (idx: number) => {
    setQuizAnswers([...quizAnswers, idx]);
    setQuizStep(quizStep + 1);
  };

  const handleQuizRestart = () => {
    setQuizStep(0);
    setQuizAnswers([]);
  };

  const renderQuiz = () => {
    if (selectedQuizCourse == null) return null;
    const quiz = quizzes[selectedQuizCourse];
    if (!quiz) return <div>No quiz available for this course.</div>;
    const q = quiz.questions[quizStep];

    // Quiz is finished
    if (quizStep >= quiz.questions.length) {
      const correct = quiz.questions.filter(
        (q, i) => q.answer === quizAnswers[i]
      ).length;
      return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
          <p className="mb-2">Quiz complete! You scored <b>{correct}</b> out of <b>{quiz.questions.length}</b>.</p>
          <p className="mb-6">Total Marks: <b>{correct * 1}</b></p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-3"
            onClick={handleQuizRestart}
          >
            Retake Quiz
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            onClick={() => setSelectedQuizCourse(null)}
          >
            Back to Courses
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
        <div className="mb-4"><span className="font-medium">Q{quizStep + 1}.</span> {q.question}</div>
        <div>
          {q.options.map((op, i) => (
            <button
              key={i}
              className="block w-full text-left px-4 py-2 mb-2 bg-blue-50 hover:bg-blue-100 rounded transition"
              onClick={() => handleAnswer(i)}
            >
              {op}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <span>Question {quizStep + 1} of {quiz.questions.length}</span>
          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => setSelectedQuizCourse(null)}
          >Back to Courses</button>
        </div>
      </div>
    );
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
              { id: 'leaderboard', label: 'Leaderboard', count: 0 },
              { id: 'quiz', label: 'Quiz', count: 0 }
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
                  <div className="flex items-center justify-between">
                    {/* The 'Start' button always available */}
                    <a
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      href={course.youtubePlaylist}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab (original) */}
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

        {/* Leaderboard Tab (original) */}
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

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            {!selectedQuizCourse ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <button
                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={() => handleStartQuiz(course.id)}
                      >
                        Take Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              renderQuiz()
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LearningHubPage;
