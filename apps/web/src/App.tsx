import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Trade } from "./pages/Trade";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster closeButton className="pointer-events-auto" />
      <BrowserRouter>
        <Routes>
          <Route path="/trade/:market" element={<Trade />} />
          <Route path="*" element={<Navigate to="/trade/SOL_USDC" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
