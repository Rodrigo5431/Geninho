import React, { useEffect, useState } from "react";
import "./navBar.css";

export function NavBar() {
  const [role, setRole] = useState(false);

  const handleRole = () => {
    const newRole = localStorage.getItem("role");
    const str = newRole !== null ? newRole.replace(/"/g, "") : "";
    if (str == "ADMIN") {
      return setRole(true);
    }
    setRole(false);
  };

  useEffect(() => {
    handleRole();
  }, []);

  return !role ? (
    <section className="navbar">
      {/* <a href="#hamburguer" className="navLink">
        HAMBÚRGUERES
      </a>
      <a href="#bebidas" className="navLink">
        BEBIDAS
      </a>
      <a href="#sobremesas" className="navLink">
        SOBREMESAS
      </a>
      <Link to="/cart" className="cartIcon">
        <BsCart4 size={30} />
      </Link>
    </section>
  ) : (
    <section className="navbar">
      <a href="#hamburguer" className="navLink">
        HAMBÚRGUERES
      </a>
      <a href="#bebidas" className="navLink">
        BEBIDAS
      </a>
      <a href="#sobremesas" className="navLink">
        SOBREMESAS{" "}
      </a> */}
    </section>
  ):(<div></div>);
}
