"use client";
import { MarketBar } from "../components/MarketBar";
import { TradeView } from "../components/TradeView";
import { Depth } from "../components/depth/Depth";
import { SwapUI } from "../components/SwapUI";
import { useParams } from "react-router-dom";

export const Trade = () => {
  const { market } = useParams();

  return (
    <div className="flex flex-row flex-1">
      <div className="flex flex-col flex-1">
        <MarketBar market={market as string} />
        <div className="flex flex-row h-[920px] border-y border-slate-800">
          <div className="flex flex-col flex-1">
            <TradeView market={market as string} />
          </div>
          <div className="flex flex-col w-[250px] overflow-hidden">
            <Depth market={market as string} />
          </div>
        </div>
      </div>
      <div className="w-[10px] flex-col border-slate-800 border-l"></div>
      <div>
        <div className="flex flex-col w-[250px]">
          <SwapUI market={market as string} />
        </div>
      </div>
    </div>
  );
};
