import { useEffect, useState } from "react";
import { fetchCart } from "../services/games";
import "./Cart.css";

function CartComponent() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetchCart();


        const items =
          res?.data?.content ??
          res?.data ??
          res ??
          [];

        setCartItems(items);
      } catch (err) {
        console.error("Failed to load cart", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  if (loading) {
    return <div className="cart-bar">Loading…</div>;
  }

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  const totalPrice = cartItems.reduce((sum, item) => {
    const price =
      typeof item.game?.price === "string"
        ? Number(item.game.price.replace("$", ""))
        : Number(item.game?.price ?? item.price ?? 0);

    const quantity = item.quantity ?? 1;

    return sum + price * quantity;
  }, 0);

  return (
    <div className="cart-bar">
      <div>🛒 {totalItems} item{totalItems !== 1 && "s"}</div>
      <div>Total: ${totalPrice.toFixed(2)}</div>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
}

export default CartComponent;
