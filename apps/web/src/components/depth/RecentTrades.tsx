export const RecentTrades = ({ market }: { market: string }) => {
  // Define trades inside the component, with `isPositive` to determine the color
  const trades = [
    { price: 152.4, size: 0.18, time: "16:05:30", isPositive: true },
    { price: 151.3, size: 0.12, time: "16:04:20", isPositive: true },
    { price: 150.2, size: 0.15, time: "16:03:10", isPositive: false },
    { price: 152.1, size: 0.05, time: "16:02:00", isPositive: true },
    { price: 151.2, size: 0.2, time: "16:01:15", isPositive: false },
    { price: 151.6, size: 0.1, time: "16:00:37", isPositive: true },
  ];

  return (
    <div className="h-full flex flex-col py-1 pl-2 pr-2 text-xs text-center recent-trades-header text-text-tertiary font-display bg-container-bg">
      {/* Recent Trades Header */}
      <div className="grid grid-cols-3 gap-4 py-2 border-b border-container-border">
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-left">
          Price (USD)
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] pr-1 text-right">
          Size (SOL)
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-right">
          Time
        </span>
      </div>

      {/* Scrollable Trades Data */}
      <div className="flex-1 overflow-y-auto font-numeral">
        {trades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 py-2 px-1 text-text-secondary hover:cursor-pointer hover:bg-container-bg-hover"
          >
            <span
              className={`font-[300] text-[13px] leading-[16px] text-left ${
                trade.isPositive ? "text-positive-green" : "text-negative-red"
              }`}
            >
              {trade.price.toFixed(4)}
            </span>
            <span className="font-[300] text-[13px] leading-[16px] text-right">
              {trade.size.toFixed(4)}
            </span>
            <span className="font-[300] text-[13px] leading-[16px] text-right">
              {trade.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
