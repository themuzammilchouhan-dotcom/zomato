import React from 'react';

const Navbar = () => {
  return (
   <Navbar expand="lg">
  <Container>
    <Navbar.Brand>FoodApp</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav className="ms-auto">
        <Nav.Link href="/">Restaurants</Nav.Link>
        <Nav.Link href="/cart">Cart</Nav.Link>
        <Nav.Link href="/orders">Orders</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default Navbar;