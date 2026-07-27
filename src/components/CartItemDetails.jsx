import axios from "axios";
import { formatMoney } from "../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { useState } from "react";

function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {
  const [isQuantityUpdated, setIsQuantityUpdated] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateData = async () => {
    if (isQuantityUpdated) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsQuantityUpdated(false);
    } else {
      setIsQuantityUpdated(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };

  function handleEvent({ event }) {
    if (event.key === "Enter") {
      updateData();
    } else if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      isQuantityUpdated(false);
    }
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          ${formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isQuantityUpdated ? (
              <input
                type="text"
                className="quantity-texbox"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={handleEvent}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateData}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
      <DeliveryOptions
        cartItem={cartItem}
        deliveryOptions={deliveryOptions}
        loadCart={loadCart}
      />
    </>
  );
}

export default CartItemDetails;
