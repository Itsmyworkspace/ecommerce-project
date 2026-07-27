import OrderGridDetails from "./OrderGridDetails";
import OrderGridHeader from "./OrderGridHeader";

function OrderGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderGridHeader order={order} />
            <OrderGridDetails order={order} loadCart={loadCart} />
          </div>
        );
      })}
    </div>
  );
}

export default OrderGrid;
