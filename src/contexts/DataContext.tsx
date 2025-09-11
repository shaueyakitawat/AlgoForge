import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  topStocks: MarketData[];
  isMarketOpen: boolean;
  lastUpdated: Date;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Mock data generator
const generateMockIndices = (): IndexData[] => [
  {
    name: 'NIFTY 50',
    symbol: 'NIFTY',
    value: 19745.50,
    change: 125.75,
    changePercent: 0.64,
    high: 19820.30,
    low: 19680.15
  },
  {
    name: 'BANK NIFTY',
    symbol: 'BANKNIFTY',
    value: 44125.30,
    change: 185.45,
    changePercent: 0.42,
    high: 44280.50,
    low: 43950.20
  },
  {
    name: 'SENSEX',
    symbol: 'SENSEX',
    value: 66589.93,
    change: 412.45,
    changePercent: 0.62,
    high: 66750.20,
    low: 66320.40
  }
];

const generateMockStocks = (): MarketData[] => [
  {
    symbol: 'RELIANCE',
    price: 2485.20,
    change: 28.70,
    changePercent: 1.17,
    volume: 2340000,
    high: 2510.50,
    low: 2465.30,
    open: 2475.00,
    previousClose: 2456.50
  },
  {
    symbol: 'TCS',
    price: 3678.45,
    change: -23.15,
    changePercent: -0.62,
    volume: 1890000,
    high: 3705.20,
    low: 3665.80,
    open: 3695.30,
    previousClose: 3701.60
  },
  {
    symbol: 'HDFCBANK',
    price: 1642.30,
    change: 15.80,
    changePercent: 0.97,
    volume: 3450000,
    high: 1655.70,
    low: 1635.20,
    open: 1638.90,
    previousClose: 1626.50
  },
  {
    symbol: 'INFY',
    price: 1456.75,
    change: 18.25,
    changePercent: 1.27,
    volume: 2780000,
    high: 1465.30,
    low: 1445.60,
    open: 1450.20,
    previousClose: 1438.50
  },
  {
    symbol: 'ICICIBANK',
    price: 987.65,
    change: -8.35,
    changePercent: -0.84,
    volume: 4120000,
    high: 995.80,
    low: 982.30,
    open: 992.40,
    previousClose: 996.00
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [indices, setIndices] = useState<IndexData[]>(generateMockIndices());
  const [topStocks, setTopStocks] = useState<MarketData[]>(generateMockStocks());
  const [isMarketOpen, setIsMarketOpen] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Update indices with small random changes
      setIndices(prev => prev.map(index => ({
        ...index,
        value: index.value + (Math.random() - 0.5) * 20,
        change: index.change + (Math.random() - 0.5) * 10,
        changePercent: index.changePercent + (Math.random() - 0.5) * 0.5
      })));

      // Update stocks with small random changes
      setTopStocks(prev => prev.map(stock => ({
        ...stock,
        price: Math.max(stock.price + (Math.random() - 0.5) * 10, 0.01),
        change: stock.change + (Math.random() - 0.5) * 5,
        changePercent: stock.changePercent + (Math.random() - 0.5) * 0.3
      })));

      setLastUpdated(new Date());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(updateInterval);
  }, []);

  const refreshData = () => {
    setIndices(generateMockIndices());
    setTopStocks(generateMockStocks());
    setLastUpdated(new Date());
  };

  const value = {
    indices,
    topStocks,
    isMarketOpen,
    lastUpdated,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};