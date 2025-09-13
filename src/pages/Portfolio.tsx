import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

// Example mock data
const equityPositions = [
    { symbol: "RELIANCE", name: "Reliance", qty: 10, avgPrice: 1378, currentPrice: 1395, pnl: 170, exposure: 13950 },
    { symbol: "TCS", name: "TCS", qty: 6, avgPrice: 3120, currentPrice: 3133, pnl: 78, exposure: 18798 },
    { symbol: "ICICIBANK", name: "ICICI Bank", qty: 8, avgPrice: 1400, currentPrice: 1417.5, pnl: 140, exposure: 11340 },
    { symbol: "LT", name: "L&T", qty: 4, avgPrice: 3550, currentPrice: 3579, pnl: 116, exposure: 14316 },
    { symbol: "INFY", name: "Infosys", qty: 10, avgPrice: 1525, currentPrice: 1524.1, pnl: -9, exposure: 15241 },
    { symbol: "BAJFINANCE", name: "Bajaj Finance", qty: 3, avgPrice: 980, currentPrice: 1002.7, pnl: 68.1, exposure: 3008 },
    { symbol: "AXISBANK", name: "Axis Bank", qty: 6, avgPrice: 1100, currentPrice: 1105.5, pnl: 33, exposure: 6633 },
    { symbol: "MARUTI", name: "Maruti Suzuki", qty: 1, avgPrice: 15000, currentPrice: 15307, pnl: 307, exposure: 15307 },
    { symbol: "TATAMOTORS", name: "Tata Motors", qty: 14, avgPrice: 705, currentPrice: 714.15, pnl: 128.1, exposure: 9998 },
    { symbol: "HINDALCO", name: "Hindalco", qty: 22, avgPrice: 743, currentPrice: 757.9, pnl: 327.8, exposure: 16674 },
  ];
  
  const derivativePositions = [
    { symbol: "NIFTY23SEP25100CE", type: "Option", side: "Sell", qty: 75, strike: 25100, expiry: "2025-09-25", price: 112, pnl: -900, margin: 12800 },
    { symbol: "NIFTY23SEP25100PE", type: "Option", side: "Sell", qty: 75, strike: 25100, expiry: "2025-09-25", price: 98, pnl: 620, margin: 12700 },
    { symbol: "BANKNIFTY23SEP54800FUT", type: "Futures", side: "Sell", qty: 15, expiry: "2025-09-25", price: 54809, pnl: -4300, margin: 22100 },
    { symbol: "BANKNIFTY23SEP54700FUT", type: "Futures", side: "Sell", qty: 10, expiry: "2025-09-25", price: 54809, pnl: 1870, margin: 14700 },
  ];
  
  const fundPositions = [
    { symbol: "NIPBEES", name: "Nippon India ETF", units: 25, nav: 205, value: 5125, pnl: 325 }
  ];
  const cashPosition = { balance: 8250 };
  

// Asset Allocation (aggregate for pie)
const allocation = [
    { type: "Equity", value: 119265 }, // sum qty*LTP for above stocks
    { type: "Derivatives", value: 5230 }, // sum margins for open positions, or mtm values if preferred
    { type: "Funds", value: 5125 },
    { type: "Cash", value: 8250 },
  ];
  

