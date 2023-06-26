import React, { useEffect } from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Protected from "./features/auth/components/Protected";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedInUser } from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchSignedInUserAsync } from "./features/user/userSlice";
import Signout from "./features/auth/components/Signout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import AdminProtected from "./features/auth/components/AdminProtected";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },

  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/signout",
    element: <Signout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome></AdminHome>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <AdminProtected>
        <AdminProductDetailPage></AdminProductDetailPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <AdminProtected>
        <AdminProductFormPage></AdminProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <AdminProtected>
        <AdminProductFormPage></AdminProductFormPage>
      </AdminProtected>
    ),
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectSignedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
       dispatch(fetchSignedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
