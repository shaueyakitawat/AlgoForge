import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Plus, 
  Play, 
  Save, 
  Share2, 
  Settings, 
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Clock,
  Layers
} from 'lucide-react';

const StrategyBuilderPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: 'ma-crossover',
      name: 'Moving Average Crossover',
      description: 'Buy when short MA crosses above long MA, sell on reverse cross',
      complexity: 2,
      returns: '+12.5%',
      winRate: '65%',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      id: 'rsi-mean-reversion',
      name: 'RSI Mean Reversion',
      description: 'Buy when RSI < 30, sell when RSI > 70 with stop loss',
      complexity: 2,
      returns: '+8.7%',
      winRate: '58%',
      icon: BarChart3,
      color: 'green'
    },
    {
      id: 'breakout-strategy',
      name: 'Breakout Strategy',
      description: 'Trade breakouts above resistance with volume confirmation',
      complexity: 3,
      returns: '+15.2%',
      winRate: '52%',
      icon: Zap,
      color: 'purple'
    },
    {
      id: 'iron-condor',
      name: 'Iron Condor',
      description: 'Weekly iron condor on Bank Nifty for consistent income',
      complexity: 4,
      returns: '+18.9%',
      winRate: '73%',
      icon: Target,
      color: 'orange'
    }
  ];

  const components = [
    {
      category: 'Market Data',
      items: [
        { name: 'Current Price', icon: TrendingUp, description: 'Real-time price data' },
        { name: 'Volume', icon: BarChart3, description: 'Trading volume' },
        { name: 'OHLC Data', icon: Layers, description: 'Open, High, Low, Close' }
      ]
    },
    {
      category: 'Technical Indicators',
      items: [
        { name: 'Moving Average', icon: TrendingUp, description: 'SMA, EMA, WMA' },
        { name: 'RSI', icon: BarChart3, description: 'Relative Strength Index' },
        { name: 'MACD', icon: Zap, description: 'Moving Average Convergence Divergence' }
      ]
    },
    {
      category: 'Conditions',
      items: [
        { name: 'Price Above/Below', icon: TrendingUp, description: 'Price comparison' },
        { name: 'Cross Above/Below', icon: Target, description: 'Line crossovers' },
        { name: 'Time Range', icon: Clock, description: 'Trading hours' }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Strategy Builder</h1>
            <p className="text-sm text-gray-600">Build your trading strategy visually</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Backtest</span>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Deploy</span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Templates & Components */}
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              {/* Templates Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Strategy Templates</h2>
                <div className="space-y-3">
                  {templates.map((template) => {
                    const Icon = template.icon;
                    const colorClasses = {
                      blue: 'from-blue-500 to-blue-600',
                      green: 'from-green-500 to-green-600',
                      purple: 'from-purple-500 to-purple-600',
                      orange: 'from-orange-500 to-orange-600'
                    };

                    return (
                      <div
                        key={template.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[template.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {template.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {template.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600">{template.returns}</span>
                                <span className="text-xs text-blue-600">{template.winRate}</span>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ml-0.5 ${
                                      i < template.complexity ? 'bg-yellow-400' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Components Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
                <div className="space-y-4">
                  {components.map((category) => (
                    <div key={category.category}>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">{category.category}</h3>
                      <div className="space-y-2">
                        {category.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.name}
                              className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                              draggable
                            >
                              <div className="flex items-center space-x-3">
                                <Icon className="h-4 w-4 text-gray-600" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                  <div className="text-xs text-gray-600">{item.description}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 bg-gray-50 relative">
            {selectedTemplate ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Strategy Canvas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Drag components from the sidebar to build your strategy. 
                    Selected template: <span className="font-medium">
                      {templates.find(t => t.id === selectedTemplate)?.name}
                    </span>
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Load Template
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Building Your Strategy
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose a template to get started quickly, or drag components to create a custom strategy from scratch.
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Start from Scratch
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Browse Templates
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Canvas Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            </div>
          </div>

          {/* Right Sidebar - Configuration */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
                <Settings className="h-5 w-5 text-gray-400" />
              </div>

              {selectedTemplate ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Strategy Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Strategy Name
                        </label>
                        <input
                          type="text"
                          defaultValue={templates.find(t => t.id === selectedTemplate)?.name}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Symbol
                        </label>
                        <input
                          type="text"
                          placeholder="RELIANCE, NIFTY, etc."
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time Frame
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>1 minute</option>
                          <option>5 minutes</option>
                          <option>15 minutes</option>
                          <option>1 hour</option>
                          <option selected>1 day</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Risk Management</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position Size (₹)
                        </label>
                        <input
                          type="number"
                          defaultValue="10000"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stop Loss (%)
                        </label>
                        <input
                          type="number"
                          defaultValue="5"
                          step="0.1"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Take Profit (%)
                        </label>
                        <input
                          type="number"
                          defaultValue="10"
                          step="0.1"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Quick Preview</h4>
                    <div className="space-y-2 text-xs text-blue-800">
                      <div className="flex justify-between">
                        <span>Expected Return:</span>
                        <span className="font-medium">+12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Win Rate:</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Drawdown:</span>
                        <span className="font-medium">-8.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">
                    Select a component or template to see configuration options
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StrategyBuilderPage;