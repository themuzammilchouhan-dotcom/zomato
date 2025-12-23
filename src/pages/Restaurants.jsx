import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { getRestaurants } from "../services/supabaseApi";
import RestaurantCard from "../components/RestaurantCard";

export default function Restaurants() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
const { user } = useAuth();

  useEffect(() => {
  if (!user?.city) return;

  getRestaurants({ search, city: user.city })
    .then(({ data }) => setData(data));
}, [search, user?.city]);

  return (
    <Container>
      <Form.Control
        placeholder="Search restaurants..."
        className="my-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Row>
        {data?.map(r => (
          <Col md={4} sm={6} xs={12} key={r.id}>
            <RestaurantCard restaurant={r} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
