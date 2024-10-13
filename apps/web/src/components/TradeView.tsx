import { useEffect, useRef } from "react";
import { ChartManager } from "../utils/chart_manager";
import { getKlines } from "../utils/requests";
import { KLine } from "../utils/types";
import { MarketBar } from "./MarketBar";
import { Depth } from "./depth/Depth";

function parseCustomDate(dateStr: string) {
  const [datePart, timePart] = dateStr.split(" ");
  const time = timePart.split(".")[0];
  const [hours, minutes, seconds] = time
    .split(":")
    .map((unit) => unit.padStart(2, "0"));

  // Construct a valid ISO 8601 date string: YYYY-MM-DDTHH:mm:ssZ
  const isoDateStr = `${datePart}T${hours}:${minutes}:${seconds}Z`;

  return new Date(isoDateStr);
}

export function TradeView({ market }: { market: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);

  useEffect(() => {
    const init = async () => {
      let klineData: KLine[] = [];
      try {
        klineData = await getKlines(
          market,
          "1min",
          Math.floor(
            (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 2) / 1000
          )
        );
      } catch (e) {}

      if (chartRef) {
        if (chartManagerRef.current) {
          chartManagerRef.current.destroy();
        }
        console.log("klinedata", klineData);
        console.log("parseCustomDate", parseCustomDate(klineData[0].end));
        const cleanedKlineData =
          [
            ...klineData?.map((x) => ({
              close: parseFloat(x.close),
              high: parseFloat(x.high),
              low: parseFloat(x.low),
              open: parseFloat(x.open),
              timestamp: new Date(x.end),
            })),
          ].sort((x, y) => (x.timestamp > y.timestamp ? 1 : -1)) || [];

        console.log("cleanedKlineData", cleanedKlineData);

        const chartManager = new ChartManager(
          chartRef.current,
          cleanedKlineData,
          {
            background: "#0e0f14",
            color: "white",
          }
        );
        //@ts-ignore
        chartManagerRef.current = chartManager;
      }
    };
    init();
  }, [market, chartRef]);

  return (
    <div className="flex flex-col justify-center border-b border-transparent">
      <MarketBar market={market as string} />
      <div className="flex flex-row h-[75vh] bg-[#0e0f14] rounded-b-lg">
        <div
          ref={chartRef}
          className="w-[70%] rounded-bl-lg overflow-hidden m-4"
        ></div>
        <div className="w-[30%] bg-[#0e0f14] px-4 flex flex-col h-full overflow-hidden rounded-br-lg">
          <Depth market={market as string} />
        </div>
      </div>
    </div>
  );
}
