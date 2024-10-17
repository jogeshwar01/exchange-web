import { useContext } from "react";
import { TradesContext } from "../../state/TradesProvider";

export const OrderBook = () => {
  const { bids, asks, price, totalBidSize, totalAskSize, orderBookRef } =
    useContext(TradesContext);

  const calculateWidth = (size: string, totalSize: number) => {
    return totalSize ? `${(parseFloat(size) * 100) / totalSize}%` : "0%";
  };

  const handleRecenter = () => {
    if (orderBookRef.current) {
      // get it at half of the container height not the scroll height
      const containerHeight = orderBookRef.current.clientHeight;
      const halfHeight = containerHeight / 2;
      orderBookRef.current.scrollTo(
        0,
        orderBookRef.current.scrollTop + halfHeight
      );
    }
  };

  return (
    <div className="h-full">
      {/* Order Book */}
      <div className="relative h-full bg-container-bg">
        <div className="flex flex-col h-full text-text-label fadein-floating-element bg-container-bg xs:min-h-[25vh] md:min-h-0">
          <div className="flex justify-between text-xs px-2 py-1 text-text-tertiary">
            <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-center">
              Price
            </span>
            <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-left">
              Size
            </span>
          </div>

          <div
            ref={orderBookRef}
            className="absolute w-full max-h-full mt-6 overflow-y-auto flex flex-col-reverse"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none" /* For Firefox */,
              msOverflowStyle: "none" /* For Internet Explorer and Edge */,
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none; /* For Chrome, Safari, and Opera */
              }
            `}</style>
            {/* Buy Orders */}
            <div
              data-puppet-tag="buy"
              className="flex flex-col w-full mb-[32px]"
            >
              {bids?.map((order, index) => (
                <div key={index} className="relative w-full mb-[1px]">
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display ml-0">
                    <div className="flex flex-row mx-2 justify-between font-numeral w-full">
                      <div className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 text-text-positive-green-button">
                        {order[0]}
                      </div>
                      <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                        {order[1]}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-start">
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
              ))}
            </div>

            {/* Current Price and Recenter */}
            <div className="relative w-full px-2 inline-flex justify-between items-center py-1 min-h-[26px] bg-container-bg-hover text-text-default z-20">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <span className="font-[300] text-[13px] leading-[16px] text-text-emphasis">
                    {price}
                  </span>
                </div>
              </div>
              <div
                onClick={handleRecenter}
                className="pb-1 cursor-pointer transition-colors text-interactive-link"
              >
                <span className="font-[400] text-[11px] leading-[12px] tracking-[.15px]">
                  Re-center
                </span>
              </div>
            </div>

            {/* Sell Orders */}
            <div
              data-puppet-tag="sell"
              className="flex flex-col-reverse w-full mt-[32px]"
            >
              {asks?.map((order, index) => (
                <div key={index} className="relative w-full mb-[1px]">
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display mr-0">
                    <div className="flex flex-row mx-2 justify-between font-numeral w-full">
                      <div className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 text-text-negative-red-button">
                        {order[0]}
                      </div>
                      <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                        {order[1]}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-start">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
