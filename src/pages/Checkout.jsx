import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { createOrder, addOrderItems } from "../services/supabaseApi";
import { Button } from "react-bootstrap";

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();

  const handleCheckout = async () => {
    const { data: order } = await createOrder(user.id, total);

    await addOrderItems(
      cart.map(i => ({
        order_id: order.id,
        menu_item_id: i.id,
        quantity: i.qty,
        price: i.price
      }))
    );

    clearCart();
    alert("Order placed successfully!");
  };

  return <Button onClick={handleCheckout}>Place Order</Button>;
}
