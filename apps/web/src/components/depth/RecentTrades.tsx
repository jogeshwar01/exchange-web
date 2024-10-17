import { useContext } from "react";
import { TradesContext } from "../../state/TradesProvider";

export const RecentTrades = () => {
  const { trades } = useContext(TradesContext);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col py-1 pl-2 pr-2 text-xs text-center recent-trades-header text-text-tertiary font-display bg-container-bg">
      {/* Recent Trades Header */}
      <div className="grid grid-cols-3 gap-4 py-2 border-b border-container-border">
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-left">
          Price (USD)
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] pr-1 text-center">
          Size (SOL)
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-right">
          Time
        </span>
      </div>

      {/* Scrollable Trades Data */}
      <div
        className="flex-1 overflow-y-auto font-numeral"
        style={{
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For Internet Explorer and Edge */,
        }}
      >
        {/* Custom style for WebKit-based browsers to hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}</style>

        {trades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-3 py-2 px-1 text-text-secondary hover:cursor-pointer hover:bg-container-bg-hover"
          >
            <span
              className={`font-[300] text-[13px] leading-[16px] text-left ${
                trade.isBuyerMaker ? "text-positive-green" : "text-negative-red"
              }`}
            >
              {trade.price}
            </span>
            <span className="font-[300] text-[13px] leading-[16px] text-center">
              {trade.quantity}
            </span>
            <span className="font-[300] text-[13px] leading-[16px] text-right text-nowrap">
              {formatTime(trade.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
