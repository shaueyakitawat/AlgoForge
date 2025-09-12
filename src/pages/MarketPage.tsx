import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useData } from "../contexts/DataContext";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Filter,
  Search,
  BarChart3,
  Clock,
  Volume2,
} from "lucide-react";

const MarketPage: React.FC = () => {
  // added marketBreadth, refreshData, loading, error
  const {
    indices,
    topStocks,
    isMarketOpen,
    lastUpdated,
    marketBreadth,
    refreshData,
    loading,
  } = useData();

  const [activeTab, setActiveTab] = useState<"indices" | "stocks" | "options">(
    "indices"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const formatTime = (date: Date | null | undefined) => {
    if (!date) return "-";
    try {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  const filteredStocks = (topStocks || []).filter((stock) =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute human-readable time until close / open
  const getMarketCountdownText = (): string => {
    const now = new Date();

    const setToTime = (d: Date, hh: number, mm: number) => {
      const r = new Date(d);
      r.setHours(hh, mm, 0, 0);
      return r;
    };

    const openToday = setToTime(now, 9, 15);
    const closeToday = setToTime(now, 15, 30);

    const isWeekday = (day: number) => day >= 1 && day <= 5;
    const day = now.getDay();

    if (isMarketOpen) {
      // market open -> time until close today
      const diffMs = Math.max(0, closeToday.getTime() - now.getTime());
      const hrs = Math.floor(diffMs / 3600000);
      const mins = Math.floor((diffMs % 3600000) / 60000);
      return `Closes in ${hrs}h ${mins}m`;
    } else {
      // market closed -> next open
      // if before open today (weekday)
      if (now < openToday && isWeekday(day)) {
        const diffMs = openToday.getTime() - now.getTime();
        const hrs = Math.floor(diffMs / 3600000);
        const mins = Math.floor((diffMs % 3600000) / 60000);
        return `Opens in ${hrs}h ${mins}m`;
      }

      // otherwise find next weekday (Mon-Fri) at 09:15
      const next = new Date(now);
      next.setDate(next.getDate() + 1);
      while (!isWeekday(next.getDay())) {
        next.setDate(next.getDate() + 1);
      }
      const nextOpen = setToTime(next, 9, 15);
      const diffMs = Math.max(0, nextOpen.getTime() - now.getTime());
      const days = Math.floor(diffMs / (24 * 3600000));
      const hrs = Math.floor((diffMs % (24 * 3600000)) / 3600000);
      const mins = Math.floor((diffMs % 3600000) / 60000);
      if (days > 0) return `Opens in ${days}d ${hrs}h ${mins}m`;
      return `Opens in ${hrs}h ${mins}m`;
    }
  };

  // Market breadth derived numbers (with safe defaults)
  const advances = marketBreadth?.advances ?? 0;
  const declines = marketBreadth?.declines ?? 0;
  const unchanged = marketBreadth?.unchanged ?? 0;
  const ratio =
    marketBreadth?.ratio ??
    (declines > 0 ? Number((advances / declines).toFixed(2)) : advances);

  // progress width: advances / (advances + declines)
  const progressDenom = advances + declines;
  const progressPct =
    progressDenom === 0
      ? 0
      : Math.max(
          0,
          Math.min(100, Math.round((advances / progressDenom) * 100))
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
              <div
                className={`w-2 h-2 rounded-full ${
                  isMarketOpen ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={isMarketOpen ? "text-green-600" : "text-red-600"}
              >
                Market {isMarketOpen ? "Open" : "Closed"}
              </span>
            </div>
            <div className="text-sm text-gray-600 flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Updated: {formatTime(lastUpdated)}</span>
            </div>
            <button
              onClick={() => refreshData()}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{loading ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* Market Status Banner */}
        {isMarketOpen && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>{isMarketOpen ? "Market Open" : "Market Closed"}</span>
                <span className="text-green-600 text-sm">
                  {getMarketCountdownText()}
                </span>
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
              { id: "indices", label: "Indices", count: indices.length },
              { id: "stocks", label: "Top Stocks", count: topStocks.length },
              { id: "options", label: "Options Chain", count: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
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
        {activeTab === "indices" && (
          <div className="space-y-6">
            {/* Main Indices Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {indices.map((index) => {
                const value = index.value ?? 0;
                const change = index.change ?? 0;
                const changePct = index.changePercent ?? 0;
                const high = index.high ?? 0;
                const low = index.low ?? 0;

                return (
                  <div
                    key={index.symbol}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {index.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {index.symbol}
                      </span>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {value.toLocaleString("en-IN")}
                      </div>

                      <div
                        className={`flex items-center justify-center space-x-2 text-lg font-medium ${
                          change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {change >= 0 ? (
                          <TrendingUp className="h-5 w-5" />
                        ) : (
                          <TrendingDown className="h-5 w-5" />
                        )}
                        <span>
                          {change >= 0 ? "+" : ""}
                          {change.toFixed(2)} ({changePct.toFixed(2)}%)
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                        <span>High: {high.toLocaleString("en-IN")}</span>
                        <span>Low: {low.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    {/* Mini chart placeholder */}
                    <div className="mt-4 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-gray-400" />
                      <span className="ml-2 text-xs text-gray-500">
                        Intraday Chart
                      </span>
                    </div>

                    <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Market Breadth */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Market Breadth
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {advances.toLocaleString("en-IN")}
                  </div>
                  <div className="text-sm text-gray-600">Advances</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {declines.toLocaleString("en-IN")}
                  </div>
                  <div className="text-sm text-gray-600">Declines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600 mb-2">
                    {unchanged.toLocaleString("en-IN")}
                  </div>
                  <div className="text-sm text-gray-600">Unchanged</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Advance/Decline Ratio</span>
                  <span className="text-green-600 font-medium">{ratio}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stocks Tab */}
        {activeTab === "stocks" && (
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
                    {filteredStocks.map((stock) => {
                      const price = stock.price ?? 0;
                      const changePercent = stock.changePercent ?? 0;
                      const change = stock.change ?? 0;
                      const volume = stock.volume ?? 0;
                      const high = stock.high ?? 0;
                      const low = stock.low ?? 0;

                      return (
                        <tr key={stock.symbol} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs font-medium text-blue-600">
                                  {stock.symbol.charAt(0)}
                                </span>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {stock.symbol}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ₹{price.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`flex items-center space-x-1 ${
                                changePercent >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {changePercent >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                              <span className="text-sm font-medium">
                                {changePercent >= 0 ? "+" : ""}
                                {changePercent.toFixed(2)}%
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {change >= 0 ? "+" : ""}₹{change.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-1 text-sm text-gray-900">
                              <Volume2 className="h-4 w-4 text-gray-400" />
                              <span>{(volume / 100000).toFixed(1)}L</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div>H: ₹{high.toFixed(2)}</div>
                            <div>L: ₹{low.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                Watch
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                Trade
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                Analyze
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Options Chain Tab */}
        {activeTab === "options" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Options Chain Coming Soon
              </h3>
              <p className="text-gray-600">
                Advanced options analytics and chain data will be available in
                the next update.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketPage;
