import { Container, Table } from "react-bootstrap";

export default function AdminUsers() {
  return (
    <Container className="py-4">
      <h4>Manage Users</h4>
      <p>List of users will be displayed here (coming soon)</p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map user data here */}
        </tbody>
      </Table>
    </Container>
  );
}
