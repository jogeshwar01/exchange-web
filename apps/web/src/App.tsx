import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Trade } from "./pages/Trade";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/trade/:symbol" element={<Trade />} />
          <Route path="*" element={<Navigate to="/trade/SOL_USDC" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
