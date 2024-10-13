import { useState } from "react";
import { OrderBook } from "./depth/OrderBook";
import { RecentTrades } from "./depth/RecentTrades";

export const Depth = ({ market }: { market: string }) => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("orderbook"); // 'orderbook' or 'recentTrades'

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

        {/* Tab Content */}
        {activeTab === "orderbook" ? (
          <OrderBook market={market} />
        ) : (
          <RecentTrades market={market} />
        )}
      </div>
    </div>
  );
};
