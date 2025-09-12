import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  Users, MessageSquare, Star, TrendingUp, Trophy, Filter, Search, ThumbsUp, Eye, Clock,
  Award
} from 'lucide-react';

// ==== DATA ARRAYS ====
const initialStrategies = [
  { id: 1, title: 'BankNifty Options Income Engine', author: 'Amitesh Shetty', authorVerified: true, price: 1699, rating: 4.9, reviews: 135, downloads: 3120, returns: '+120%', winRate: '80%', tags: ['Options', 'Weekly', 'Safe'], image: 'gradient-from-blue-500-to-purple-600', riskBadge: 'Well Tested', description: 'Sell premium in range-bound markets using delta-neutral iron condors and weekly adjustments.' },
  { id: 2, title: 'Momentum Breakout AI System', author: 'Ritika Verma', authorVerified: false, price: 1299, rating: 4.7, reviews: 89, downloads: 1898, returns: '+94%', winRate: '65%', tags: ['AI', 'Momentum', 'Intraday'], image: 'gradient-from-green-500-to-teal-600', riskBadge: 'Experimental', description: 'AI-powered signal generator for intraday momentum bursts with volume confirmation.' },
  { id: 3, title: 'Nifty Pair Arbitragear', author: 'Devansh Rathod', authorVerified: true, price: 2399, rating: 4.8, reviews: 111, downloads: 1723, returns: '+137%', winRate: '73%', tags: ['Pairs', 'Market Neutral'], image: 'gradient-from-purple-500-to-pink-600', riskBadge: 'Well Tested', description: 'Arbitrage Nifty twins using mean reversion and spread targeting logic. Works in all conditions.' },
  { id: 4, title: 'BTC Volatility Catcher', author: 'Ishaan Shah', authorVerified: true, price: 1999, rating: 4.6, reviews: 75, downloads: 1497, returns: '+106%', winRate: '68%', tags: ['Crypto', 'Volatility'], image: 'gradient-from-pink-500-to-yellow-500', riskBadge: 'Tested', description: 'Options swing trading system for BTC with tailored risk-managed straddles.' },
  { id: 5, title: 'Intraday Gap Fader', author: 'Lalitha Mohanty', authorVerified: false, price: 1249, rating: 4.5, reviews: 40, downloads: 971, returns: '+81%', winRate: '64%', tags: ['Intraday', 'Gap Fading'], image: 'gradient-from-yellow-500-to-red-500', riskBadge: 'Experimental', description: 'Fade opening gaps in high liquidity stocks using multi-timeframe triggers.' },
  { id: 6, title: 'Sector Rotation Builder', author: 'Sarvesh Nair', authorVerified: true, price: 1599, rating: 4.8, reviews: 98, downloads: 1334, returns: '+122%', winRate: '72%', tags: ['ETF', 'Rotation'], image: 'gradient-from-orange-400-to-indigo-600', riskBadge: 'Tested', description: 'Allocates capital based on sector strength rotation, auto-rebalances weekly.' },
  { id: 7, title: 'Smart Beta Nifty', author: 'Rituparna Sen', authorVerified: true, price: 2099, rating: 4.7, reviews: 110, downloads: 1467, returns: '+119%', winRate: '77%', tags: ['Factor', 'Trending'], image: 'gradient-from-teal-500-to-blue-800', riskBadge: 'Well Tested', description: 'Top 10 stocks by multi-factor scores, quarterly rebalanced. Outperforms index.' },
  { id: 8, title: 'USD-INR Carry Advantage', author: 'Nikhil Mehta', authorVerified: false, price: 1149, rating: 4.4, reviews: 27, downloads: 833, returns: '+71%', winRate: '62%', tags: ['Currency', 'Carry'], image: 'gradient-from-indigo-400-to-green-300', riskBadge: 'Experimental', description: 'Harvest USD-INR interest/carry spread via rolling forwards.' },
  { id: 9, title: 'Short Vol Spike Guard', author: 'Sneha Kothari', authorVerified: false, price: 1349, rating: 4.6, reviews: 37, downloads: 945, returns: '+77%', winRate: '67%', tags: ['Volatility', 'Inverse'], image: 'gradient-from-purple-400-to-indigo-700', riskBadge: 'Tested', description: 'Shorts volatility ETPs when market gets overextended.' },
  { id: 10, title: 'Auto ETF Asset Allocator', author: 'Abhay Sharma', authorVerified: true, price: 1899, rating: 4.8, reviews: 64, downloads: 1165, returns: '+102%', winRate: '70%', tags: ['ETF', 'Asset Allocation'], image: 'gradient-from-blue-400-to-orange-200', riskBadge: 'Well Tested', description: 'Fully automated ETF portfolio balancing and periodic reallocation.' },
  { id: 11, title: 'Positional Swing Grid', author: 'Ajay Sethi', authorVerified: false, price: 1199, rating: 4.4, reviews: 19, downloads: 529, returns: '+68%', winRate: '61%', tags: ['Swing', 'Grid'], image: 'gradient-from-cyan-500-to-blue-600', riskBadge: 'Tested', description: 'Classic grid-based swing trading optimized for Nifty/BTC volatility.' },
  { id: 12, title: 'AI News Sentiment Trader', author: 'Varsha Pillai', authorVerified: true, price: 2299, rating: 4.9, reviews: 138, downloads: 1874, returns: '+145%', winRate: '80%', tags: ['AI', 'News', 'Sentiment'], image: 'gradient-from-pink-500-to-blue-700', riskBadge: 'Well Tested', description: 'Scans news/sentiment for trade triggers, auto-hedges via options.' }
];
const mentorList = [
  { id: 1, name: 'Priya Singh', expertise: ['Risk Mgmt', 'Options'], rating: 4.9, badge: 'Risk Pro', avatar: 'PS', bio: 'Author of “Options 101”, mentor for 250+ students.' },
  { id: 2, name: 'Karan Malhotra', expertise: ['Strategy Logic', 'Bonds'], rating: 4.7, badge: 'Strategy Guru', avatar: 'KM', bio: 'NSE contest winner; logic optimizer.' },
  { id: 3, name: 'Sonal Reddy', expertise: ['AI & ML', 'Algo Review'], rating: 4.8, badge: 'AI Wizard', avatar: 'SR', bio: 'Built “Momentum Breakout AI System”.' },
  { id: 4, name: 'Nikhil Mehta', expertise: ['FX/Currency', 'Backtesting'], rating: 4.6, badge: 'FX Coach', avatar: 'NM', bio: 'Curates USD-INR Carry Advantage.' },
  { id: 5, name: 'Lalitha Mohanty', expertise: ['Intraday', 'Execution'], rating: 4.7, badge: 'Daytrader Star', avatar: 'LM', bio: 'Created Intraday Gap Fader.' },
  { id: 6, name: 'Ajay Sethi', expertise: ['Swing Trading', 'Grid Systems'], rating: 4.7, badge: 'Swing Master', avatar: 'AS', bio: 'Built Positional Swing Grid.' }
];
const collabStrategies = [
  { id: 1, title: "Weekly Options Community Bot", author: "Priya Singh", forks: 12, views: 314, status: "Open", votes: 31, lastUpdate: "1 hr ago", description: "Refine a robust weekly options seller, help optimize risk blocks & spreads.", tags: ["Options", "Risk", "Community"], riskBadge: "Tested" },
  { id: 2, title: "AI Intraday Momentum Pool", author: "Sonal Reddy", forks: 15, views: 474, status: "Open", votes: 38, lastUpdate: "3 hr ago", description: "Improve this collaborative AI momentum engine. Add new filters/triggers!", tags: ["AI", "Intraday"], riskBadge: "Experimental" },
  { id: 3, title: "Market Neutral Pairs Picker", author: "Devansh Rathod", forks: 9, views: 207, status: "Open", votes: 19, lastUpdate: "2 hr ago", description: "Help add pairs and smarter mean reversion rules. Raise stability!", tags: ["Pairs", "Neutral"], riskBadge: "Tested" },
  { id: 4, title: "ETF Sector Rotary", author: "Sarvesh Nair", forks: 7, views: 196, status: "Open", votes: 15, lastUpdate: "6 hr ago", description: "Perfect the sector switch logic, test alternate cycles.", tags: ["ETF", "Sector"], riskBadge: "Tested" },
  { id: 5, title: "Positional Grid Collab", author: "Ajay Sethi", forks: 6, views: 154, status: "Open", votes: 15, lastUpdate: "9 hr ago", description: "Add volatility/adaptive layers to classic grid for robustness.", tags: ["Grid", "Swing"], riskBadge: "Tested" },
  { id: 6, title: "Beta Factor Scorer", author: "Rituparna Sen", forks: 11, views: 286, status: "Open", votes: 21, lastUpdate: "4 hr ago", description: "Crowdsource multi-factor weights and test variations.", tags: ["Beta", "Weighting"], riskBadge: "Experimental" },
  { id: 7, title: "Crypto News Autohedger", author: "Varsha Pillai", forks: 14, views: 325, status: "Open", votes: 29, lastUpdate: "5 hr ago", description: "Innovate with new hedging modules based on news scanning.", tags: ["Crypto", "Hedge"], riskBadge: "Experimental" },
  { id: 8, title: "Carry Spread Enhancer", author: "Nikhil Mehta", forks: 5, views: 117, status: "Open", votes: 11, lastUpdate: "7 hr ago", description: "Optimize for lower slippage, recruit more currency pairs.", tags: ["Currency", "Carry"], riskBadge: "Tested" }
];
const initialDiscussions = [
  { id: 1, title: 'Hedging with Futures?', author: 'Sneha Kothari', replies: 15, views: 350, lastActivity: '1 hour ago', category: 'Strategy', isHot: true },
  { id: 2, title: 'Dealing with Drawdowns?', author: 'Devansh Rathod', replies: 8, views: 267, lastActivity: '2 hours ago', category: 'Risk', isHot: false },
  { id: 3, title: 'Machine Learning in Live Trading', author: 'Sonal Reddy', replies: 23, views: 540, lastActivity: '40 min ago', category: 'Tech', isHot: true }
];
const initialQna = [
  { id: 1, title: "Is ML auto-tuning worth it?", author: "Karan Malhotra", tags: "ML", upvotes: 7, answers: 2, views: 77, answered: true, lastUpdate: "28 min ago" },
  { id: 2, title: "Backtesting pitfalls?", author: "Priya Singh", tags: "Backtest", upvotes: 4, answers: 0, views: 42, answered: false, lastUpdate: "41 min ago" }
];
const initialFeed = [
  { id: 1, author: "Amitesh Shetty", msg: "Just deployed BankNifty Options Income Engine—fingers crossed for expiry!", time: "3m" },
  { id: 2, author: "Lalitha Mohanty", msg: "Fade gap strategy worked wonders on Reliance today 🎉", time: "10m" },
  { id: 3, author: "Nikhil Mehta", msg: "Please suggest tweaks to Carry Advantage logic (looking for more pairs).", time: "13m" }
];
const competitions = [
  { id: 1, title: 'Trading Bot Grand Prix', description: 'Top ROI in 10 days wins ₹1L', participants: 322, prize: '₹1,00,000', timeLeft: '6 days', status: 'active' },
  { id: 2, title: 'Options Champion', description: 'Best options win-rate gets ₹50K', participants: 156, prize: '₹50,000', timeLeft: '14 days', status: 'active' },
  { id: 3, title: 'AI Quant Hunt', description: 'Most creative AI-powered algo', participants: 88, prize: '₹25,000', timeLeft: 'Ended', status: 'completed' },
];
const badgeTheme = {
  "Well Tested": "bg-green-100 text-green-800",
  "Experimental": "bg-orange-100 text-orange-700",
  "Tested": "bg-blue-100 text-blue-700"
};

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'collab' | 'discussions' | 'qna' | 'livefeed' | 'competitions' | 'mentors'>('marketplace');
  const [modal, setModal] = useState<{ type: string, payload?: any } | null>(null);
  const [strategies, setStrategies] = useState(initialStrategies);
  const [collabs, setCollabs] = useState(collabStrategies);
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [discussionInput, setDiscussionInput] = useState('');
  const [qna, setQna] = useState(initialQna);
  const [qnaInput, setQnaInput] = useState('');
  const [feed, setFeed] = useState(initialFeed);
  const [feedInput, setFeedInput] = useState('');
  const [searchStrategy, setSearchStrategy] = useState('');
  const [boughtId, setBoughtId] = useState<number | null>(null);

  // Posting Handlers
  const handlePostDiscussion = () => { if (discussionInput.trim()) { setDiscussions([{ id: discussions.length + 1, title: discussionInput, author: "You", replies: 0, views: 1, lastActivity: 'just now', category: 'General', isHot: false }, ...discussions ]); setDiscussionInput(''); } };
  const handlePostQna = () => { if (qnaInput.trim()) { setQna([{ id: qna.length + 1, title: qnaInput, author: "You", tags: "General", upvotes: 0, answers: 0, views: 1, answered: false, lastUpdate: 'just now' }, ...qna ]); setQnaInput(''); } };
  const handlePostFeed = () => { if (feedInput.trim()) { setFeed([{ id: feed.length + 1, author: "You", msg: feedInput, time: "just now" }, ...feed ]); setFeedInput(''); } };

  // Modal/buy/etc
  const openModal = (type: string, payload?: any) => setModal({ type, payload });
  const closeModal = () => setModal(null);
  const handleBuy = (id: number) => { setBoughtId(id); closeModal(); };

  // Filtering strategies
  const filteredStrategies = strategies.filter(s => s.title.toLowerCase().includes(searchStrategy.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto relative">
        {/* HEADER & STATS & TAB BAR */}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"><Users className="h-6 w-6 text-blue-600" /></div><div className="text-2xl font-bold text-gray-900">10.2K</div><div className="text-sm text-gray-600">Active Traders</div></div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><TrendingUp className="h-6 w-6 text-green-600" /></div><div className="text-2xl font-bold text-gray-900">1.5K</div><div className="text-sm text-gray-600">Strategies Shared</div></div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"><div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"><MessageSquare className="h-6 w-6 text-purple-600" /></div><div className="text-2xl font-bold text-gray-900">8.9K</div><div className="text-sm text-gray-600">Discussions</div></div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"><div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trophy className="h-6 w-6 text-yellow-600" /></div><div className="text-2xl font-bold text-gray-900">₹2.5L</div><div className="text-sm text-gray-600">Monthly Prizes</div></div>
        </div>
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'collab', label: 'Collab Board' },
              { id: 'discussions', label: 'Discussions' },
              { id: 'qna', label: 'Q&A Forum' },
              { id: 'livefeed', label: 'Live Feed' },
              { id: 'competitions', label: 'Competitions' },
              { id: 'mentors', label: 'Mentors' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
            
{/* ---- TAB CONTENT INSERTS ---- */}
{activeTab === 'marketplace' && (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search strategies..."
            value={searchStrategy}
            onChange={e => setSearchStrategy(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredStrategies.map((s) => (
        <div key={s.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${badgeTheme[s.riskBadge]}`}>{s.riskBadge}</span>
          </div>
          <div className={`h-28 rounded-lg bg-gradient-to-tr from-blue-400 to-purple-500 mb-3`}></div>
          <div className="mb-2 text-sm text-gray-700">{s.description}</div>
          <div className="mb-2 text-xs text-gray-500">by {s.author} {s.authorVerified && <span className="inline-block bg-blue-100 text-blue-700 ml-1 px-2 rounded">✓ Verified</span>}</div>
          <div className="flex flex-wrap gap-2 mb-2">{s.tags.map(t => <span key={t} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs">#{t}</span>)}</div>
          <div className="flex justify-between items-center mb-3">
            <div><Star className="h-4 w-4 text-yellow-400 inline" /> {s.rating.toFixed(1)} ({s.reviews})</div>
            <div className="font-bold text-lg text-green-700">{s.returns}</div>
          </div>
          <div className="flex space-x-2">
            <button
              className={`flex-1 bg-blue-600 text-white py-2 rounded-lg ${boughtId === s.id ? 'opacity-50' : ''}`}
              onClick={() => boughtId === s.id ? null : openModal("buy", { strategy: s })}
              disabled={boughtId === s.id}
            >
              {boughtId === s.id ? "Purchased" : `Buy for ₹${s.price}`}
            </button>
            <button
              className="flex-1 bg-green-500 text-white py-2 rounded-lg"
              onClick={() => openModal("deploy", { strategy: s })}
            >Deploy</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'collab' && (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900 flex items-center">
        <Award className="h-6 w-6 mr-2" />
        Collaboration Board
      </h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => openModal("create-collab")}
      >
        Create Collab Post
      </button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {collabs.map(cs => (
        <div key={cs.id} className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900">{cs.title}</h3>
            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${badgeTheme[cs.riskBadge]}`}>{cs.riskBadge}</span>
          </div>
          <p className="text-sm mb-3">{cs.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {cs.tags.map((tag, j) => (
              <span key={j} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs">#{tag}</span>
            ))}
          </div>
          <div className="mb-4 text-xs text-gray-500">
            by <b>{cs.author}</b> · {cs.forks} forks · {cs.views} views · Last update {cs.lastUpdate}
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              onClick={() => openModal("fork", { cs })}>Fork/Clone & Improve</button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={() => openModal("discuss", { cs })}>Discuss</button>
          </div>
          <div className="mt-2 text-xs text-blue-700 italic">Votes: {cs.votes} · Status: {cs.status}</div>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'discussions' && (
  <div className="space-y-6">
    <div className="flex items-center mb-4">
      <input
        value={discussionInput}
        onChange={e => setDiscussionInput(e.target.value)}
        className="flex-1 border rounded px-4 py-2 mr-2"
        placeholder="Start or reply to a discussion..."
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handlePostDiscussion}>Post</button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {discussions.map((discussion, index) => (
        <div key={discussion.id} className={`p-6 ${index !== discussions.length - 1 ? 'border-b border-gray-200' : ''}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-medium text-gray-900">{discussion.title}</h3>
                {discussion.isHot && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-xs font-medium">🔥 Hot</span>
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
            <button className="ml-4 text-gray-400 hover:text-blue-500 transition-colors"
              onClick={() => openModal("like")}>
              <ThumbsUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'qna' && (
  <div className="space-y-6">
    <div className="flex items-center mb-4">
      <input value={qnaInput} onChange={e => setQnaInput(e.target.value)}
        className="flex-1 border rounded px-4 py-2 mr-2"
        placeholder="Ask a question or type an answer..." />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handlePostQna}>Post</button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {qna.map((post, index) => (
        <div key={post.id} className={`p-6 ${index !== qna.length - 1 ? 'border-b border-gray-200' : ''}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-blue-900">{post.title}</h3>
                {post.answered && <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Answered</span>}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span>by <span className="font-medium">{post.author}</span></span>
                <div>{post.tags && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs mr-1">#{post.tags}</span>}</div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span><ThumbsUp className="inline h-4 w-4" /> {post.upvotes} upvotes</span>
                <span><MessageSquare className="inline h-4 w-4" /> {post.answers} answers</span>
                <span><Eye className="inline h-4 w-4" /> {post.views} views</span>
                <span>{post.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'livefeed' && (
  <div className="space-y-6">
    <div className="flex items-center mb-4">
      <input value={feedInput} onChange={e => setFeedInput(e.target.value)}
        className="flex-1 border rounded px-4 py-2 mr-2"
        placeholder="Share something with the community..." />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handlePostFeed}>Post</button>
    </div>
    <div className="space-y-4">
      {feed.map(feed => (
        <div key={feed.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">{(feed.author || "U")[0]}</div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{feed.author}</span>
              <span className="text-xs text-gray-400">{feed.time}</span>
            </div>
            <div className="text-gray-800">{feed.msg}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'competitions' && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {competitions.map((competition) => (
        <div key={competition.id}
          className={`bg-white rounded-xl p-6 shadow-sm border-2 ${competition.status === 'active' ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' : 'border-gray-200'}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{competition.title}</h3>
              <p className="text-gray-600 mb-3">{competition.description}</p>
            </div>
            {competition.status === 'active' && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center"><div className="text-lg font-bold text-gray-900">{competition.participants}</div><div className="text-sm text-gray-600">Participants</div></div>
            <div className="text-center"><div className="text-lg font-bold text-green-600">{competition.prize}</div><div className="text-sm text-gray-600">Prize Pool</div></div>
            <div className="text-center"><div className={`text-lg font-bold ${competition.status === 'active' ? 'text-orange-600' : 'text-gray-600'}`}>{competition.timeLeft}</div><div className="text-sm text-gray-600">{competition.status === 'active' ? 'Time Left' : 'Status'}</div></div>
          </div>
          <button disabled={competition.status !== 'active'}
            className={`w-full py-3 rounded-lg font-medium ${competition.status === 'active' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}>
            {competition.status === 'active' ? 'Join Competition' : 'Competition Ended'}
          </button>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'mentors' && (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Mentors</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mentorList.map(mentor => (
        <div key={mentor.id} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 flex items-center">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mr-5">
            {mentor.avatar}
          </div>
          <div>
            <div className="font-bold text-gray-900">{mentor.name} <span className="ml-2 px-2 bg-yellow-100 text-yellow-800 text-xs rounded-full">{mentor.badge}</span></div>
            <div className="text-sm text-gray-700 mb-1">{mentor.bio}</div>
            <div className="text-xs text-blue-700 mb-1">{mentor.expertise.join(", ")}</div>
            <div className="text-xs text-blue-600">Rating {mentor.rating}★</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{modal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
    <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold capitalize">{modal.type.replace('-', ' ')}</h3>
        <button className="text-gray-600 hover:text-blue-600" onClick={closeModal}>✕</button>
      </div>
      {modal.type === "buy" && (
        <>
          <div className="mb-4">
            <b>Buying:</b> {modal.payload.strategy.title}
            <div className="my-3">Price: <span className="font-bold text-green-700">₹{modal.payload.strategy.price}</span></div>
            <input className="block w-full border px-4 py-2 rounded mb-2" placeholder="Enter Card/UPI/Wallet details" />
          </div>
          <button className="w-full py-2 rounded bg-blue-600 text-white"
            onClick={() => handleBuy(modal.payload.strategy.id)}>Pay & Deploy</button>
        </>
      )}
      {modal.type === "deploy" && (
        <>
          <div className="mb-4">Ready to deploy: <b>{modal.payload.strategy.title}</b>?</div>
          <button className="w-full py-2 rounded bg-green-600 text-white" onClick={closeModal}>Deploy Strategy (Mock)</button>
        </>
      )}
      {(modal.type === "fork" || modal.type === "discuss") && (
        <>
          <div className="mb-4">Action on: <b>{modal.payload.cs.title}</b></div>
          <textarea className="w-full border px-4 py-2 rounded mb-2" placeholder={modal.type === "fork" ? "Your new fork name or improvements" : "Join the discussion..."}></textarea>
          <button className="w-full py-2 rounded bg-blue-600 text-white" onClick={closeModal}>Submit</button>
        </>
      )}
      {(modal.type === "create-collab") && (
        <>
          <div className="mb-4">Describe your collaborative idea:</div>
          <textarea className="w-full border px-4 py-2 rounded mb-2" placeholder="Type here..."></textarea>
          <button className="w-full py-2 rounded bg-blue-600 text-white" onClick={closeModal}>Post</button>
        </>
      )}
    </div>
  </div>
)}

      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
