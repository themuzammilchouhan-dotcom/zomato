import { Container, Table } from "react-bootstrap";

export default function AdminRestaurants() {
  return (
    <Container className="py-4">
      <h4>Manage Restaurants</h4>
      <p>List of all restaurants (coming soon)</p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuisine</th>
            <th>City</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map restaurants data here */}
        </tbody>
      </Table>
    </Container>
  );
}
