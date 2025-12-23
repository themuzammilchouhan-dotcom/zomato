import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function BuyerDashboard() {
  const { user } = useAuth();
  return (
    <Container className="py-4">
      <h3>Welcome, {user?.full_name || user?.email}</h3>
      <Row className="mt-4">
        <Col sm={6} md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Restaurants Nearby</Card.Title>
              <Card.Text>25</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Cart Items</Card.Title>
              <Card.Text>3</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Card.Text>5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
