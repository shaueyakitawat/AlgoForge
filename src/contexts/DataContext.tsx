import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface IndexData {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

export interface MarketBreadth {
  advances: number;
  declines: number;
  unchanged: number;
  ratio: number;
}

interface DataContextType {
  indices: IndexData[];
  topGainers: MarketData[];
  topLosers: MarketData[];
  topStocks: MarketData[];
  marketBreadth: MarketBreadth | null;
  isMarketOpen: boolean;
  lastUpdated: Date;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [topGainers, setTopGainers] = useState<MarketData[]>([]);
  const [topLosers, setTopLosers] = useState<MarketData[]>([]);
  const [topStocks, setTopStocks] = useState<MarketData[]>([]);
  const [marketBreadth, setMarketBreadth] = useState<MarketBreadth | null>(null);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateData = (data: any) => {
    setIndices(data.indices || []);
    setTopGainers(data.topGainers || []);
    setTopLosers(data.topLosers || []);
    setTopStocks(data.topStocks || []);
    setMarketBreadth(data.marketBreadth || null);
    setLastUpdated(new Date());
    setLoading(false);
  };

  // --- REST fallback fetch ---
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api-market");
      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      updateData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch market data via REST.");
      setLoading(false);
    }
  }, []);

  // --- WebSocket + fallback ---
  useEffect(() => {
  let ws: WebSocket | null = null;
  let reconnectTimer: any = null;
  let isUnmounted = false;

  const connect = () => {
    if (isUnmounted) return;
    try {
      ws = new WebSocket("ws://localhost:5000");
      ws.onopen = () => {
        console.log("WebSocket connected");
        // do NOT setLoading(true) here repeatedly — avoid toggling loading on open
        setError(null);
      };
      ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          updateData(data); // your function to set indices, topGainers, etc.
        } catch (err) {
          console.error("WS parse error", err);
        }
      };
      ws.onclose = () => {
        console.warn("WebSocket closed — will try reconnect in 5s");
        if (!isUnmounted) reconnectTimer = setTimeout(connect, 5000);
      };
      ws.onerror = (err) => {
        console.error("WebSocket error", err);
        try { ws?.close(); } catch {}
      };
    } catch (err) {
      console.error("WS connect failed", err);
      if (!isUnmounted) reconnectTimer = setTimeout(connect, 5000);
    }
  };

  connect();

  return () => {
    isUnmounted = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    try { ws?.close(); } catch {}
  };
}, []); // <- IMPORTANT: empty deps so this runs once on mount


  // --- Market open checker ---
  useEffect(() => {
    const getIsMarketOpen = (): boolean => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const isWeekday = day >= 1 && day <= 5;
      const isDuringMarketHours =
        (hour > 9 || (hour === 9 && minute >= 15)) &&
        (hour < 15 || (hour === 15 && minute < 30));
      return isWeekday && isDuringMarketHours;
    };

    setIsMarketOpen(getIsMarketOpen());
    const interval = setInterval(() => {
      setIsMarketOpen(getIsMarketOpen());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const value: DataContextType = {
    indices,
    topGainers,
    topLosers,
    topStocks,
    marketBreadth,
    isMarketOpen,
    lastUpdated,
    loading,
    error,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
