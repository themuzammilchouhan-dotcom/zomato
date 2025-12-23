import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuByRestaurant } from "../services/supabaseApi";
import { useCart } from "../contexts/CartContext";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function RestaurantDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenuByRestaurant(id).then(({ data }) => setMenu(data));
  }, [id]);

  return (
    <Row>
      {menu.map(item => (
        <Col md={4} key={item.id}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>${item.price}</Card.Text>
              <Button onClick={() => addToCart(item)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
