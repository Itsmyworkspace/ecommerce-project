import "./styles/App.css";
import { Routes, Route } from "react-router";
import Homepage from "./components/HomePage";
import CheckOut from "./components/CheckOut";
import OrderPage from "./components/OrderPage";
import TrackingPage from "./components/TrackingPage";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />}></Route>
      <Route path="checkout" element={<CheckOut />}></Route>
      <Route path="orders" element={<OrderPage />}></Route>
      <Route path="tracking" element={<TrackingPage />}></Route>
    </Routes>
  );
}

export default App;
