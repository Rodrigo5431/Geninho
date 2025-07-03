import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "../Context/Auth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart/Cart";
import CartProvider from "../Context/Cart";

export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
