import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import supabase from "../../supabaseClient";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddRestaurantPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: "",
    city: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("restaurants").insert([
      {
        ...formData,
        seller_id: user.id,
      },
    ]);

    if (error) console.error(error);
    else navigate("/seller/restaurants");

    setLoading(false);
  };

  return (
    <Container className="py-4">
      <h4>Add New Restaurant</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cuisine</Form.Label>
          <Form.Control
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Restaurant"}
        </Button>
      </Form>
    </Container>
  );
}
