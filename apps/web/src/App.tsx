import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Trade } from "./pages/Trade";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/trade/:market" element={<Trade />} />
          <Route path="*" element={<Navigate to="/trade/BTC_USDT" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
