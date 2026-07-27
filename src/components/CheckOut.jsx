import "../styles/index.css";
import "../styles/checkout.css";
import "../styles/checkout-header.css";
import CheckOutHeader from "../components/CheckOutHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrderSummary } from "../components/OrderSummary";
import { PaymentSummary } from "../components/PaymentSummary";

function CheckOut({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      let response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchPaymentData();
  }, [cart]);

  return (
    <div>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/cart-favicon.png"
      />
      <title>Checkout</title>

      <CheckOutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
