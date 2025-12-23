import { Container, Row, Col } from "react-bootstrap";
import SellerStats from "./SellerStats";
import SellerRestaurants from "./SellerRestaurants";

export default function SellerDashboard() {
  return (
    <Container className="py-4">
      <h3 className="mb-4">Seller Dashboard</h3>

      <Row className="mb-4">
        <Col md={4}><SellerStats title="Restaurants" /></Col>
        <Col md={4}><SellerStats title="Products" /></Col>
        <Col md={4}><SellerStats title="Orders" /></Col>
      </Row>

      <SellerRestaurants />
    </Container>
  );
}
