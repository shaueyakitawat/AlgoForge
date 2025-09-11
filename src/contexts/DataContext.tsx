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

interface DataContextType {
  indices: IndexData[];
  topGainers: MarketData[];
  topLosers: MarketData[];
  topStocks: MarketData[]; // merged gainers + losers
  isMarketOpen: boolean;
  lastUpdated: Date;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

// Check if Indian market is open
const getIsMarketOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Saturday = 6
  const hour = now.getHours();
  const minute = now.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const isDuringMarketHours =
    (hour > 9 || (hour === 9 && minute >= 15)) &&
    (hour < 15 || (hour === 15 && minute < 30));
  return isWeekday && isDuringMarketHours;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [topGainers, setTopGainers] = useState<MarketData[]>([]);
  const [topLosers, setTopLosers] = useState<MarketData[]>([]);
  const [topStocks, setTopStocks] = useState<MarketData[]>([]); // merged
  const [isMarketOpen, setIsMarketOpen] = useState(getIsMarketOpen());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    console.log("Fetching all market data from proxy server...");
    if (!indices.length) {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/market");
      if (!response.ok) throw new Error(`Network error: ${response.status}`);

      const data = await response.json();

      setIndices(data.indices || []);
      setTopGainers(data.topGainers || []);
      setTopLosers(data.topLosers || []);
      setTopStocks([...(data.topGainers || []), ...(data.topLosers || [])]);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error("Failed to fetch market data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [indices.length]);

  useEffect(() => {
    fetchData(); // initial load

    const interval = setInterval(() => {
      const marketIsOpen = getIsMarketOpen();
      if (marketIsOpen && !isMarketOpen) {
        fetchData(); // market just opened
      }
      setIsMarketOpen(marketIsOpen);
      if (marketIsOpen) fetchData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchData, isMarketOpen]);

  const refreshData = () => {
    fetchData();
  };

  const value: DataContextType = {
    indices,
    topGainers,
    topLosers,
    topStocks,
    isMarketOpen,
    lastUpdated,
    loading,
    error,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
