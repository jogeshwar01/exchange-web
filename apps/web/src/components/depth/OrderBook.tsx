import { useEffect, useRef, useState } from "react";
import { getDepth, getTrades } from "../../utils/requests";
import { WsManager } from "../../utils/ws_manager";

export const OrderBook = ({ market }: { market: string }) => {
  const [bids, setBids] = useState<[string, string][]>(); // [price, quantity]
  const [asks, setAsks] = useState<[string, string][]>(); // [price, quantity]
  const [price, setPrice] = useState<string>();
  const [totalBidSize, setTotalBidSize] = useState<number>(0);
  const [totalAskSize, setTotalAskSize] = useState<number>(0);

  const orderBookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    WsManager.getInstance().registerCallback(
      "depth",
      (data: any) => {
        console.log("depth has been updated");
        console.log(data);

        setBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];

          for (let i = 0; i < bidsAfterUpdate.length; i++) {
            for (let j = 0; j < data.bids.length; j++) {
              if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
                bidsAfterUpdate[i][1] = data.bids[j][1];
                if (Number(bidsAfterUpdate[i][1]) === 0) {
                  bidsAfterUpdate.splice(i, 1);
                }
                break;
              }
            }
          }

          for (let j = 0; j < data.bids.length; j++) {
            if (
              Number(data.bids[j][1]) !== 0 &&
              !bidsAfterUpdate.map((x) => x[0]).includes(data.bids[j][0])
            ) {
              bidsAfterUpdate.push(data.bids[j]);
              break;
            }
          }
          bidsAfterUpdate.sort((x, y) =>
            Number(y[0]) < Number(x[0]) ? -1 : 1
          );
          return bidsAfterUpdate;
        });

        setAsks((originalAsks) => {
          const asksAfterUpdate = [...(originalAsks || [])];

          for (let i = 0; i < asksAfterUpdate.length; i++) {
            for (let j = 0; j < data.asks.length; j++) {
              if (asksAfterUpdate[i][0] === data.asks[j][0]) {
                asksAfterUpdate[i][1] = data.asks[j][1];
                if (Number(asksAfterUpdate[i][1]) === 0) {
                  asksAfterUpdate.splice(i, 1);
                }
                break;
              }
            }
          }

          for (let j = 0; j < data.asks.length; j++) {
            if (
              Number(data.asks[j][1]) !== 0 &&
              !asksAfterUpdate.map((x) => x[0]).includes(data.asks[j][0])
            ) {
              asksAfterUpdate.push(data.asks[j]);
              break;
            }
          }
          asksAfterUpdate.sort((x, y) =>
            Number(y[0]) < Number(x[0]) ? 1 : -1
          );
          return asksAfterUpdate;
        });
      },
      `DEPTH-${market}`
    );

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.${market}`],
    });

    getDepth(market).then((depth) => {
      const bidsData = depth.bids;
      const asksData = depth.asks;

      const filteredBids = bidsData.filter((bid) => parseFloat(bid[1]) !== 0);
      const filteredAsks = asksData.filter((ask) => parseFloat(ask[1]) !== 0);

      const totalBids = filteredBids.reduce(
        (acc, bid) => acc + parseFloat(bid[1]),
        0
      );
      const totalAsks = filteredAsks.reduce(
        (acc, ask) => acc + parseFloat(ask[1]),
        0
      );

      setBids(filteredBids);
      setAsks(filteredAsks);
      setTotalBidSize(totalBids);
      setTotalAskSize(totalAsks);

      // Scroll to center on initial load
      if (orderBookRef.current) {
        const halfHeight = orderBookRef.current.scrollHeight / 2;
        orderBookRef.current.scrollTo(
          0,
          halfHeight - orderBookRef.current.clientHeight / 2
        );
      }
    });

    getTrades(market).then((t) => setPrice(t[0].price));
  }, [market]);

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
