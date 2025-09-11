import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Play, 
  Settings, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Calendar,
  Clock,
  Download
} from 'lucide-react';

const BacktestingPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleRunBacktest = () => {
    setIsRunning(true);
    // Simulate backtest running
    setTimeout(() => {
      setIsRunning(false);
      setHasResults(true);
    }, 3000);
  };

  const mockResults = {
    totalReturn: 34.7,
    annualizedReturn: 12.5,
    sharpeRatio: 1.84,
    maxDrawdown: -12.3,
    winRate: 68,
    totalTrades: 87,
    avgWin: 2.8,
    avgLoss: -1.4,
    profitFactor: 2.34,
    finalValue: 134700
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Backtesting Lab</h1>
            <p className="text-gray-600">Test your strategies with historical data</p>
          </div>
          {hasResults && (
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Results</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
              </div>

              <div className="space-y-6">
                {/* Strategy Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strategy
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Moving Average Crossover</option>
                    <option>RSI Mean Reversion</option>
                    <option>Breakout Strategy</option>
                  </select>
                </div>

                {/* Symbol Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symbol
                  </label>
                  <input
                    type="text"
                    defaultValue="RELIANCE"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      defaultValue="2023-01-01"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="date"
                      defaultValue="2024-12-31"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">1Y</button>
                    <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">2Y</button>
                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">5Y</button>
                  </div>
                </div>

                {/* Capital Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Capital
                  </label>
                  <input
                    type="number"
                    defaultValue="100000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Transaction Costs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brokerage (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="0.05"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Run Backtest Button */}
                <button
                  onClick={handleRunBacktest}
                  disabled={isRunning}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Running Backtest...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Run Backtest</span>
                    </>
                  )}
                </button>

                {/* Progress Bar */}
                {isRunning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Processing...</span>
                      <span>67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {!hasResults && !isRunning ? (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Backtest</h3>
                <p className="text-gray-600 mb-6">
                  Configure your strategy parameters and run a historical backtest to see how it would have performed.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Historical Data</div>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Performance Metrics</div>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Risk Analysis</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                    <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">+{mockResults.totalReturn}%</div>
                    <div className="text-sm text-gray-600">Total Return</div>
                    <div className="text-xs text-gray-500 mt-1">{mockResults.annualizedReturn}% CAGR</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                    <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{mockResults.sharpeRatio}</div>
                    <div className="text-sm text-gray-600">Sharpe Ratio</div>
                    <div className="text-xs text-gray-500 mt-1">Risk-adjusted</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                    <TrendingDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{mockResults.maxDrawdown}%</div>
                    <div className="text-sm text-gray-600">Max Drawdown</div>
                    <div className="text-xs text-gray-500 mt-1">45 days</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                    <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{mockResults.winRate}%</div>
                    <div className="text-sm text-gray-600">Win Rate</div>
                    <div className="text-xs text-gray-500 mt-1">{Math.round(mockResults.totalTrades * mockResults.winRate / 100)}/{mockResults.totalTrades} trades</div>
                  </div>
                </div>

                {/* Equity Curve */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                      <p className="text-gray-600">Equity curve chart</p>
                      <p className="text-sm text-gray-500">₹1,00,000 → ₹{mockResults.finalValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Trades</span>
                        <span className="font-medium">{mockResults.totalTrades}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Win Rate</span>
                        <span className="font-medium text-green-600">{mockResults.winRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Win</span>
                        <span className="font-medium text-green-600">+{mockResults.avgWin}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Loss</span>
                        <span className="font-medium text-red-600">{mockResults.avgLoss}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit Factor</span>
                        <span className="font-medium">{mockResults.profitFactor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sharpe Ratio</span>
                        <span className="font-medium">{mockResults.sharpeRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sortino Ratio</span>
                        <span className="font-medium">2.31</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Drawdown</span>
                        <span className="font-medium text-red-600">{mockResults.maxDrawdown}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calmar Ratio</span>
                        <span className="font-medium">1.67</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Beta</span>
                        <span className="font-medium">1.12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BacktestingPage;