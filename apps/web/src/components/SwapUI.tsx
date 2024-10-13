"use client";
import { useState } from "react";
import axios from "axios";

export function SwapUI({ market }: { market: string }) {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [type, setType] = useState("limit");

  const handleBuySell = async () => {
    if (type === "market") {
      alert("Market order not supported yet");
      return;
    }

    const side = activeTab === "buy" ? "BUY" : "SELL";
    const orderData = {
      market: market, // Market like BTC_USDT
      side: side, // Buy or Sell
      quantity: parseFloat(amount), // Order amount
      price: parseFloat(price), // Order price
      user_id: "test_user", // Replace with actual user id
    };

    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/order",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="justify-center border-b border-transparent rounded-lg h-[85vh] bg-[#0e0f14]">
      <div className="flex flex-col rounded-b-lg overflow-hidden">
        <div className="flex flex-row h-[60px]">
          <BuyTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <SellTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="px-3">
            <div className="flex flex-row flex-0 gap-5 undefined">
              <LimitButton type={type} setType={setType} />
              <MarketButton type={type} setType={setType} />
            </div>
          </div>
          <div className="flex flex-col px-3">
            <div className="flex flex-col flex-1 gap-3 text-baseTextHighEmphasis">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between flex-row">
                  <p className="text-xs font-normal text-baseTextMedEmphasis">
                    Available Balance
                  </p>
                  <p className="font-medium text-xs text-baseTextHighEmphasis">
                    36.94 USDC
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-normal text-baseTextMedEmphasis">
                  Price
                </p>
                <div className="flex flex-col relative">
                  <input
                    step="0.01"
                    placeholder="0"
                    className="h-12 rounded-lg border-2 border-solid border-baseBorderLight bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className="flex flex-row absolute right-1 top-1 p-2">
                    <div className="relative">
                      <img src="/usdc.webp" className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-normal text-baseTextMedEmphasis">
                Quantity
              </p>
              <div className="flex flex-col relative">
                <input
                  step="0.01"
                  placeholder="0"
                  className="h-12 rounded-lg border-2 border-solid border-baseBorderLight bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex flex-row absolute right-1 top-1 p-2">
                  <div className="relative">
                    <img src="/sol.webp" className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end flex-row">
                <p className="font-medium pr-2 text-xs text-baseTextMedEmphasis">
                  ≈ 0.00 USDC
                </p>
              </div>
              <div className="flex justify-center flex-row mt-2 gap-3">
                <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                  25%
                </div>
                <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                  50%
                </div>
                <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                  75%
                </div>
                <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                  Max
                </div>
              </div>
            </div>
            {activeTab === "buy" ? (
              <BuyButton handleBuySell={handleBuySell} />
            ) : (
              <SellButton handleBuySell={handleBuySell} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LimitButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("limit")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${type === "limit" ? "border-accentBlue text-baseTextHighEmphasis" : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"}`}
      >
        Limit
      </div>
    </div>
  );
}

function MarketButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("market")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${type === "market" ? "border-accentBlue text-baseTextHighEmphasis" : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"} `}
      >
        Market
      </div>
    </div>
  );
}

function BuyTab({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: any;
}) {
  return (
    <div
      className={`rounded-t-lg overflow-hidden flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === "buy" ? "border-b-greenBorder bg-greenBackgroundTransparent" : "border-b-baseBorderMed hover:border-b-baseBorderFocus"}`}
      onClick={() => setActiveTab("buy")}
    >
      <p className="text-center text-sm font-semibold text-greenText">Buy</p>
    </div>
  );
}

function SellTab({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: any;
}) {
  return (
    <div
      className={`rounded-t-lg overflow-hidden flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === "sell" ? "border-b-redBorder bg-redBackgroundTransparent" : "border-b-baseBorderMed hover:border-b-baseBorderFocus"}`}
      onClick={() => setActiveTab("sell")}
    >
      <p className="text-center text-sm font-semibold text-redText">Sell</p>
    </div>
  );
}

function BuyButton({ handleBuySell }: { handleBuySell: any }) {
  return (
    <button
      type="button"
      className="font-semibold  focus:ring-blue-200 focus:none focus:outline-none text-center h-12 rounded-xl text-base px-4 py-2 my-4 bg-greenPrimaryButtonBackground text-greenPrimaryButtonText active:scale-98 "
      data-rac=""
      onClick={handleBuySell}
    >
      Buy
    </button>
  );
}

function SellButton({ handleBuySell }: { handleBuySell: any }) {
  return (
    <button
      type="button"
      className="font-semibold  focus:ring-blue-200 focus:none focus:outline-none text-center h-12 rounded-xl text-base px-4 py-2 my-4 bg-redPrimaryButtonBackground text-greenPrimaryButtonText active:scale-98 "
      data-rac=""
      onClick={handleBuySell}
    >
      Sell
    </button>
  );
}
