import { useContext, useRef } from "react";
import { TradesContext } from "../../state/TradesProvider";

export const OrderBook = () => {
  const { bids, asks, price, totalBidSize, totalAskSize } =
    useContext(TradesContext);

  const bidsRef = useRef<HTMLDivElement | null>(null);
  const asksRef = useRef<HTMLDivElement | null>(null);

  const calculateWidth = (size: string, totalSize: number): string => {
    return totalSize ? `${(parseFloat(size) * 100) / totalSize}%` : "0%";
  };

  const calculateCumulativeWidth = (
    cumulativeSize: number,
    totalSize: number
  ): string => {
    return totalSize ? `${(cumulativeSize * 100) / totalSize}%` : "0%";
  };

  const handleRecenter = () => {
    if (bidsRef.current && asksRef.current) {
      bidsRef.current.scrollTop = 0;
      asksRef.current.scrollTop = 0;

      // const containerHeight = bidsRef.current.parentElement.clientHeight;
      // const halfContainerHeight = containerHeight / 2;

      // const bidsMiddle = bidsRef.current.scrollHeight / 2;
      // bidsRef.current.scrollTop = bidsMiddle - halfContainerHeight;

      // // different calculation for asks because it's reversed
      // const asksMiddle = asksRef.current.scrollHeight / 2;
      // const asksMaxScrollTop = asksRef.current.scrollHeight - asksRef.current.clientHeight;
      // asksRef.current.scrollTop = asksMaxScrollTop - (asksMiddle - halfContainerHeight);
    }
  };

  // Cumulative calculation for bids and asks
  let cumulativeBidSize = 0;
  let cumulativeAskSize = 0;

  return (
    <div className="h-full">
      {/* Order Book */}
      <div className="relative h-full bg-container-bg">
        <div className="flex flex-col h-full text-text-label fadein-floating-element bg-container-bg xs:min-h-[25vh] md:min-h-0">
          <div className="flex justify-between text-xs px-2 py-1 text-text-tertiary">
            <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] text-center">
              Price
            </span>
            <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] text-left">
              Size
            </span>
          </div>

          <div className="flex-1 flex flex-col-reverse relative overflow-hidden">
            {/* Bids Scrollable Area */}
            <div
              ref={bidsRef}
              className="flex-1 overflow-y-auto flex flex-col gap-0.5"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {bids?.map((order, index) => {
                const size = parseFloat(order[1]);
                cumulativeBidSize += size; // Keep track of cumulative size

                return (
                  <div key={index} className="relative w-full mb-[1px]">
                    <div className="w-full h-[22px] flex relative box-border text-xs leading-7 justify-between font-display ml-0">
                      <div className="flex flex-row mx-2 justify-between font-numeral w-full">
                        <div className="z-10 text-xs leading-6 text-text-positive-green-button">
                          {order[0]}
                        </div>
                        <div className="z-10 text-xs leading-6 text-static-default">
                          {order[1]}
                        </div>
                      </div>
                      {/* Cumulative background */}
                      <div className="absolute opacity-20 w-full h-full flex justify-end">
                        <div
                          className="bg-positive-green-pressed brightness-80 h-full"
                          style={{
                            width: calculateCumulativeWidth(
                              cumulativeBidSize,
                              totalBidSize
                            ),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                      {/* Size-based background */}
                      <div className="absolute opacity-40 w-full h-full flex justify-end">
                        <div
                          className="bg-positive-green brightness-100 h-full"
                          style={{
                            width: calculateWidth(order[1], totalBidSize),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recenter Button */}
            <div className="relative w-full px-2 inline-flex justify-between items-center min-h-[22px] bg-container-bg-hover text-text-default z-20">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] leading-[16px] text-text-emphasis">
                    {price}
                  </span>
                </div>
              </div>
              <div
                onClick={handleRecenter}
                className="pb-1 cursor-pointer transition-colors text-interactive-link"
              >
                <span className="font-semibold text-[11px] leading-[12px] tracking-[.15px]">
                  Re-center
                </span>
              </div>
            </div>

            {/* Asks Scrollable Area */}
            <div
              ref={asksRef}
              className="flex-1 overflow-y-auto flex flex-col-reverse gap-0.5"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {asks?.map((order, index) => {
                const size = parseFloat(order[1]);
                cumulativeAskSize += size; // Keep track of cumulative size

                return (
                  <div key={index} className="relative w-full mb-[1px]">
                    <div className="w-full h-[22px] flex relative box-border text-xs leading-7 justify-between font-display mr-0">
                      <div className="flex flex-row mx-2 justify-between font-numeral w-full">
                        <div className="z-10 text-xs leading-6 text-text-negative-red-button">
                          {order[0]}
                        </div>
                        <div className="z-10 text-xs leading-6 text-static-default">
                          {order[1]}
                        </div>
                      </div>
                      {/* Cumulative background */}
                      <div className="absolute opacity-20 w-full h-full flex justify-end">
                        <div
                          className="bg-negative-red-pressed brightness-80 h-full"
                          style={{
                            width: calculateCumulativeWidth(
                              cumulativeAskSize,
                              totalAskSize
                            ),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                      {/* Size-based background */}
                      <div className="absolute opacity-40 z-10 w-full h-full flex justify-end">
                        <div
                          className="bg-negative-red brightness-100 h-full"
                          style={{
                            width: calculateWidth(order[1], totalAskSize),
                            transition: "width 0.3s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
