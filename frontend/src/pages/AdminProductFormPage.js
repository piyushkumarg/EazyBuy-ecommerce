import ProductForm from "../features/admin/components/ProductForm";
import NavBar from "../features/navbar/Navbar";

export default function AdminProductFormPage() {
  return (
    <div>
      <NavBar>
        <ProductForm></ProductForm>
      </NavBar>
    </div>
  );
}