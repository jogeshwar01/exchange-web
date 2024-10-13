"use client";

import { useEffect, useState } from "react";
import { getDepth, getTrades } from "../../utils/requests";
import { Bids } from "./Bids";
import { Asks } from "./Asks";
import { WsManager } from "../../utils/ws_manager";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();
  const [depthOrTrades, setDepthOrTrades] = useState("depth");

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
            Number(y[0]) > Number(x[0]) ? -1 : 1
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
            Number(y[0]) > Number(x[0]) ? 1 : -1
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

    getDepth(market).then((d) => {
      setBids(d.bids.reverse());
      setAsks(d.asks);
    });

    getTrades(market).then((t) => setPrice(t[0].price));

    return () => {
      WsManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.${market}`],
      });
      WsManager.getInstance().deRegisterCallback("depth", `DEPTH-${market}`);
    };
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-row flex-0 gap-5 w-[100%]">
          <BookButton
            depthOrTrades={depthOrTrades}
            setDepthOrTrades={setDepthOrTrades}
          />
          <TradesButton
            depthOrTrades={depthOrTrades}
            setDepthOrTrades={setDepthOrTrades}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center h-[78vh]">
        <TableHeader />
        {asks && <Asks asks={asks} />}
        {price && <div>{price}</div>}
        {bids && <Bids bids={bids} />}
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-white">Price</div>
      <div className="text-slate-500">Size</div>
      <div className="text-slate-500">Total</div>
    </div>
  );
}

function BookButton({ depthOrTrades, setDepthOrTrades }: { depthOrTrades: string; setDepthOrTrades: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2 w-[50%]"
      onClick={() => setDepthOrTrades("depth")}
    >
      <div
        className={`text-sm text-center font-medium py-1 border-b-2 ${depthOrTrades === "depth" ? "border-accentBlue text-baseTextHighEmphasis" : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"}`}
      >
        Orderbook
      </div>
    </div>
  );
}

function TradesButton({ depthOrTrades, setDepthOrTrades }: { depthOrTrades: string; setDepthOrTrades: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2 w-[50%]"
      onClick={() => setDepthOrTrades("trades")}
    >
      <div
        className={`text-sm text-center font-medium py-1 border-b-2 ${depthOrTrades === "trades" ? "border-accentBlue text-baseTextHighEmphasis" : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"} `}
      >
        Trades
      </div>
    </div>
  );
}
