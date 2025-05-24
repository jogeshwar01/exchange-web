import { Depth } from "./Depth";
import { TradeView } from "./trade_interface/TradeView";

export const TradeInterface = ({ market }: { market: string }) => {
  return (
    <div className="grid grid-rows-[600px_1fr] grid-cols-1 md:grid-cols-[3fr_1fr] gap-2">
      <TradeView market={market as string} />
      <Depth market={market as string} />
    </div>
  );
};
