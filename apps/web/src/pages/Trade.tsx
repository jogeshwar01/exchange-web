import { useParams } from "react-router-dom";
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
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        const user = await createUser();
        console.log("Created Test User", user);
        localStorage.setItem("user_id", user.user_id);
      }
    }

    initialiseUser();
  }, []);

  return (
    <div className="w-screen h-screen bg-main-bg">
      <div className="flex flex-col w-full h-full">
        <div className="relative flex-grow h-full w-full overflow-x-hidden overflow-y-auto thin-scroll">
          <div className="w-full h-full md:absolute">
            <div className="flex flex-col w-full h-full sm:min-h-[950px] lg:min-h-[900]">
              <div className="flex flex-col h-full sm:px-4 my-2">
                <div className="gap-2 h-full grid grid-rows-layout grid-cols-layout">
                  <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
                    <MarketBar market={market as string} />
                  </div>
                  <div style={{ gridArea: "1 / 3 / 2 / 4" }}>
                    <NetBar market={market as string} />
                  </div>
                  <div style={{ gridArea: "2 / 3 / 4 / 4" }}>
                    <SwapInterface market={market as string} />
                  </div>
                  <div style={{ gridArea: "2 / 1 / 4 / 3" }}>
                    <TradeInterface market={market as string} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
