import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "../../contexts/AuthContext";

export default function AddRestaurant({ show, onHide, onAdded }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    cuisine: "",
    city: "",
  });

  const submit = async () => {
    await supabase.from("restaurants").insert({
      ...form,
      seller_id: user.id,
    });

    onAdded();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Restaurant</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Control
          placeholder="Name"
          className="mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Form.Control
          placeholder="Description"
          className="mb-2"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Form.Control
          placeholder="Cuisine"
          className="mb-2"
          onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
        />
        <Form.Control
          placeholder="City"
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={submit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
