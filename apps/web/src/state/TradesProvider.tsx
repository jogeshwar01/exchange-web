import {
  ReactNode,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { Ticker, Stat, Trade } from "../utils/types";

interface TradesProviderProps {
  children: ReactNode;
}

interface TradesContextType {
  ticker: Ticker | null;
  setTicker: Dispatch<SetStateAction<Ticker | null>>;
  stats: Stat[];
  setStats: Dispatch<SetStateAction<Stat[]>>;
  trades: Trade[];
  setTrades: Dispatch<SetStateAction<Trade[]>>;
  price: string | undefined;
  setPrice: Dispatch<SetStateAction<string | undefined>>;
  // depth
  bids: [string, string][] | undefined;
  asks: [string, string][] | undefined;
  setBids: Dispatch<SetStateAction<[string, string][] | undefined>>;
  setAsks: Dispatch<SetStateAction<[string, string][] | undefined>>;
  totalBidSize: number;
  setTotalBidSize: Dispatch<SetStateAction<number>>;
  totalAskSize: number;
  setTotalAskSize: Dispatch<SetStateAction<number>>;
  orderBookRef: React.MutableRefObject<HTMLDivElement | null>;
}

const TradesContext = createContext<TradesContextType>({
  ticker: null,
  setTicker: () => {},
  stats: [],
  setStats: () => {},
  trades: [],
  setTrades: () => {},
  price: "",
  setPrice: () => {},
  bids: [],
  setBids: () => {},
  asks: [],
  setAsks: () => {},
  totalBidSize: 0,
  setTotalBidSize: () => {},
  totalAskSize: 0,
  setTotalAskSize: () => {},
  orderBookRef: { current: null },
});

const TradesProvider = ({ children }: TradesProviderProps) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [price, setPrice] = useState<string>();

  // depth
  const [bids, setBids] = useState<[string, string][]>(); // [price, quantity]
  const [asks, setAsks] = useState<[string, string][]>(); // [price, quantity]
  const [totalBidSize, setTotalBidSize] = useState<number>(0);
  const [totalAskSize, setTotalAskSize] = useState<number>(0);

  const orderBookRef = useRef<HTMLDivElement>(null);

  return (
    <TradesContext.Provider
      value={{
        ticker,
        setTicker,
        stats,
        setStats,
        trades,
        setTrades,
        price,
        setPrice,
        // depth
        bids,
        setBids,
        asks,
        setAsks,
        totalBidSize,
        setTotalBidSize,
        totalAskSize,
        setTotalAskSize,
        orderBookRef,
      }}
    >
      {children}
    </TradesContext.Provider>
  );
};

export { TradesContext, TradesProvider };
