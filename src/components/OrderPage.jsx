import "../styles/index.css";
import "../styles/header.css";
import "../styles/orders.css";
import { Header } from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import OrderGrid from "./OrderGrid";

function OrderPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("/api/orders?expand=products");
      console.log(response.data);
      setOrders(response.data);
    };

    getProducts();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/orders-favicon.png"
      />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}

export default OrderPage;
