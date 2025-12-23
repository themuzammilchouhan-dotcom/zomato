import { Card } from "react-bootstrap";

export default function SellerStats({ title, value = 0 }) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h6 className="text-muted">{title}</h6>
        <h3>{value}</h3>
      </Card.Body>
    </Card>
  );
}