const assetTabs = [
  { label: "Equity", key: "equity" },
  { label: "Derivatives", key: "derivatives" },
  { label: "Funds", key: "funds" },
  { label: "Cash", key: "cash" },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("equity");
  const totalPortfolioValue = allocation.reduce((sum, item) => sum + item.value, cashPosition.balance);
  return (
    <DashboardLayout>
      <div className="px-6 py-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm">My Portfolio</h1>
            <div className="text-sm text-gray-500 mt-1">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">Demo Preview</span>
              <span className="ml-2">Total holdings across asset classes</span>
            </div>
          </div>
        </div>
        
        {/* Aggregate Metrics + Asset Allocation */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border shadow text-center flex flex-col justify-center">
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-1">Total Value</div>
            <div className="text-3xl font-extrabold text-blue-700">₹{totalPortfolioValue.toLocaleString("en-IN")}</div>
          </div>
          {allocation.map(a => (
            <div key={a.type} className="bg-white rounded-2xl p-5 border shadow text-center flex flex-col justify-center">
              <div className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">{a.type}</div>
              <div className="text-xl font-bold text-gray-800">₹{a.value.toLocaleString("en-IN")}</div>
              <div className={`text-xs font-semibold mt-1 ${a.type === 'Cash' ? 'text-green-600' : 'text-gray-400'}`}>{((a.value * 100) / totalPortfolioValue).toFixed(1)}%</div>
            </div>
          ))}
        </div>

        {/* Asset Class Tabs */}
        <div className="mb-4 flex flex-wrap gap-2 border-b border-gray-200">
          {assetTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 transition 
                text-sm font-semibold 
                ${activeTab === tab.key ? 
                  "bg-gradient-to-tr from-blue-500 to-blue-600 text-white shadow rounded-t-xl border-b-2 border-blue-500" 
                  : 
                  "text-blue-600 bg-white rounded-t-xl hover:bg-blue-50 border-b-2 border-transparent"}
              `}
              style={{ minWidth: 110 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-50 drop-shadow-sm">
          {activeTab === "equity" && (
            <>
              <div className="font-bold text-lg mb-4 text-blue-700">Equity Holdings</div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr className="text-gray-400 bg-gray-50">
                      <th className="py-2 px-2 text-left">Symbol</th>
                      <th className="py-2 px-2 text-left">Name</th>
                      <th className="py-2 px-2 text-right">Qty</th>
                      <th className="py-2 px-2 text-right">Avg Price</th>
                      <th className="py-2 px-2 text-right">LTP</th>
                      <th className="py-2 px-2 text-right">P&L</th>
                      <th className="py-2 px-2 text-right">Exposure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equityPositions.map(p => (
                      <tr key={p.symbol} className="hover:bg-blue-50/60 transition">
                        <td className="py-1 px-2 font-mono font-bold">{p.symbol}</td>
                        <td className="py-1 px-2">{p.name}</td>
                        <td className="py-1 px-2 text-right">{p.qty}</td>
                        <td className="py-1 px-2 text-right">₹{p.avgPrice}</td>
                        <td className="py-1 px-2 text-right">₹{p.currentPrice}</td>
                        <td className={`py-1 px-2 text-right font-bold ${p.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {p.pnl >= 0 ? "+" : ""}₹{p.pnl}
                        </td>
                        <td className="py-1 px-2 text-right">₹{p.exposure.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "derivatives" && (
            <>
              <div className="font-bold text-lg mb-4 text-purple-700">Derivative Positions</div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr className="text-gray-400 bg-gray-50">
                      <th className="py-2 px-2">Symbol</th>
                      <th className="py-2 px-2">Type</th>
                      <th className="py-2 px-2">Side</th>
                      <th className="py-2 px-2 text-right">Qty</th>
                      <th className="py-2 px-2 text-right">Strike/Price</th>
                      <th className="py-2 px-2 text-right">Expiry</th>
                      <th className="py-2 px-2 text-right">P&L</th>
                      <th className="py-2 px-2 text-right">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {derivativePositions.map(p => (
                      <tr key={p.symbol} className="hover:bg-purple-50/50 transition">
                        <td className="py-1 px-2 font-mono font-bold">{p.symbol}</td>
                        <td className="py-1 px-2">{p.type}</td>
                        <td className={`py-1 px-2 font-semibold ${p.side === 'Sell' ? 'text-red-500' : 'text-green-600'}`}>{p.side}</td>
                        <td className="py-1 px-2 text-right">{p.qty}</td>
                        <td className="py-1 px-2 text-right">{p.strike ? p.strike : p.price}</td>
                        <td className="py-1 px-2 text-right">{p.expiry}</td>
                        <td className={`py-1 px-2 text-right font-bold ${p.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {p.pnl >= 0 ? "+" : ""}₹{p.pnl}
                        </td>
                        <td className="py-1 px-2 text-right">₹{p.margin.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "funds" && (
            <>
              <div className="font-bold text-lg mb-4 text-yellow-700">ETFs / Mutual Funds</div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr className="text-gray-400 bg-gray-50">
                      <th className="py-2 px-2">Symbol</th>
                      <th className="py-2 px-2">Name</th>
                      <th className="py-2 px-2 text-right">Units</th>
                      <th className="py-2 px-2 text-right">NAV</th>
                      <th className="py-2 px-2 text-right">Value</th>
                      <th className="py-2 px-2 text-right">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundPositions.map(p => (
                      <tr key={p.symbol} className="hover:bg-yellow-50/50 transition">
                        <td className="py-1 px-2 font-mono font-bold">{p.symbol}</td>
                        <td className="py-1 px-2">{p.name}</td>
                        <td className="py-1 px-2 text-right">{p.units}</td>
                        <td className="py-1 px-2 text-right">₹{p.nav}</td>
                        <td className="py-1 px-2 text-right">₹{p.value.toLocaleString("en-IN")}</td>
                        <td className={`py-1 px-2 text-right font-bold ${p.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>{p.pnl >= 0 ? "+" : ""}₹{p.pnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "cash" && (
            <div className="flex flex-col items-center py-8">
              <div className="font-bold text-lg mb-2 text-green-700">Cash Balance</div>
              <div className="text-3xl font-extrabold text-green-700 bg-green-50 px-8 py-2 rounded-xl shadow border border-green-200">
                ₹{cashPosition.balance.toLocaleString("en-IN")}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}