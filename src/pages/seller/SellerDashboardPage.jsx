import { Routes, Route, Navigate } from "react-router-dom";
import SellerDashboard from "./SellerDashboard";
import SellerRestaurants from "./SellerRestaurants";
import AddRestaurantPage from "./AddRestaurantPage";
import SellerProducts from "./SellerProducts";
import SellerOrders from "./SellerOrders";
import SellerAnalytics from "./SellerAnalytics";
import SellerProfile from "./SellerProfile";
import Sidebar from "../../components/seller/Sidebar";
import SellerDashboardComponent from "./SellerDashboardComponent";

export default function SellerDashboardPage() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route index element={<SellerDashboardComponent />} /> {/* /seller */}
          <Route path="restaurants" element={<SellerRestaurants />} /> {/* /seller/restaurants */}
          <Route path="add-restaurant" element={<AddRestaurantPage />} /> {/* /seller/add-restaurant */}
          <Route path="products" element={<SellerProducts />} /> {/* /seller/products */}
          <Route path="orders" element={<SellerOrders />} /> {/* /seller/orders */}
          <Route path="analytics" element={<SellerAnalytics />} /> {/* /seller/analytics */}
          <Route path="profile" element={<SellerProfile />} /> {/* /seller/profile */}
          <Route path="*" element={<Navigate to="/seller" replace />} />
        </Routes>
      </div>
    </div>
  );
}
