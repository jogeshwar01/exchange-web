"use client";
import { TradeView } from "../components/TradeView";
import { SwapUI } from "../components/SwapUI";
import { useParams } from "react-router-dom";
import { OpenOrders } from "../components/OpenOrders";

export const Trade = () => {
  const { market } = useParams();

  return (
    <div className="flex flex-row flex-1 bg-black h-[100vh] items-center">
      <div className="flex flex-col flex-1 h-[85vh] w-[75%] ml-16 mr-12">
        <TradeView market={market as string} />
        <OpenOrders market={market as string} />
      </div>
      <div className="w-[22%] h-[85vh] mr-12">
        <SwapUI market={market as string} />
      </div>
    </div>
  );
};
