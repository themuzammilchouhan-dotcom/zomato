import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <Container className="py-4">
      <h4>Profile / Settings</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control value={user?.full_name || ""} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control value={user?.email || ""} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control value={user?.role} readOnly />
        </Form.Group>

        <Button disabled>Update Profile (Coming Soon)</Button>
      </Form>
    </Container>
  );
}
