import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { FaHome, FaUtensils, FaBoxOpen, FaChartLine, FaUserCog, FaSignOutAlt, FaPlus } from "react-icons/fa";
import "./Sidebar.css"; // optional CSS

export default function Sidebar() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h4 className="m-0"> {user?.role}</h4>
        <button
          className="btn btn-sm btn-light mt-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➤" : "⬅"}
        </button>
      </div>

      <nav className="nav flex-column mt-4">
        <NavLink to="/seller" end  className="nav-link">
          <FaHome /> {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/seller/restaurants" className="nav-link">
          <FaUtensils /> {!collapsed && "Restaurants"}
        </NavLink>

        <NavLink to="/seller/add-restaurant" className="nav-link">
          <FaPlus /> {!collapsed && "Add Restaurant"}
        </NavLink>

        <NavLink to="/seller/products" className="nav-link">
          <FaBoxOpen /> {!collapsed && "Products"}
        </NavLink>

        <NavLink to="/seller/orders" className="nav-link">
          <FaChartLine /> {!collapsed && "Orders"}
        </NavLink>

        <NavLink to="/seller/analytics" className="nav-link">
          <FaChartLine /> {!collapsed && "Analytics"}
        </NavLink>

        <NavLink to="/seller/profile" className="nav-link">
          <FaUserCog /> {!collapsed && "Settings"}
        </NavLink>

        <button
          className="btn btn-outline-danger mt-3 w-100"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> {!collapsed && "Logout"}
        </button>
      </nav>
    </div>
  );
}
