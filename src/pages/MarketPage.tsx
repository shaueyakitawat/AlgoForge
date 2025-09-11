import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useData } from '../contexts/DataContext';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Filter,
  Search,
  BarChart3,
  Clock,
  Volume2
} from 'lucide-react';

const MarketPage: React.FC = () => {
  const { indices, topStocks, isMarketOpen, lastUpdated } = useData();
  const [activeTab, setActiveTab] = useState<'indices' | 'stocks' | 'options'>('indices');
  const [searchTerm, setSearchTerm] = useState('');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredStocks = topStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live Market</h1>
            <p className="text-gray-600">Real-time market data and analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={isMarketOpen ? 'text-green-600' : 'text-red-600'}>
                Market {isMarketOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="text-sm text-gray-600 flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Updated: {formatTime(lastUpdated)}</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Market Status Banner */}
        {isMarketOpen && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-medium">Market is open</span>
                <span className="text-green-600 text-sm">Closes in 2h 45m</span>
              </div>
              <div className="text-sm text-green-600">
                Live data streaming • Last update: {formatTime(lastUpdated)}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'indices', label: 'Indices', count: indices.length },
              { id: 'stocks', label: 'Top Stocks', count: topStocks.length },
              { id: 'options', label: 'Options Chain', count: 0 }
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

        {/* Indices Tab */}
        {activeTab === 'indices' && (
          <div className="space-y-6">
            {/* Main Indices Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {indices.map((index) => (
                <div key={index.symbol} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{index.name}</h3>
                    <span className="text-sm text-gray-500">{index.symbol}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {index.value.toLocaleString()}
                    </div>
                    
                    <div className={`flex items-center justify-center space-x-2 text-lg font-medium ${
                      index.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {index.change >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                      <span>
                        {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                      <span>High: {index.high.toLocaleString()}</span>
                      <span>Low: {index.low.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Mini chart placeholder */}
                  <div className="mt-4 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-gray-400" />
                    <span className="ml-2 text-xs text-gray-500">Intraday Chart</span>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Market Breadth */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Breadth</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">1,245</div>
                  <div className="text-sm text-gray-600">Advances</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">758</div>
                  <div className="text-sm text-gray-600">Declines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600 mb-2">97</div>
                  <div className="text-sm text-gray-600">Unchanged</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Advance/Decline Ratio</span>
                  <span className="text-green-600 font-medium">1.64</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stocks Tab */}
        {activeTab === 'stocks' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Stocks Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Symbol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volume
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        High/Low
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStocks.map((stock) => (
                      <tr key={stock.symbol} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-blue-600">
                                {stock.symbol.charAt(0)}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ₹{stock.price.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center space-x-1 ${
                            stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            <span className="text-sm font-medium">
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1 text-sm text-gray-900">
                            <Volume2 className="h-4 w-4 text-gray-400" />
                            <span>{(stock.volume / 100000).toFixed(1)}L</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div>H: ₹{stock.high.toFixed(2)}</div>
                          <div>L: ₹{stock.low.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Watch</button>
                            <button className="text-green-600 hover:text-green-900">Trade</button>
                            <button className="text-gray-600 hover:text-gray-900">Analyze</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Options Chain Tab */}
        {activeTab === 'options' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Options Chain Coming Soon</h3>
              <p className="text-gray-600">
                Advanced options analytics and chain data will be available in the next update.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketPage;