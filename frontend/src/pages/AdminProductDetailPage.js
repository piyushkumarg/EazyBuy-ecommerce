import AdminProductDetail from "../features/admin/components/AdminProductDetail";
import NavBar from "../features/navbar/Navbar";

export default function AdminProductDetailPage() {
  return (
    <div>
      <NavBar>
        <AdminProductDetail></AdminProductDetail>
      </NavBar>
    </div>
  );
}