import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Trade } from "./pages/Trade";
import { Toaster } from "sonner";
import { TradesProvider } from "./state/TradesProvider";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <TradesProvider>
        <Analytics />
        <Toaster closeButton theme="dark" className="pointer-events-auto" />
        <BrowserRouter>
          <Routes>
            <Route path="/trade/:market" element={<Trade />} />
            <Route path="*" element={<Navigate to="/trade/SOL_USDC" />} />
          </Routes>
        </BrowserRouter>
      </TradesProvider>
    </>
  );
}

export default App;
