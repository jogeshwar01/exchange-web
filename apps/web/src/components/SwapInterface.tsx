import { useState, useEffect, useContext } from "react";
import { createOrder } from "../utils/requests";
import { CreateOrder } from "../utils/types";
import { toast } from "sonner";
import { TradesContext } from "../state/TradesProvider";

export const SwapInterface = ({ market }: { market: string }) => {
  const { price } = useContext(TradesContext);
  const currentPrice = parseFloat(price ?? "0");

  const [isBuyMode, setIsBuyMode] = useState(true); // Buy or Sell mode
  const [orderType, setOrderType] = useState("Limit"); // Limit or Market
  const [limitPrice, setLimitPrice] = useState(currentPrice); // Limit price (default)
  const [size, setSize] = useState(""); // Trade size
  const [maxUSD, setMaxUSD] = useState(0.0); // Max USD value based on price * size
  const [fees, setFees] = useState(0.0); // Calculated fees
  const [position, setPosition] = useState(0.0); // Calculated position

  // Calculate USD value, fees, and position whenever size or limitPrice changes
  useEffect(() => {
    const price = orderType === "Market" ? currentPrice : limitPrice;
    const calculatedValue = price * Number(size || 0);
    const calculatedFees = calculatedValue * 0.001; // 0.1% fees
    setMaxUSD(calculatedValue); // Set the computed USD value
    setFees(calculatedFees); // Set the computed fees
    setPosition(Number(size || 0)); // Set position
  }, [size, limitPrice, orderType, currentPrice]);

  const handleCreateOrder = async () => {
    const quantity = Number(size);

    // Basic input checks
    if (!quantity || quantity <= 0) {
      toast.error("Please enter a valid size greater than zero.");
      return;
    }

    if (orderType === "Limit" && (limitPrice <= 0 || isNaN(limitPrice))) {
      toast.error("Please enter a valid limit price.");
      return;
    }

    const side = isBuyMode ? "BUY" : "SELL";
    const orderPrice = orderType === "Market" ? currentPrice : limitPrice; // Set price to 0 for market orders

    const order: CreateOrder = {
      market,
      side,
      quantity,
      price: orderPrice,
      userId: localStorage.getItem("user_id") ?? "test_user",
    };

    try {
      const response = await createOrder(order);
      console.log("Order created:", response);
      toast.success("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order!");
    }
  };

  return (
    <div className="h-fit lg:h-[600px]">
      <div className="h-full bg-container-bg border-container-border rounded-lg border overflow-hidden">
        <div className="p-3 relative flex flex-col h-full overflow-auto thin-scroll justify-start">
          <div className="flex flex-col h-full justify-start">
            <div className="flex flex-col relative z-10">
              <div className="h-[40px] w-full inline-flex">
                <div
                  className={`flex items-center text-positive-green justify-center flex-1 h-full cursor-pointer border border-container-border rounded-l-xl ${
                    isBuyMode
                      ? " text-black bg-positive-green-bg"
                      : "text-container-bg border-container-border"
                  }`}
                  onClick={() => setIsBuyMode(true)}
                >
                  <span>Buy</span>
                </div>
                <div
                  className={`flex items-center justify-center flex-1 h-full cursor-pointer border border-container-border rounded-r-xl ${
                    isBuyMode
                      ? "text-negative-red"
                      : "text-black text-negative-red hover:text-negative-red-hover bg-negative-red-bg"
                  }`}
                  onClick={() => setIsBuyMode(false)}
                >
                  <span>Sell</span>
                </div>
              </div>

              <span className="flex-shrink-0 w-full pb-l"></span>

              <div className="flex items-end w-full justify-between space-x-2 mb-2">
                <div className="flex flex-col w-full">
                  <div className="text-text-tertiary pointer-events-none select-none mt-0 mb-2">
                    <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] mt-0">
                      Order Type
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      id="marketSelection"
                      className="px-2 bg-input-bg border-none focus:outline-none active:outline-none text-text-input hover:bg-input-bg-hover border flex items-center text-sm w-full h-8 rounded-lg"
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                    >
                      <option
                        value="Limit"
                        className="text-text-input text-[14px] px-2 py-1"
                      >
                        Limit
                      </option>
                      <option
                        value="Market"
                        className="text-text-input text-[14px] px-2 py-1"
                      >
                        Market
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {orderType === "Limit" && (
                <div className="flex flex-col">
                  <div className="text-text-tertiary pointer-events-none select-none mt-0 mb-2">
                    <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] mt-0">
                      Limit Price
                    </span>
                  </div>
                  <div className="flex justify-center w-full relative h-8">
                    <div className="absolute w-full h-[32px] text-sm inline-flex css-xbfbe9">
                      <input
                        className="px-2 pt-0.5 w-full bg-input-bg text-text-input default-transition focus:outline-none border-none h-full font-numeral css-e4p6dg rounded-lg"
                        type="number"
                        step={0.01}
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(Number(e.target.value))}
                        style={{ paddingRight: "40px" }}
                      />
                      <div className="absolute top-0 flex items-center h-full space-x-1 right-3 undefined z-1 select-none">
                        <span className="pointer-events-none mt-0.5 text-text-default text-xs">
                          USD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Display Market Price when order type is "Market" */}
              {orderType === "Market" && (
                <div className="flex flex-col">
                  <div className="text-text-tertiary pointer-events-none select-none mt-0 mb-2">
                    <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] mt-0">
                      Market Price
                    </span>
                  </div>
                  <div className="pointer-events-none text-sm bg-input-bg rounded-lg w-full px-2 flex items-center text-text-default h-[32px] select-none">
                    Market Price
                  </div>
                </div>
              )}

              <span className="flex-shrink-0 w-full pb-l"></span>

              {/* Size and Max USD Section */}
              <div className="flex items-end justify-between space-x-2">
                <div className="flex flex-col w-1/2">
                  <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] mb-2">
                    <div className="flex justify-between text-text-tertiary">
                      <div className="flex pb-0.5">Size</div>
                    </div>
                  </span>
                  <div className="flex justify-center w-full relative h-8 ">
                    <div className="absolute w-full h-[32px] text-sm inline-flex css-88j6ui">
                      <input
                        className="px-2 pt-0.5 w-full bg-input-bg default-transition focus:outline-none border-none h-full font-numeral text-text-secondary css-e4p6dg rounded-lg"
                        type="number"
                        step={0.001}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        style={{ paddingRight: "40px" }}
                      />
                      <div className="absolute top-0 flex items-center h-full space-x-1 right-3 undefined z-1 select-none">
                        <div className="h-[20px] w-[20px]">
                          <img
                            src="/sol.svg"
                            className="rounded-full"
                            width="20"
                            height="20"
                            alt="SOL icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-1/2">
                  <div className="text-text-tertiary flex items-end mb-2">
                    <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] flex items-end"></span>
                  </div>

                  <div className="flex justify-center w-full relative h-8 ">
                    <div className="absolute w-full h-[32px] text-sm inline-flex css-88j6ui">
                      <input
                        className="px-2 pt-0.5 w-full bg-input-bg rounded-lg default-transition focus:outline-none border-none h-full font-numeral text-text-secondary css-e4p6dg"
                        type="number"
                        value={maxUSD}
                        onChange={(e) => {
                          const newUSDValue = Number(e.target.value);
                          setMaxUSD(newUSDValue);

                          if (limitPrice > 0) {
                            const newSize = newUSDValue / limitPrice;
                            setSize(newSize.toFixed(6));
                          }
                        }}
                        style={{ paddingRight: "40px" }}
                      />
                      <div className="absolute top-0 flex items-center h-full space-x-1 right-3 undefined z-1 select-none">
                        <div className="h-[18px] w-[18px]">
                          <img
                            src="/usdc.svg"
                            className="h-[18px] w-[18px]"
                            width="18"
                            height="18"
                            alt="USDC icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <span className="flex-shrink-0 w-full pb-l"></span>

              <div className="flex flex-col justify-center">
                <div className="flex flex-col w-full space-y-2 rounded-md advanced-trade-details">
                  <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] flex items-center justify-between w-full">
                    <div className="text-text-secondary shrink-0">
                      <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px]">
                        Fees (0.1%)
                      </span>
                    </div>
                    <div className="text-text-default ">
                      <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px]">
                        ${fees.toFixed(2)}
                      </span>
                    </div>
                  </span>
                  <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px] flex items-center justify-between w-full">
                    <div className="text-text-secondary shrink-0">Position</div>
                    <div className="text-text-default ">
                      <span className="font-semibold text-[12px] leading-[14px] tracking-[0.15px]">
                        {position.toFixed(2)} SOL
                      </span>
                    </div>
                  </span>
                </div>

                <span className="flex-shrink-0 w-full pb-s"></span>
                <span className="flex-shrink-0 w-full pb-m"></span>
                <button
                  onClick={handleCreateOrder}
                  className={`space-x-2 disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled inline-flex rounded-xl items-center justify-center transition-all w-full h-[44px] py-[6px] px-[12px] ${
                    isBuyMode
                      ? "bg-positive-green/80 hover:bg-positive-green-hover border-positive-green text-black"
                      : "bg-negative-red/80 hover:bg-negative-red-hover text-black"
                  }`}
                >
                  {isBuyMode ? (
                    <span>Buy</span>
                  ) : (
                    <span>Sell</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
