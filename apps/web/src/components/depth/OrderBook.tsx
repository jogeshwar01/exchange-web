export const OrderBook = ({ market }: { market: string }) => {
  const buyOrders = [
    { price: 147.613, size: 6.097, greenWidth: "0.0471587%" },
    { price: 147.6, size: 0.1, greenWidth: "0.0471587%" },
    { price: 147.592, size: 60.978, greenWidth: "0.518808%" },
    { price: 147.57, size: 284.568, greenWidth: "1.46226%" },
    { price: 147.56, size: 325.183, greenWidth: "1.46226%" },
    // ... Add other buy orders here
  ];

  const sellOrders = [
    { price: 147.64, size: 162.592, redWidth: "0.0570435%" },
    { price: 147.647, size: 6.095, redWidth: "0.0589573%" },
    { price: 147.66, size: 325.183, redWidth: "0.0589573%" },
    { price: 147.668, size: 60.947, redWidth: "0.648502%" },
    { price: 147.67, size: 365.831, redWidth: "0.648502%" },
  ];

  const currentPrice = 147.6265;
  const recentPrice = 147.8;

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

          <div className="absolute w-full max-h-full overflow-auto thin-scroll flex box-border flex-col-reverse">
            {/* Buy Orders */}
            <div
              data-puppet-tag="buy"
              className="flex flex-col w-full mb-[32px]"
            >
              {buyOrders.map((order, index) => (
                <div key={index} className="relative w-full mb-[1px]">
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display ml-0">
                    <div className="flex flex-row mx-2 justify-between font-numeral w-full">
                      <div className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 text-text-positive-green-button">
                        {order.price.toFixed(4)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                        {order.size.toFixed(4)}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-start">
                      <div
                        className="bg-positive-green brightness-100 h-full"
                        style={{ width: order.greenWidth }}
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
                    {currentPrice.toFixed(4)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-text-label">
                    {recentPrice.toFixed(4)}
                  </span>
                </div>
              </div>
              <div className="pb-1 transition-colors text-interactive-link">
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
              {sellOrders.map((order, index) => (
                <div key={index} className="relative w-full mb-[1px]">
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display mr-0">
                    <div className="flex flex-row mx-2 justify-between font-numeral w-full">
                      <div className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 text-text-negative-red-button">
                        {order.price.toFixed(4)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                        {order.size.toFixed(4)}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-start">
                      <div
                        className="bg-negative-red brightness-100 h-full"
                        style={{ width: order.redWidth }}
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
