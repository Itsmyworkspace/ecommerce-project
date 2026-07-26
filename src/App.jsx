import "./styles/App.css";
import { Routes, Route } from "react-router";
import Homepage from "./components/HomePage";
import CheckOut from "./components/CheckOut";
import OrderPage from "./components/OrderPage";
import TrackingPage from "./components/TrackingPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<Homepage cart={cart} />}></Route>
      <Route path="checkout" element={<CheckOut cart={cart} />}></Route>
      <Route path="orders" element={<OrderPage />}></Route>
      <Route path="tracking" element={<TrackingPage />}></Route>
    </Routes>
  );
}

export default App;
