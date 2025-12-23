import { Card, Button } from "react-bootstrap";

export default function RestaurantCard({ restaurant }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Img
        variant="top"
        src={restaurant.image_url || "/placeholder.png"}
        height={180}
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <h6>{restaurant.name}</h6>
        <p className="text-muted mb-1">{restaurant.cuisine}</p>
        <small>{restaurant.city}</small>

        <div className="d-flex gap-2 mt-2">
          <Button size="sm" variant="outline-primary">
            Add Product
          </Button>
          <Button size="sm" variant="outline-secondary">
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
