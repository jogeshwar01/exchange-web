import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Trade } from "./pages/Trade";
import { Toaster } from "sonner";
import { TradesProvider } from "./state/TradesProvider";

function App() {
  return (
    <>
      <TradesProvider>
        <Toaster closeButton className="pointer-events-auto" />
        <BrowserRouter>
          <Routes>
            <Route path="/trade/:market" element={<Trade />} />
            <Route path="*" element={<Navigate to="/trade/JOG_USDC" />} />
          </Routes>
        </BrowserRouter>
      </TradesProvider>
    </>
  );
}

export default App;
