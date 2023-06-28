import Footer from "../features/footer/Footer";
import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

export default function UserProfilePage() {
  return (
    <div>
      <NavBar>
        <UserProfile />
      </NavBar>
      <Footer />
    </div>
  );
}
