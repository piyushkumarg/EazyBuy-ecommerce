import Footer from "../features/footer/Footer";
import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

export default function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <UserOrders />
      </NavBar>
      <Footer />
    </div>
  );
}
