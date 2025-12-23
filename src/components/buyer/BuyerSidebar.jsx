import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { FaHome, FaUtensils, FaShoppingCart, FaHistory, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

export default function BuyerSidebar() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h4 className="m-0"> {user?.role}</h4>
        <button className="btn btn-sm btn-light mt-2" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➤" : "⬅"}
        </button>
      </div>

      <nav className="nav flex-column mt-4">
        <NavLink to="/buyer" end className={navClass}>
          <FaHome /> {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/buyer/restaurants" className={navClass}>
          <FaUtensils /> {!collapsed && "Restaurants"}
        </NavLink>

        <NavLink to="/buyer/cart" className={navClass}>
          <FaShoppingCart /> {!collapsed && "Cart"}
        </NavLink>

        <NavLink to="/buyer/orders" className={navClass}>
          <FaHistory /> {!collapsed && "Orders"}
        </NavLink>

        <NavLink to="/buyer/profile" className={navClass}>
          <FaUserCog /> {!collapsed && "Profile"}
        </NavLink>

        <button className="btn btn-outline-danger mt-3 w-100" onClick={handleLogout}>
          <FaSignOutAlt /> {!collapsed && "Logout"}
        </button>
      </nav>
    </div>
  );
}
