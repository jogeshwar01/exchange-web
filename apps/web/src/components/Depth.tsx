import { useEffect, useState } from "react";
import { OrderBook } from "./depth/OrderBook";
import { RecentTrades } from "./depth/RecentTrades";
import { getDepth, getTrades } from "../utils/requests";
import { WsManager } from "../utils/ws_manager";
import { useContext } from "react";
import { TradesContext } from "../state/TradesProvider";
import { Trade } from "../utils/types";

export const Depth = ({ market }: { market: string }) => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("orderbook"); // 'orderbook' or 'recentTrades'

  const {
    setTrades,
    setBids,
    setAsks,
    setPrice,
    setTotalBidSize,
    setTotalAskSize,
    orderBookRef,
  } = useContext(TradesContext);

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

    WsManager.getInstance().registerCallback(
      "trade",
      (data: any) => {
        console.log("trade has been updated");
        console.log(data);

        const newTrade: Trade = {
          id: data.t,
          isBuyerMaker: data.m,
          price: data.p,
          quantity: data.q,
          quoteQuantity: data.q,
          timestamp: data.T,
        };

        setPrice(data.p);

        setTrades((oldTrades) => {
          const newTrades = [...oldTrades];
          newTrades.unshift(newTrade);
          newTrades.pop();
          return newTrades;
        });
      },
      `TRADE-${market}`
    );

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.${market}`],
    });

    WsManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`trade.${market}`],
    });

    getTrades(market).then((trades) => {
      trades = trades.filter((trade) => parseFloat(trade.quantity) !== 0);
      trades = trades.slice(0, 50);
      setTrades(trades);
      setPrice(trades?.[0]?.price);
    });

    getDepth(market).then((depth) => {
      const bidsData = depth.bids;
      const asksData = depth.asks;

      if (!bidsData && !asksData) {
        return;
      }

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

    return () => {
      WsManager.getInstance().deRegisterCallback("depth", `DEPTH-${market}`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.${market}`],
      });

      WsManager.getInstance().deRegisterCallback("trade", `TRADE-${market}`);
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });
    };
  }, [
    market,
    orderBookRef,
    setAsks,
    setBids,
    setPrice,
    setTotalAskSize,
    setTotalBidSize,
    setTrades,
  ]);

  return (
    <div className="h-full bg-container-bg border-container-border rounded border overflow-hidden flex">
      <div className="flex flex-col grow">
        {/* Tabs Section */}
        <div className="relative">
          <div className="flex">
            <div
              onClick={() => setActiveTab("orderbook")}
              className={`py-2 px-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover justify-center leading-[16px] flex-1 ${
                activeTab === "orderbook"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              }`}
            >
              <span className="flex items-center justify-center text-sm">
                Orderbook
              </span>
              {activeTab === "orderbook" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[1px] bg-blue-500"></div>
              )}
            </div>

            <div
              onClick={() => setActiveTab("recentTrades")}
              className={`py-2 px-3 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover justify-center leading-[16px] flex-1 ${
                activeTab === "recentTrades"
                  ? "text-text-emphasis bg-container-bg-selected"
                  : "text-text-label"
              }`}
            >
              <span className="flex items-center justify-center text-sm">
                Recent Trades
              </span>
              {activeTab === "recentTrades" && (
                <div className="absolute left-0 bottom-0 w-full z-10 h-[1px] bg-blue-500"></div>
              )}
            </div>
          </div>
          <div
            className="w-full absolute inset-x-0 bottom-0 h-[1px] z-0"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0), var(--darkBlue-50))",
            }}
          ></div>
        </div>

        {/* Custom style for WebKit-based browsers to hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}</style>

        {/* Tab Content */}
        {activeTab === "orderbook" ? <OrderBook /> : <RecentTrades />}
      </div>
    </div>
  );
};
