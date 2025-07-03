import { useContext, useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Context/Auth";
import "./Header.css";

const Header = () => {
  const [hamburguer, setHamburguer] = useState(false);
  const { role, authenticated, logout } = useContext(AuthContext);
  const location = useLocation();
  const [headerText, setHeaderText] = useState("O melhor sabor para você!");
  const [searchTerm, setSearchTerm] = useState(""); // <- Novo estado
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // limpa o campo
    }
  };

  return (
    <header className="header">
      <section className="informations">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
        <Link to="/" className="logoSection">
          <img className="logo" src={logo} alt="Logo" />
        </Link>


        <Link to="/cart" className="cart-icon">
          <BsCart4 size={28} />
        </Link>
      </section>
    </header>
  );
};

export default Header;
