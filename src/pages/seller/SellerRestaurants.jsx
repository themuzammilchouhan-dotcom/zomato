import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import supabase from "../../supabaseClient";
import { useAuth } from "../../contexts/AuthContext";
import RestaurantCard from "./RestaurantCard";
import AddRestaurant from "./AddRestaurant";

export default function SellerRestaurants() {
  const { user, loading } = useAuth(); // 👈 include loading
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const fetchRestaurants = async () => {
    if (!user?.id) return; // 🛑 critical guard

    let query = supabase
      .from("restaurants")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    if (search) query = query.ilike("name", `%${search}%`);
    if (cuisine) query = query.eq("cuisine", cuisine);

    const { data, error } = await query;

    if (!error) {
      setRestaurants(data || []);
    }
  };

  useEffect(() => {
    if (!loading && user?.id) {
      fetchRestaurants();
    }
  }, [loading, user?.id, search, cuisine]);

  // 🔄 While auth is resolving
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Your Restaurants</h5>
        <Button onClick={() => setShowAdd(true)}>+ Add Restaurant</Button>
      </div>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search restaurant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={4}>
          <Form.Select onChange={(e) => setCuisine(e.target.value)}>
            <option value="">All Cuisines</option>
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
            <option value="desi">Desi</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {restaurants.length === 0 ? (
          <p className="text-muted">No restaurants found</p>
        ) : (
          restaurants.map((res) => (
            <Col md={4} key={res.id}>
              <RestaurantCard restaurant={res} />
            </Col>
          ))
        )}
      </Row>

      <AddRestaurant
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onAdded={fetchRestaurants}
      />
    </>
  );
}
