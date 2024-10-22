import { Depth } from "./Depth";
import { Orders } from "./Orders";
import { TradeView } from "./trade_interface/TradeView";

export const TradeInterface = ({ market }: { market: string }) => {
  return (
    <div className="gap-2 h-full grid grid-rows-trade grid-cols-trade">
      <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
        <TradeView market={market as string} />
      </div>
      <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
        <Depth market={market as string} />
      </div>
      <div style={{ gridArea: "2 / 1 / 3 / 3" }}>
        <Orders />
      </div>
    </div>
  );
};
