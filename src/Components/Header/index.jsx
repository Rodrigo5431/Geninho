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
  const navigate = useNavigate();

  

  const toggleMenu = () => {
    setHamburguer(!hamburguer);
    if (!hamburguer) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handleLogout = () => {
    if (authenticated) {
      logout();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const texts = [
      "O melhor sabor para você!",
      "Qualidade em cada mordida!",
      "Sua fome, nossa paixão!",
    ];
    let index = 0;
    const interval = setInterval(() => {
      setHeaderText(texts[index]);
      index = (index + 1) % texts.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="header-header">
        <section className="header-logo">
          <Link to="/">
            <img
              className="imageBurguer"
              src={logo}
              alt="Logo da Hamburgueria"
            />
          </Link>
          <section className="header-text">
            <h1 className="titleHeader">Burguer Master</h1>
            <p className="subtitleHeader">{headerText}</p>
          </section>
        </section>

        <div
          className={`hamburguerIcon ${hamburguer ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
          role="button"
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <nav
          className={`header-nav ${hamburguer ? "menuActive" : "menuHidden"}`}
        >
          <Link to="/">
            <button className="nav-button">HOME</button>
          </Link>

          {role === "ADMIN" || role === "CHEF" ? (
            <>
              <Link to="/products">
                <button className="nav-button">PRODUTOS</button>
              </Link>
              <Link to="/ordem-producao">
                <button className="nav-button">PRODUÇÃO</button>
              </Link>
              <Link to="/coupons">
                <button className="nav-button">CUPONS</button>
              </Link>
              <Link to="/cadastro">
                <button className="nav-button">CADASTRO</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/orders">
                <button className="nav-button">PEDIDOS</button>
              </Link>
            </>
          )}
          <button className="nav-button" onClick={() => handleLogout()}>
            {authenticated ? "SAIR" : "ENTRAR"}
          </button>
        </nav>
      </header>

      {location.pathname === "/" && (
        <section className="headerNavigation">
          <section
            className={`navbar menuActive ${
              hamburguer ? "menuActive" : "menuHidden"
            } `}
          >
            <a href="#hamburguer" className="navLink">
              HAMBÚRGUERES
            </a>
            <a href="#bebidas" className="navLink">
              BEBIDAS
            </a>
            <a href="#sobremesas" className="navLink">
              SOBREMESAS
            </a>
          </section>
          {role !== "ADMIN" && (
            <div className="cartDiv">
              <Link
                to="/cart"
                className={`cartIconn`}
                aria-label="Carrinho de compras"
              >
                <BsCart4
                  style={{ color:"#ff9900"  }}
                  size={30}
                />
              </Link>
            </div>
          )}
        </section>
      )}

      {hamburguer && (
        <div>
          <div className="navbarHambur">
            <nav className={`screensHamburguer`}>
              <Link to="/">
                <button className="nav-buttonHamburguer">HOME</button>
              </Link>
              {role === "ADMIN" ? (
                <>
                  <Link to="/cadastrar-produtos">
                    <button className="nav-buttonHamburguer">PRODUTOS</button>
                  </Link>
                  <Link to="/ordem-producao">
                    <button className="nav-buttonHamburguer">PRODUÇÃO</button>
                  </Link>
                </>
              ) : (
                <Link to="/orders">
                  <button className="nav-buttonHamburguer">PEDIDOS</button>
                </Link>
              )}
            </nav>
            {location.pathname === "/" && (
              <section className="navigationProducts">
                <a href="#hamburguer" className="navLink">
                  HAMBÚRGUERES
                </a>
                <a href="#bebidas" className="navLink">
                  BEBIDAS
                </a>
                <a href="#sobremesas" className="navLink">
                  SOBREMESAS
                </a>
              </section>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
