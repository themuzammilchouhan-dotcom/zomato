import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: "Total Users", value: 120 },
    { title: "Total Restaurants", value: 35 },
    { title: "Orders Today", value: 45 },
    { title: "Revenue Today", value: "$1200" },
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
