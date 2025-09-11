import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  Check,
  Star,
  Zap,
  Crown,
  Download,
  Calendar,
  AlertCircle
} from 'lucide-react';

const BillingPage: React.FC = () => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      description: 'Perfect for learning and getting started',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        '5 strategy backtests per month',
        'Basic templates library',
        'Paper trading (unlimited)',
        'Learning hub access',
        'Community forum access',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'No live trading connection',
        'No advanced analytics',
        'No AI Copilot',
        'No premium templates',
        'No priority support'
      ],
      buttonText: 'Current Plan',
      isPopular: false
    },
    {
      id: 'premium',
      name: 'Professional',
      description: 'For serious traders who want full features',
      monthlyPrice: 999,
      annualPrice: 799,
      features: [
        'Unlimited strategy backtests',
        'All premium templates',
        'Live trading (3 broker connections)',
        'Advanced analytics & risk tools',
        'AI Copilot (unlimited queries)',
        'Monte Carlo simulations',
        'Portfolio optimization',
        'Priority support (24/7)',
        'API access',
        'Custom indicators',
        'Advanced charting',
        'Risk management tools'
      ],
      limitations: [],
      buttonText: 'Start 7-Day Free Trial',
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Institution',
      description: 'For institutions and large trading teams',
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Everything in Professional',
        'White-label options',
        'Multiple team accounts',
        'Advanced compliance tools',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment',
        'Advanced reporting',
        'Audit trails'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      isPopular: false
    }
  ];

  const creditPackages = [
    {
      credits: 100,
      price: 99,
      originalPrice: null,
      description: 'Best for: Beginners',
      isPopular: false
    },
    {
      credits: 500,
      price: 399,
      originalPrice: 499,
      description: 'Best for: Regular Users',
      isPopular: true
    },
    {
      credits: 1000,
      price: 699,
      originalPrice: 999,
      description: 'Best for: Heavy Users',
      isPopular: false
    }
  ];

  const billingHistory = [
    {
      date: '15-07-2025',
      plan: 'Professional',
      amount: 999,
      status: 'Paid',
      invoice: 'INV-2025-001'
    },
    {
      date: '15-06-2025',
      plan: 'Professional',
      amount: 999,
      status: 'Paid',
      invoice: 'INV-2025-002'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription and billing information</p>
        </div>

        {/* Current Subscription Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Current Subscription</h2>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-blue-600">
                  {user?.subscription === 'free' ? 'Free Plan' : 
                   user?.subscription === 'premium' ? 'Professional Plan' : 'Enterprise Plan'}
                </span>
                {user?.subscription === 'premium' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                )}
              </div>
              {user?.subscription !== 'free' && (
                <p className="text-gray-600 mt-2">
                  Next billing: August 15, 2025 • ₹999/month
                </p>
              )}
            </div>
            {user?.subscription !== 'free' && (
              <div className="text-right">
                <button className="text-sm text-red-600 hover:text-red-700 underline">
                  Cancel Subscription
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Credits Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Credits Balance</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{user?.credits}</div>
            <div className="text-sm text-gray-600 mb-4">
              150 credits expire in 30 days
            </div>
            <button className="w-full bg-yellow-50 text-yellow-700 py-2 rounded-lg hover:bg-yellow-100 transition-colors">
              Buy More Credits
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Backtests</span>
                <span className="font-medium">320 credits (71%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Advanced Analytics</span>
                <span className="font-medium">85 credits (19%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">AI Copilot</span>
                <span className="font-medium">45 credits (10%)</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">450/1000 credits used</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Earning</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Learning courses</span>
                <span className="text-green-600">+50 credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily login</span>
                <span className="text-green-600">+5 credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Referrals</span>
                <span className="text-green-600">+100 credits</span>
              </div>
            </div>
            <button className="w-full bg-green-50 text-green-700 py-2 rounded-lg hover:bg-green-100 transition-colors mt-4">
              View All Ways
            </button>
          </div>
        </div>

        {/* Pricing Toggle */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="ml-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${
                plan.isPopular
                  ? 'border-blue-500 relative'
                  : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                {plan.monthlyPrice !== null ? (
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-900">
                      ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                    </div>
                    <div className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'month' : 'month (billed yearly)'}
                    </div>
                    {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-green-600 mt-1">
                        Save ₹{(plan.monthlyPrice - plan.annualPrice) * 12} annually
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900 mb-2">Custom Pricing</div>
                    <div className="text-gray-600">Contact our sales team</div>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start space-x-3 opacity-50">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-gray-400 rounded"></div>
                    </div>
                    <span className="text-sm text-gray-500">{limitation}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.id === 'free'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                disabled={plan.id === 'free'}
              >
                {plan.buttonText}
              </button>

              {plan.id === 'premium' && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Cancel anytime. ₹0 for first 7 days
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Credit Packages */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Credit Packages</h2>
            <p className="text-gray-600">Buy credits to unlock additional backtests and AI features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPackages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
                  pkg.isPopular ? 'border-orange-500 relative' : 'border-gray-200'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {pkg.credits} Credits
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    ₹{pkg.price}
                    {pkg.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ₹{pkg.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">{pkg.description}</div>
                  
                  <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    pkg.isPopular
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>Download All</span>
            </button>
          </div>

          {billingHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Plan</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((bill, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 text-sm text-gray-900">{bill.date}</td>
                      <td className="py-3 text-sm text-gray-900">{bill.plan}</td>
                      <td className="py-3 text-sm text-gray-900">₹{bill.amount}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {bill.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No billing history available</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;