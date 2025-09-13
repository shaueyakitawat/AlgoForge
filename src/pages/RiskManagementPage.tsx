import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  Shield, BarChart3, PieChart, Zap, Download, Info, Sparkles, UserCheck
} from 'lucide-react';

// ---------- Utilities & Mock Data ----------
function computeRiskScore({
  var95, maxDrawdown, sharpe, beta, sortino, volatility, largestWeight
}: { var95: number, maxDrawdown: number, sharpe: number, beta: number, sortino: number, volatility: number, largestWeight: number }) {
  let score = 0;
  score += Math.min(var95 / 2000, 25);
  score += Math.min(Math.abs(maxDrawdown) / 0.25, 15);
  score += Math.min(volatility * 1.2, 10);
  score += Math.max(0, (beta - 1) * 12);
  score += Math.max(0, (largestWeight - 15) * 1.5);
  score -= Math.max(0, (sharpe - 1) * 15);
  score -= Math.max(0, (sortino - 1) * 10);
  return Math.round(Math.min(100, Math.max(0, score + 50)));
}
function riskLevel(score: number) {
  if(score < 50) return ["Low Risk", "text-green-600", "bg-green-100"];
  if(score < 70) return ["Medium Risk", "text-yellow-600", "bg-yellow-100"];
  return ["High Risk", "text-red-600", "bg-red-100"];
}
const getRiskColor = (score: number) => score <= 30 ? 'text-green-600' : score <= 70 ? 'text-yellow-600' : 'text-red-600';
const initialPositions = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', value: 174000, weight: 18.5, var: 4200, beta: 0.87, sharpe: 0.95, sortino: 1.1, alpha: 1.9, vol: 21, riskScore: 72 },
  { symbol: 'TCS', name: 'Tata Consultancy', value: 135000, weight: 14.3, var: 2100, beta: 0.92, sharpe: 0.82, sortino: 0.98, alpha: 1.3, vol: 18, riskScore: 68 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', value: 120000, weight: 12.8, var: 2800, beta: 1.23, sharpe: 0.75, sortino: 0.91, alpha: -0.4, vol: 25, riskScore: 75 },
  { symbol: 'INFOSYS', name: 'Infosys Ltd', value: 98000, weight: 10.4, var: 1500, beta: 1.05, sharpe: 0.79, sortino: 0.99, alpha: 0.5, vol: 19, riskScore: 65 }
];
const defaultPortfolio = {
  value: 941000, var95: 15450, var99: 23800, beta: 1.08, sharpe: 0.92, alpha: 1.2,
  sortino: 1.01, volatility: 18.6, maxDrawdown: -7.3, streak: 6, score: 70
};
const scenarioEffects = {
  "none": { var95: 15450, sharpe: 0.92, beta: 1.08, alpha: 1.2, sortino: 1.01, volatility: 18.6, maxDrawdown: -7.3, score: 70 },
  "fall": { var95: 21240, sharpe: 0.71, beta: 1.22, alpha: -0.4, sortino: 0.72, volatility: 22.3, maxDrawdown: -13.9, score: 84 },
  "vol":  { var95: 19100, sharpe: 0.87, beta: 1.14, alpha: 0.6, sortino: 0.89, volatility: 21.7, maxDrawdown: -11.2, score: 77 }
};
const sampleMonteCarlo = [
  ["<-10%", 7], ["-10%/-5%", 25], ["-5%/0%", 152], ["0%/5%", 503], ["5%/10%", 234], [">10%", 59]
];
const leaderboard = [
  { user: "Priya", sharpe: 1.49 },
  { user: "Ajay", sharpe: 1.21 },
  { user: "You", sharpe: 0.92 }
];
const metricExplainers: Record<string, string> = {
  var95: "VaR (Value at Risk) estimates the most you're likely to lose in a day in 95% of cases.",
  var99: "VaR (99%) is more conservative: ~1 in 100 chance of losing more than this.",
  sharpe: "Sharpe ratio measures risk-adjusted return (>1 is strong).",
  beta: "Beta shows portfolio's sensitivity to the overall market (1.0 = neutral).",
  alpha: "Alpha is your portfolio's outperformance over the benchmark.",
  sortino: "Sortino ratio only penalizes downside risk (high = better).",
  volatility: "Volatility is fluctuation in returns (lower is safer)."
};

