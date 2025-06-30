  import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
  import AuthProvider from "../Context/Auth";
  import Home from "../pages/Home";

  export default function AppRoutes() {
    return (
      <Router>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </AuthProvider>
      </Router>
    );
  }
