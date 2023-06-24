import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

export default function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
        <UserOrders />
      </NavBar>
    </div>
  );
}
