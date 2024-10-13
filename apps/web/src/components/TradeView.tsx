import { useEffect, useRef } from "react";
import { ChartManager } from "../utils/chart_manager";
import { getKlines } from "../utils/requests";
import { KLine } from "../utils/types";

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
          "1w",
          Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 2) / 1000)
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
    <>
      <div
        ref={chartRef}
        style={{ height: "520px", width: "100%", marginTop: 4 }}
      ></div>
    </>
  );
}
