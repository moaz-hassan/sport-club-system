import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/Sign-up";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Plans from "./pages/plans/Plans";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Shop from "./pages/shop/Shop";
import ProductDetailsPage from "./pages/productDetails/ProductDetails";
import CheckoutPage from "./pages/Checkout-page/CheckoutPage";
import MatchDetails from "./pages/match-details/MatchDetails";
import { getUserDataFromCookies } from "./utils/storageUtils";
import store from "./components/store";

function App() {
  console.log(store.getState().resObj.data?.Member_Role);
  
  const isAdmin = getUserDataFromCookies()?.Member_Role === "admin" || store.getState().resObj.data?.Member_Role==="admin";
  const isLogin = getUserDataFromCookies()?.Member_Role === "Member" || "admin";
  console.log(isAdmin);
  
  const adminRoutes = [
    "/admin-dashboard/overview",
    "/admin-dashboard/teams",
    "/admin-dashboard/matches",
    "/admin-dashboard/members",
    "/admin-dashboard/players",
    "/admin-dashboard/subscriptions",
    "/admin-dashboard/events",
    "/admin-dashboard/store",
  ];

  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/match-details/:matchId" element={<MatchDetails />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        {isAdmin &&
          adminRoutes.map((path) => (
            <Route key={path} path={path} element={<AdminDashboard />} />
          ))}

        {/* Admin Profile Route */}
        {isLogin && (
          <Route path="/admin-dashboard/profile" element={<AdminDashboard />} />
        )}

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
