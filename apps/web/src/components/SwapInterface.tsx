import { useState } from "react";

export const SwapInterface = ({ market }: { market: string }) => {
  const [isBuyMode, setIsBuyMode] = useState(true); // Buy or Sell mode
  const [orderType, setOrderType] = useState("Limit"); // Limit or Market
  const [limitPrice, setLimitPrice] = useState(146.833); // Limit price (default)
  const [size, setSize] = useState(""); // Trade size
  const [maxUSD, setMaxUSD] = useState(0.0); // Max USD available for trade

  return (
    <div className="h-full">
      <div className="h-full bg-container-bg border-container-border rounded border overflow-hidden">
        <div className="p-3 relative flex flex-col h-full overflow-auto thin-scroll justify-start">
          <div className="flex flex-col h-full justify-start">
            <div className="flex flex-col relative z-10">
              <div className="h-[40px] w-full inline-flex">
                <div
                  className={`flex items-center justify-center flex-1 h-full cursor-pointer border rounded-l-sm ${
                    isBuyMode
                      ? "bg-positive-green hover:bg-positive-green-hover border-positive-green text-black"
                      : "bg-container-bg border-container-border"
                  }`}
                  onClick={() => setIsBuyMode(true)}
                >
                  <span>Buy</span>
                </div>
                <div
                  className={`flex items-center justify-center flex-1 h-full cursor-pointer border border-container-border rounded-r-sm ${
                    isBuyMode
                      ? "text-negative-red"
                      : "text-black bg-negative-red"
                  }`}
                  onClick={() => setIsBuyMode(false)}
                >
                  <span>Sell</span>
                </div>
              </div>

              <span className="flex-shrink-0 w-full pb-l"></span>

              <div className="flex items-end justify-between space-x-2">
                <div className="flex flex-col w-1/2">
                  <div className="text-text-tertiary font-normal pointer-events-none select-none mt-0">
                    <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] mt-0">
                      Order Type
                    </span>
                  </div>
                  <div className="relative w-full">
                    <select
                      id="marketSelection"
                      className="px-2 bg-input-bg border-tooltip-bg text-text-input hover:bg-input-bg-hover border flex items-center text-sm w-full h-8"
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                    >
                      <option
                        value="Limit"
                        className="text-text-input font-normal text-[14px] px-2 py-1"
                      >
                        Limit
                      </option>
                      <option
                        value="Market"
                        className="text-text-input font-normal text-[14px] px-2 py-1"
                      >
                        Market
                      </option>
                    </select>
                  </div>
                </div>

                {/* Conditional rendering for Limit Price input */}
                {orderType === "Limit" && (
                  <div className="flex flex-col w-1/2">
                    <div className="text-text-tertiary font-normal pointer-events-none select-none mt-0">
                      <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] mt-0">
                        Limit Price
                      </span>
                    </div>
                    <div className="flex justify-center w-full relative h-8">
                      <div className="absolute w-full h-[32px] text-sm inline-flex css-xbfbe9">
                        <input
                          className="px-2 pt-0.5 w-full bg-input-bg text-text-input default-transition focus:outline-none border-none h-full font-numeral css-e4p6dg"
                          type="number"
                          value={limitPrice}
                          onChange={(e) =>
                            setLimitPrice(Number(e.target.value))
                          }
                          style={{ paddingRight: "57px" }}
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
                  <div className="flex flex-col w-1/2">
                    <div className="text-text-tertiary font-normal pointer-events-none select-none mt-0">
                      <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] mt-0">
                        Market Price
                      </span>
                    </div>
                    <div className="pointer-events-none text-sm bg-input-bg rounded-sm w-full px-2 flex items-center text-text-default h-[32px] select-none">
                      Market Price
                    </div>
                  </div>
                )}
              </div>

              <span className="flex-shrink-0 w-full pb-l"></span>

              {/* Size and Max USD Section */}
              <div className="flex items-end justify-between space-x-2">
                <div className="flex flex-col w-1/2">
                  <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                    <div className="flex justify-between text-text-tertiary">
                      <div className="flex pb-0.5">Size</div>
                    </div>
                  </span>
                  <div className="flex justify-center w-full relative h-8 ">
                    <div className="absolute w-full h-[32px] text-sm inline-flex css-88j6ui">
                      <input
                        className="px-2 pt-0.5 w-full bg-input-bg default-transition focus:outline-none border-none h-full font-numeral text-text-secondary css-e4p6dg"
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        style={{ paddingRight: "20px" }}
                      />
                      <div className="absolute top-0 flex items-center h-full space-x-1 right-3 undefined z-1 select-none">
                        <div className="h-[18px] w-[18px]">
                          <img
                            src="https://app.drift.trade/assets/icons/markets/sol.svg"
                            className="h-[18px] w-[18px]"
                            width="18"
                            height="18"
                            alt="SOL icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-1/2">
                  <div className="text-text-tertiary font-normal flex items-end">
                    <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] flex items-end">
                      {isBuyMode && (
                        <div className="flex items-end space-x-2 hover:cursor-pointer text-text-emphasis">
                          <div
                            className="flex items-center font-numeral bg-button-secondary-bg hover:bg-button-secondary-bg-hover hover:cursor-pointer px-1 pt-0.5 pb-0 mb-1 rounded-sm select-none text-text-label tracking-normal"
                            style={{ fontSize: "10px" }}
                          >
                            <div className="mr-2">Max:</div>
                            <span className="mr-1">{maxUSD.toFixed(2)}</span>
                            <span style={{ fontSize: "10px" }}>USD</span>
                          </div>
                        </div>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-center w-full relative h-8 ">
                    <div className="absolute w-full h-[32px] text-sm inline-flex css-88j6ui">
                      <input
                        className="px-2 pt-0.5 w-full bg-input-bg default-transition focus:outline-none border-none h-full font-numeral text-text-secondary css-e4p6dg"
                        type="number"
                        value={maxUSD}
                        disabled
                        style={{ paddingRight: "20px" }}
                      />
                      <div className="absolute top-0 flex items-center h-full space-x-1 right-3 undefined z-1 select-none">
                        <div className="h-[18px] w-[18px]">
                          <img
                            src="https://app.drift.trade/assets/icons/markets/usdc.svg"
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

              {/* Fees and Position */}
              <div className="flex flex-col justify-center mt-12}">
                <div className="flex flex-col w-full space-y-2 rounded-md advanced-trade-details">
                  <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] flex items-center justify-between w-full">
                    <div className="text-text-secondary shrink-0">
                      <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                        Fees
                      </span>
                    </div>
                    <div className="text-text-default ">
                      <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                        $0.00
                      </span>
                    </div>
                  </span>
                  <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] flex items-center justify-between w-full">
                    <div className="text-text-secondary shrink-0">Position</div>
                    <div className="text-text-default ">
                      <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                        0 SOL
                      </span>
                    </div>
                  </span>
                </div>

                <span className="flex-shrink-0 w-full pb-s"></span>
                <span className="flex-shrink-0 w-full pb-m"></span>
                <button className="space-x-2 disabled:cursor-not-allowed disabled:bg-button-disabled disabled:hover:bg-button-disabled disabled:text-text-disabled inline-flex rounded-sm items-center justify-center transition-all w-full h-[44px] uppercase py-[6px] px-[12px] text-text-secondary-button bg-button-secondary-bg hover:bg-button-secondary-bg-hover">
                  <span className="mt-0.5">Sign up to trade</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
