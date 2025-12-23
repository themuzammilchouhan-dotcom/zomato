import Sidebar from "../../components/seller/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

export default function SellerDashboardLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
}
