import { useEffect, useState } from "react";
import { fetchCart } from "../services/games";
import { useAuth } from "../context/AuthContext";
import "./Cart.css";

function CartComponent() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadCart = async () => {
      try {
        const data = await fetchCart();

        const items =
          data?.content ??
          data?.data ??
          data ??
          [];

        setCartItems(Array.isArray(items) ? items : []);
      } catch (err) {
        console.error("Failed to load cart", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  if (loading || !user || cartItems.length === 0) {
    return null;
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
      <div className="cart-info">
        <span className="cart-icon">🛒</span>
        <div className="cart-details">
          <span className="cart-count">{totalItems} Item{totalItems !== 1 && "s"}</span>
          <span className="cart-total">Total: ${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <button className="checkout-btn">Checkout Now</button>
    </div>
  );
}

export default CartComponent;
