import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Shield, 
  TrendingDown, 
  AlertTriangle,
  Target,
  BarChart3,
  Activity,
  PieChart,
  Zap
} from 'lucide-react';

const RiskManagementPage: React.FC = () => {
  const riskScore = 65;
  
  const portfolioData = {
    totalValue: 941000,
    dayPL: -2500,
    dayPLPercent: -0.27,
    var95: 15450,
    maxDrawdown: -7.3,
    concentration: {
      largest: 18.5,
      top5: 62.3,
      largestSector: 35
    }
  };

  const positions = [
    { symbol: 'RELIANCE', value: 174000, weight: 18.5, var: 4200, beta: 0.87, riskScore: 72 },
    { symbol: 'TCS', value: 135000, weight: 14.3, var: 2100, beta: 0.92, riskScore: 68 },
    { symbol: 'HDFCBANK', value: 120000, weight: 12.8, var: 2800, beta: 1.23, riskScore: 75 },
    { symbol: 'INFOSYS', value: 98000, weight: 10.4, var: 1500, beta: 1.05, riskScore: 65 }
  ];

  const alerts = [
    { type: 'critical', message: 'RELIANCE position breached stop-loss', time: '2:45 PM', action: true },
    { type: 'warning', message: 'Portfolio VaR increased 15%', time: '2:30 PM', action: false },
    { type: 'warning', message: 'TCS position size exceeds 20% limit', time: '1:15 PM', action: true },
    { type: 'info', message: 'Bank Nifty volatility spike detected', time: '12:00 PM', action: false }
  ];

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-600';
    if (score <= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (score: number) => {
    if (score <= 30) return 'bg-green-500';
    if (score <= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Risk Management</h1>
            <p className="text-gray-600">Monitor and control portfolio risk in real-time</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Last updated: 2:45 PM
            </div>
          </div>
        </div>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Risk Gauge */}
          <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Risk</h3>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke={riskScore <= 30 ? '#10b981' : riskScore <= 70 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - riskScore / 100)}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${getRiskColor(riskScore)}`}>{riskScore}</span>
                </div>
              </div>
              <div className={`text-sm font-medium ${getRiskColor(riskScore)}`}>
                MEDIUM-HIGH RISK
              </div>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold text-gray-900">Value at Risk</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₹{portfolioData.var95.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-2">1-Day VaR (95%)</div>
              <div className="text-xs text-gray-500">
                1.55% of portfolio • 2 breaches this month
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Activity className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Drawdown</h3>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {portfolioData.maxDrawdown}%
              </div>
              <div className="text-sm text-gray-600 mb-2">Current Drawdown</div>
              <div className="text-xs text-gray-500">
                12 days • Peak: ₹10,15,000
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <PieChart className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Concentration</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {portfolioData.concentration.largest}%
              </div>
              <div className="text-sm text-gray-600 mb-2">Largest Position</div>
              <div className="text-xs text-gray-500">
                IT Sector: {portfolioData.concentration.largestSector}%
              </div>
            </div>
          </div>
        </div>

        {/* Live Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Live Risk Alerts</h2>
          </div>
          
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`border-l-4 pl-4 py-2 ${
                  alert.type === 'critical' ? 'border-red-500 bg-red-50' :
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.type === 'critical' ? 'bg-red-500' :
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className="font-medium text-gray-900">{alert.message}</span>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                  {alert.action && (
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Position Risk Analysis */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Position Risk Analysis</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-medium text-gray-600 pb-2">Position</th>
                    <th className="text-right text-sm font-medium text-gray-600 pb-2">Weight</th>
                    <th className="text-right text-sm font-medium text-gray-600 pb-2">VaR</th>
                    <th className="text-right text-sm font-medium text-gray-600 pb-2">Risk</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {positions.map((position) => (
                    <tr key={position.symbol} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {position.symbol.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{position.symbol}</span>
                        </div>
                      </td>
                      <td className="text-right py-3">
                        <span className="text-sm text-gray-900">{position.weight}%</span>
                      </td>
                      <td className="text-right py-3">
                        <span className="text-sm text-gray-900">₹{position.var.toLocaleString()}</span>
                      </td>
                      <td className="text-right py-3">
                        <div className="flex items-center justify-end space-x-2">
                          <span className={`text-sm font-medium ${getRiskColor(position.riskScore)}`}>
                            {position.riskScore}
                          </span>
                          <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Management Tools */}
          <div className="space-y-6">
            {/* Hedging Suggestions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Hedging Suggestions</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Reduce Tech Exposure</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Consider shorting IT Index futures to hedge 35% tech concentration
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Risk reduction: 15%</span>
                    <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Apply Hedge
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Protective Puts</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Buy puts on RELIANCE to protect against downside
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600">Cost: ₹2,500</span>
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      View Options
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Risk Metrics</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Portfolio Beta</span>
                  <span className="font-medium">1.15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Correlation (Avg)</span>
                  <span className="font-medium">0.67</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Effective Bets</span>
                  <span className="font-medium">4.2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tracking Error</span>
                  <span className="font-medium">8.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiskManagementPage;