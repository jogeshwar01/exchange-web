import { useEffect } from "react";
import { getTicker } from "../utils/requests";
import { useContext } from "react";
import { TradesContext } from "../state/TradesProvider";

export const MarketBar = ({ market }: { market: string }) => {
  const { ticker, setTicker, stats, setStats, price } =
    useContext(TradesContext);

  useEffect(() => {
    getTicker(market).then(setTicker);

    setStats([
      { label: "24h Volume", value: `$${ticker?.volume.toLocaleString()}` },
      { label: "24h High", value: `$${ticker?.high}` },
      { label: "24h Low", value: `$${ticker?.low}` },
    ]);
  }, [market, setStats, setTicker, ticker?.high, ticker?.low, ticker?.volume]);

  return (
    <div className="inline-flex items-center justify-center w-full h-full bg-container-bg thin-scroll">
      <div className="h-full bg-container-bg border-container-border overflow-hidden border-0 rounded-none rounded-l-sm flex flex-col justify-center w-[308px] min-w-[308px]">
        <div className="z-40 h-full flex flex-row w-full items-center justify-center gap-2 bg-container-bg text-text-default border border-r-0 border-container-border relative hover:bg-container-bg-hover sm:p-2">
          <div className="flex items-center justify-center">
            <div>
              <img
                src="/jog.png"
                className="rounded-full relative z-10"
                width={28}
              />
            </div>
            <div className="-ml-[20%]">
              <img
                src="https://app.drift.trade/assets/icons/markets/usdc.svg"
                className="rounded-full"
                width={24}
              />
            </div>
          </div>
          <span className="text-text-default text-[18px] font-normal">
            JOG/USDC
          </span>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full border-y sm:border border-container-border bg-container-bg h-full hidden-scroll sm:thin-scroll rounded-rl-sm overflow-x-auto">
        <div className="flex items-stretch w-full justify-between sm:justify-start font-display sm:divide-x divide-container-border whitespace-nowrap">
          <div className="flex flex-row items-center justify-between px-4 py-2 space-x-3 xl:space-x-4 xl:px-6 sm:py-0">
            <div className="outline-none focus:outline-none flex">
              <div className="flex flex-col">
                <div className="block h-2 w-2 rounded-full bg-positive-green mr-1"></div>
              </div>
            </div>
            <div className="outline-none focus:outline-none flex mr-0 sm:mr-0">
              <div className="flex flex-col">
                <div className="overflow-hidden text-lg font-semibold text-text-default font-numeral">
                  <span className="font-[400] text-[16px] leading-[-0.25px]">
                    <div className="">
                      <span className="whitespace-nowrap">${price}</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="outline-none focus:outline-none flex mr-20 sm:mr-0">
              <div className="flex flex-col left-10">
                <div className="block overflow-hidden">
                  <span className="font-[300] text-[13px] leading-[16px]">
                    <div className="">
                      <span className="text-positive-green flex items-center">
                        {ticker?.priceChange}%
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {stats.map((stat, index) => (
          <div
            key={index}
            className="px-2 xl:px-6 flex flex-col justify-center"
          >
            <div className="outline-none focus:outline-none flex" key={index}>
              <div className="flex flex-col">
                <span className="font-[400] text-[11px] leading-[12px] tracking-[.15px]">
                  <div className="border-r border-container-border"></div>
                  <div className="flex flex-col">
                    <div className="text-nowrap overflow-hidden text-text-label">
                      {stat.label}
                    </div>
                    <span className="flex-shrink-0 w-full pb-xs"></span>
                    <div className="flex items-center grow">
                      <div className="flex flex-col text-text-default-2">
                        <div className="flex space-x-2">
                          <div className="flex w-full space-x-1">
                            <span className="font-[300] text-[13px] leading-[16px] overflow-hidden text-text-default">
                              {stat.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
