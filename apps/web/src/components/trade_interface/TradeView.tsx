import { useCallback, useEffect, useRef, useState } from "react";
import { ChartManager } from "../../utils/chart_manager";
import { getKlines } from "../../utils/requests";
import { KLine } from "../../utils/types";

const timeOptions = [
  { label: "1m", value: "1min" },
  { label: "1H", value: "1h" },
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
];

export const TradeView = ({ market }: { market: string }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);
  const [selectedTime, setSelectedTime] = useState("1h"); // Default to 1 hour

  const fetchKlineData = useCallback(
    async (interval: string) => {
      let klineData: KLine[] = [];
      try {
        klineData = await getKlines(
          market,
          interval,
          Math.floor(
            (new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000 // Last week
          )
        );
      } catch (e) {
        console.error("Error fetching Kline data:", e);
      }

      if (chartRef.current && klineData.length > 0) {
        if (chartManagerRef.current) {
          chartManagerRef.current.destroy(); // Destroy the existing chart instance
        }

        const cleanedKlineData = klineData
          .map((x) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end),
          }))
          .sort((x, y) => (x.timestamp > y.timestamp ? 1 : -1));

        // Initialize a new ChartManager
        const chartManager = new ChartManager(
          chartRef.current,
          cleanedKlineData,
          {
            background: "#080f18",
            color: "white",
          }
        );

        chartManagerRef.current = chartManager; // Assign the new chart manager instance
      }
    },
    [market]
  );

  useEffect(() => {
    fetchKlineData(selectedTime);

    // Cleanup the chart when component unmounts or time interval changes
    return () => {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
        chartManagerRef.current = null; // Ensure the reference is cleared after destruction
      }
    };
  }, [fetchKlineData, market, selectedTime]);

  return (
    <div className="h-full bg-container-bg border-container-border rounded border overflow-hidden flex flex-col">
      <div className="w-full py-2 px-3 flex items-center relative justify-between leading-[16px] flex-1 text-text-emphasis">
        <div className="w-[20%] text-sm">Chart</div>
        <div className="flex space-x-2">
          <div className="w-[20%] py-1  text-xs">Time</div>

          {timeOptions.map((option) => (
            <button
              key={option.label}
              className={`px-2 text-xs ${
                selectedTime === option.value
                  ? "text-white font-bold"
                  : "text-text-emphasis"
              }`}
              onClick={() => setSelectedTime(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="w-[15%] text-right my-1">
          <div className="font-semibold text-xs">Trading View</div>
        </div>
      </div>

      <div className="h-full">
        <div ref={chartRef} className="w-full h-full"></div>
      </div>
    </div>
  );
};
