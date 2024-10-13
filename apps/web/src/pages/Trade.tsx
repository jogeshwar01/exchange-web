import { useParams } from "react-router-dom";
import { MarketBar } from "../components/MarketBar";
import { NetBar } from "../components/NetBar";
import { SwapInterface } from "../components/SwapInterface";
import { TradeInterface } from "../components/TradeInterface";

export const Trade = () => {
  const { market } = useParams();

  return (
    <div className="flex flex-col h-full sm:px-4 mb-2">
      <div className="gap-2 h-full">
        <MarketBar market={market as string} />
        <NetBar market={market as string} />
        <SwapInterface market={market as string} />
        <TradeInterface market={market as string} />
      </div>
    </div>
  );
};
