import { Routes, Route, Navigate } from "react-router-dom";
import BuyerSidebar from "../../components/buyer/BuyerSidebar";
import BuyerDashboard from "./BuyerDashboard";
import BuyerRestaurants from "./BuyerRestaurants";
import BuyerCart from "./BuyerCart";
import BuyerOrders from "./BuyerOrders";
import BuyerProfile from "./BuyerProfile";

export default function BuyerDashboardPage() {
  return (
    <div className="d-flex">
      <BuyerSidebar />
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route index element={<BuyerDashboard />} /> {/* /buyer */}
          <Route path="restaurants" element={<BuyerRestaurants />} /> {/* /buyer/restaurants */}
          <Route path="cart" element={<BuyerCart />} /> {/* /buyer/cart */}
          <Route path="orders" element={<BuyerOrders />} /> {/* /buyer/orders */}
          <Route path="profile" element={<BuyerProfile />} /> {/* /buyer/profile */}
          <Route path="*" element={<Navigate to="/buyer" replace />} />
        </Routes>
      </div>
    </div>
  );
}
