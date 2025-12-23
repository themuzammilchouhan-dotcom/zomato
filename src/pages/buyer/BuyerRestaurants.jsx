import { Container, Card, Row, Col, Button } from "react-bootstrap";

export default function BuyerRestaurants() {
  return (
    <Container className="py-4">
      <h4>Restaurants</h4>
      <Row>
        {/* Example restaurant cards */}
        {[1, 2, 3].map((r) => (
          <Col key={r} md={4} className="mb-3">
            <Card>
              <Card.Img variant="top" src={`https://picsum.photos/300/200?random=${r}`} />
              <Card.Body>
                <Card.Title>Restaurant {r}</Card.Title>
                <Card.Text>Cuisine: Italian</Card.Text>
                <Button variant="primary">View Menu</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
