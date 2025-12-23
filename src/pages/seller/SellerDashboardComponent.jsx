import { Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function SellerDashboardComponent() {
  const { user } = useAuth();

  // Placeholder stats
  const stats = [
    { title: "Total Restaurants", value: 3 },
    { title: "Total Products", value: 25 },
    { title: "Orders Today", value: 12 },
    { title: "Revenue Today", value: "$420" },
  ];

  return (
    <Container className="py-4">
      <h3>Welcome, {user?.full_name || user?.email}</h3>
      <Row className="mt-4">
        {stats.map((stat, idx) => (
          <Col key={idx} sm={6} md={3} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{stat.title}</Card.Title>
                <Card.Text className="fs-4">{stat.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
