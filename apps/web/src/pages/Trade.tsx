import { Navigate, useParams } from "react-router-dom";
import { MarketBar } from "../components/MarketBar";
import { NetBar } from "../components/NetBar";
import { SwapInterface } from "../components/SwapInterface";
import { TradeInterface } from "../components/TradeInterface";
import { useEffect } from "react";
import { createUser } from "../utils/requests";

export const Trade = () => {
  const { market } = useParams();

  useEffect(() => {
    async function initialiseUser() {
      // const userId = localStorage.getItem("user_id");

      // if (!userId || userId === "null" || userId === "undefined") {
      const user = await createUser();
      console.log("Created Test User", user);
      if (user && user.user_id) {
        localStorage.setItem("user_id", user.user_id);
      }
      // }
    }

    initialiseUser();
  }, []);

  if (market !== "SOL_USDC") {
    return <Navigate to="/trade/SOL_USDC" />;
  }

  return (
    <div className="bg-main-bg">
      <div className="grid grid-rows-[60px_1fr] p-4 sm:p-5 min-h-screen gap-2">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-2">
          <MarketBar market={market as string} />
          <NetBar />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-2 mt-5 lg:mt-0">
          <div className="order-2 lg:order-1">
            <TradeInterface market={market as string} />
          </div>
          <div className="order-1 lg:order-2">
            <SwapInterface market={market as string} />
          </div>
        </div>
      </div>
    </div>
  );
};
