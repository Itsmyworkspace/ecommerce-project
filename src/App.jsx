import "./styles/App.css";
import { Routes, Route } from "react-router";
import Homepage from "./components/HomePage";
import CheckOut from "./components/CheckOut";
import OrderPage from "./components/OrderPage";
import TrackingPage from "./components/TrackingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFoundPage from "./components/NotFoundPage";

// This makes axios available in the Console.
// - Then, you can try running axios.post('/api/reset') in the Console.
window.axios = axios;

// More details:
// - Normally, we can't access values (like axios) outside of a file.
// - However, JavaScript has a built-in, global object called window
//   (this represents the browser window).
// - So one way to make a value accessible anywhere (including in the
//   Console), is to attach it to the window object. That's why we
//   do window.axios = axios;
// - Now, in the Console, we can run window.axios.post(...)
// - And JavaScript has another shortcut we can use. If we just type
//   "axios", this is a shortcut for "window.axios"
// - That's why the code window.axios = axios; lets us use "axios"
//   anywhere (including in the Conosle).

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const getCartItemsResponse = await axios.get(
      "/api/cart-items?expand=product",
    );
    setCart(getCartItemsResponse.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route
        index
        element={<Homepage cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="checkout"
        element={<CheckOut cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="orders"
        element={<OrderPage cart={cart} loadCart={loadCart} />}
      ></Route>
      <Route
        path="tracking/:orderId?/:productId?"
        element={<TrackingPage cart={cart} />}
      ></Route>
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