// ---------- Main Component ----------
const RiskManagementPage: React.FC = () => {
  const [positions, setPositions] = useState(initialPositions);
  const [editing, setEditing] = useState<{symbol?: string, field?: string} | null>(null);
  const [editValue, setEditValue] = useState('');
  const [scenario, setScenario] = useState<"none"|"fall"|"vol">("none");
  const [education, setEducation] = useState<string | null>(null);
  const [showRiskExplain, setShowRiskExplain] = useState(false);
  const portfolio = { ...defaultPortfolio, ...(scenario !== "none" ? scenarioEffects[scenario] : {}) };

  const riskScore = computeRiskScore({
    var95: portfolio.var95,
    maxDrawdown: portfolio.maxDrawdown ?? -8,
    sharpe: portfolio.sharpe,
    beta: portfolio.beta,
    sortino: portfolio.sortino,
    volatility: portfolio.volatility,
    largestWeight: positions.length ? Math.max(...positions.map(p=>p.weight)) : 0
  });
  const [riskLabel, riskTextColor, riskBgColor] = riskLevel(riskScore);

  const maxRisk = Math.max(
    portfolio.var95/2000,
    Math.abs(portfolio.maxDrawdown)/0.25,
    portfolio.volatility*1.2,
    Math.max(0, (portfolio.beta-1)*12),
    Math.max(0, (positions.length ? Math.max(...positions.map(p=>p.weight))-15 : 0)*1.5)
  );
  const mainDriver =
    maxRisk===portfolio.var95/2000 ? "Value at Risk" :
    maxRisk===Math.abs(portfolio.maxDrawdown)/0.25 ? "Max Drawdown" :
    maxRisk===portfolio.volatility*1.2 ? "Volatility" :
    maxRisk===(positions.length ? Math.max(...positions.map(p=>p.weight))-15 : 0)*1.5 ? "Concentration (>15%)" :
    maxRisk===Math.max(0, (portfolio.beta-1)*12) ? "Beta (market risk)" : "Sharpe/Sortino";

  const suggestions = [
    portfolio.sharpe < 1 ? "Sharpe ratio is low: reduce HDFCBANK or add hedge to boost risk-adjusted returns." : "Sharpe ratio is healthy.",
    positions.some(pos => pos.weight > 18) ? "Trim Reliance to lower concentration risk." : "Concentration ok.",
    portfolio.beta > 1.1 ? "Beta is high: Portfolio will suffer if market drops, add defensive stocks." : "Beta ok.",
    positions.some(pos => pos.riskScore > 70) ? "Some positions are high risk — try reducing weight or hedging those stocks." : "No high-risk exposures."
  ];

  const startEdit = (symbol: string, field: string, value: number) => { setEditing({symbol, field}); setEditValue(value.toString()); };
  const saveEdit = () => {
    if (editing && editValue) {
      const newVal = parseFloat(editValue);
      const updated = positions.map(pos =>
        (pos.symbol === editing.symbol)
        ? { ...pos, [editing.field!]: newVal }
        : pos
      );
      setPositions(updated); setEditing(null); setEditValue('');
    }
  };
  const removePosition = (symbol: string) =>
    setPositions(positions.filter(p => p.symbol !== symbol));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-0.5">Risk Management</h1>
            <p className="text-gray-600">Portfolio risk, analytics, scenarios, and improvement suggestions.</p>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-gray-500">Last updated: 2:45 PM</span>
            <button className="flex items-center px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200">
              <Download className="w-4 h-4 mr-2" />Export Report
            </button>
          </div>
        </div>

        {/* OVERALL RISK SCORE CARD */}
        <div className={`flex flex-wrap items-center justify-between gap-8 p-8 rounded-2xl shadow border-2 ${riskBgColor} mb-10`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-gray-800">Portfolio Risk Score</span>
              <button className="text-xs underline text-blue-600" onClick={()=>setShowRiskExplain(v=>!v)}>How is this calculated?</button>
            </div>
            <div className={`text-2xl font-bold ${riskTextColor}`}>{riskScore}/100 <span className="ml-2 text-lg font-medium">{riskLabel}</span></div>
            {showRiskExplain && (
              <div className="mt-2 bg-white px-3 py-2 rounded shadow text-xs text-gray-700 w-[20rem] max-w-full">
                The score weights several metrics (VaR, drawdown, Sharpe, beta, volatility, concentration).
                <br/>
                <span className="font-bold text-sm">{mainDriver}</span> is contributing the most to your current risk.
                <br />
                Lower VaR, drawdown, volatility, beta, or concentration, and higher Sharpe/Sortino will improve the score.
                <button onClick={()=>setShowRiskExplain(false)} className="block mt-2 text-right w-full text-xs text-blue-500">✕ close</button>
              </div>
            )}
          </div>
          <div className="relative w-24 h-24 flex flex-col items-center">
            <svg className="w-24 h-24 rotate-[135deg]">
              <circle cx="48" cy="48" r="38" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="48" cy="48" r="38"
                stroke={riskScore < 50 ? "#10b981" : riskScore < 70 ? "#f59e0b" : "#ef4444"}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - riskScore / 100)}`}
                className="transition-all duration-300"
                style={{transition:'stroke-dashoffset 0.5s'}}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${riskTextColor}`}>{riskScore}</span>
          </div>
        </div>

        {/* METRICS GRID + EDUCATION LAYER */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
          {[
            {key: 'var95', label: 'VaR 95%', val: `₹${portfolio.var95.toLocaleString()}`},
            {key: 'var99', label: 'VaR 99%', val: `₹${portfolio.var99.toLocaleString()}`},
            {key: 'sharpe', label: 'Sharpe', val: portfolio.sharpe.toFixed(2)},
            {key: 'sortino', label: 'Sortino', val: portfolio.sortino.toFixed(2)},
            {key: 'beta', label: 'Beta', val: portfolio.beta.toFixed(2)},
            {key: 'alpha', label: 'Alpha', val: portfolio.alpha.toFixed(2)},
            {key: 'volatility', label: 'Volatility', val: `${portfolio.volatility.toFixed(2)}%`}
          ].map(({key, label, val}) => (
            <div key={key} className="bg-white rounded-xl shadow border border-gray-200 p-5 flex flex-col text-center items-center relative">
              <span className="flex items-center text-xs text-gray-500 mb-1">
                {label}
                <button onClick={() => setEducation(key)}><Info className="w-3.5 h-3.5 ml-1 text-blue-300" /></button>
              </span>
              <span className="text-lg font-bold">{val}</span>
              {education === key && (
                <div className="absolute z-40 bg-white border rounded shadow-md p-3 text-gray-800 text-xs top-12 left-1/2 -translate-x-1/2 w-56">
                  {metricExplainers[key]}
                  <button className="absolute top-1 right-2 text-xs text-blue-500" onClick={() => setEducation(null)}>✕</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SCENARIO BEFORE/AFTER */}
        <div className="bg-white rounded-2xl shadow border p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <span className="font-semibold text-lg">What-If Scenarios:</span>
            </div>
            <div className="flex gap-4 flex-wrap ml-2">
              <button className={`px-4 py-1 rounded-full font-semibold ${scenario === "none" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={()=>setScenario("none")}>Normal</button>
              <button className={`px-4 py-1 rounded-full font-semibold ${scenario === "fall" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={()=>setScenario("fall")}>Market Down 5%</button>
              <button className={`px-4 py-1 rounded-full font-semibold ${scenario === "vol" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={()=>setScenario("vol")}>Volatility Spike</button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Before</div>
              <div className="bg-gray-50 rounded-lg shadow p-5">
                <div className="flex flex-wrap gap-8 mb-2">
                  <span className="font-semibold text-gray-700 text-base">VaR 95%: <span className="text-red-600">₹15,450</span></span>
                  <span className="font-semibold text-base">Sharpe: 0.92</span>
                  <span className="font-semibold text-base">Beta: 1.08</span>
                  <span className="font-semibold text-base">Drawdown: -7.3%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">After Scenario</div>
              <div className="bg-gray-50 rounded-lg shadow p-5">
                <div className="flex flex-wrap gap-8 mb-2">
                  <span className="font-semibold text-gray-700 text-base">
                    VaR 95%: <span className="text-red-600">{scenario === "fall" ? "₹21,240" : scenario === "vol" ? "₹19,100" : "₹15,450"}</span>
                  </span>
                  <span className="font-semibold text-base">Sharpe: {scenario === "fall" ? "0.71" : scenario === "vol" ? "0.87" : "0.92"}</span>
                  <span className="font-semibold text-base">Beta: {scenario === "fall" ? "1.22" : scenario === "vol" ? "1.14" : "1.08"}</span>
                  <span className="font-semibold text-base">Drawdown: {scenario === "fall" ? "-13.9%" : scenario === "vol" ? "-11.2%" : "-7.3%"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRID: TABLES AND CHARTS */}
        <div className="grid gap-12 lg:grid-cols-2 mb-10">
          {/* Position Table */}
          <div>
            <div className="bg-white rounded-2xl shadow border p-7 mb-8">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Positions & Risk Metrics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-white z-10 border-b-2 border-gray-200">
                    <tr>
                      <th className="text-left text-xs text-gray-500 font-semibold pb-2">Symbol</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Value</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Weight (%)</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">VaR</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Beta</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Sharpe</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Sortino</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Alpha</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Vol</th>
                      <th className="text-right text-xs text-gray-500 font-semibold pb-2">Risk</th>
                      <th className="text-center text-xs text-gray-500 font-semibold pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos) => (
                      <tr key={pos.symbol} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 font-medium text-gray-900">{pos.symbol}
                          <span className="ml-1 text-xs text-gray-400 font-normal">{pos.name}</span>
                        </td>
                        <td className="text-right py-3">₹{pos.value.toLocaleString()}</td>
                        <td className="text-right py-3">
                          {editing?.symbol === pos.symbol && editing.field === "weight" ? (
                            <>
                              <input
                                className="w-12 border rounded px-1 text-right"
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                onBlur={saveEdit}
                                autoFocus
                                type="number"
                                step="0.1"
                              />
                              <button className="ml-1 text-xs text-green-700" onClick={saveEdit}>Save</button>
                            </>
                          ) : (
                            <>
                              {pos.weight}
                              <button className="ml-2 text-xs text-blue-600 underline" onClick={() => startEdit(pos.symbol, "weight", pos.weight)}>
                                edit
                              </button>
                            </>
                          )}
                        </td>
                        <td className="text-right py-3">₹{pos.var.toLocaleString()}</td>
                        <td className="text-right py-3">{pos.beta.toFixed(2)}</td>
                        <td className="text-right py-3">{pos.sharpe.toFixed(2)}</td>
                        <td className="text-right py-3">{pos.sortino.toFixed(2)}</td>
                        <td className="text-right py-3">{pos.alpha.toFixed(2)}</td>
                        <td className="text-right py-3">{pos.vol.toFixed(1)}</td>
                        <td className={`text-right py-3 font-bold ${getRiskColor(pos.riskScore)}`}>{pos.riskScore}</td>
                        <td className="text-center py-3">
                          <button onClick={() => removePosition(pos.symbol)}
                            className="text-xs text-red-500 hover:underline">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CHART COLUMN: Monte Carlo & Attribution */}
          <div className="flex flex-col gap-10">
            {/* Monte Carlo */}
            <div className="bg-white rounded-2xl shadow border p-7 min-h-[235px] flex flex-col">
              <div className="flex items-center mb-3">
                <Zap className="h-5 w-5 text-purple-500 mr-2" />
                <h4 className="font-semibold text-lg text-gray-900">Monte Carlo Simulation</h4>
              </div>
              <div className="flex flex-col items-center flex-1 justify-center mt-2">
                <div className="flex justify-center items-end h-28 gap-3 w-full mt-4 mb-0">
                  {sampleMonteCarlo.map(([bucket, val], idx) => (
                    <div key={bucket} className="flex flex-col items-center">
                      <div style={{height: `${val/5 + 24}px`}} className="w-9 mb-1 rounded-t bg-purple-400"><span className="block h-full w-full"></span></div>
                      <span className="text-xs text-gray-500">{bucket}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center w-full justify-between text-xs text-gray-700 mb-2">
                  <span><b>Tail loss:</b> 4% chance of -10% week</span>
                  <span><b>5%+ gain:</b> 28% odds</span>
                </div>
                <div className="text-xs text-purple-500 text-center w-full">
                  1000 simulated future states (mock)
                </div>
              </div>
            </div>
            {/* Risk Breakdown */}
            <div className="bg-white rounded-2xl shadow border p-7 min-h-[205px] flex flex-col">
              <div className="flex items-center mb-3">
                <PieChart className="h-5 w-5 text-blue-500 mr-2" />
                <h4 className="font-semibold text-lg text-gray-900">Risk Attribution</h4>
              </div>
              <div className="w-full overflow-x-auto">
                <div className="flex items-end gap-7 justify-center min-h-[135px] px-4 py-2" style={{maxWidth:'100%', overflowX:'auto'}}>
                  {positions.map((pos, idx) => (
                    <div key={pos.symbol} className="flex flex-col items-center">
                      <div
                        className="rounded-t transition-all"
                        style={{
                          background: idx % 2 ? "#38bdf8" : "#818cf8",
                          width: 32,
                          height: `${Math.min(120, 55 + pos.riskScore/1.1)}px`,
                          minHeight: 32,
                          maxHeight: 120,
                          transition: "height 0.3s"
                        }}
                      />
                      <span className="mt-1 text-xs text-blue-800 font-bold">{pos.symbol}</span>
                      <span className={`text-xs ${getRiskColor(pos.riskScore)}`}>{pos.riskScore}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full text-xs text-center mt-3">
                <b>{positions.reduce((max, p) => p.riskScore > max.riskScore ? p : max, positions[0]).symbol}</b> is your top risk driver
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONABLE SUGGESTIONS */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow border-blue-100 mt-14 mb-7 px-10 py-9 text-gray-900">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-green-400 mr-2" />
            <h4 className="font-bold text-xl text-blue-900">Risk Reduction Suggestions</h4>
          </div>
          <ul className="list-disc ml-8 space-y-3 text-lg">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-center">
                <span>{s}</span>
                <button className="ml-4 px-2.5 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => alert(`Applied: "${s}"\n(In demo, this would execute hedge/sell/etc.)`)}>
                  Apply
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-gray-400">AI-powered, tuned for your positions and risk settings.</div>
        </div>

        {/* GAMIFIED STREAK & LEADERBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          <div className="bg-white p-7 rounded-2xl shadow border flex items-center gap-5">
            <UserCheck className="h-10 w-10 text-green-500" />
            <div>
              <div className="font-medium text-lg text-gray-900">Streak: <span className="text-green-600 font-bold">{portfolio.streak}</span> days below risk threshold!</div>
              <div className="text-xs text-gray-500 mt-1">Keep it up and win safer trading badges!</div>
            </div>
          </div>
          <div className="bg-white p-7 rounded-2xl shadow border">
            <div className="font-bold text-lg text-gray-900 mb-2 flex items-center"><Sparkles className="h-5 w-5 text-yellow-500 mr-2" /> Sharpe Leaderboard</div>
            <ol className="list-decimal ml-6 text-base">{leaderboard.map(({user, sharpe}, i) =>
              <li key={user} className={user === "You" ? "text-blue-700 font-bold" : ""}>{user} <span className="ml-2 text-xs text-gray-500">Sharpe {sharpe}</span> {user === "You" && " (you)"}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiskManagementPage;
