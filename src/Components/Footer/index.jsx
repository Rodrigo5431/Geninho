import React from "react";
import "./footer.css";

import logo from "../../assets/logo.png";

export const Footer = () => {
  return (
    <div>
    <footer>
      <section className="footer-container">
        <section className="footer-section about">
          <section className="header-logo">
            <img
              className="imageBurguer"
              src={logo}
              alt="Logo da Hamburgueria"
            />
            <section className="header-text"></section>
          </section>
          <h1>BurguerMaster</h1>
          <p>BurguerMaster Pty Ltd</p>
          <p>ABN: 56 662 209 485</p>
        </section>

        <section className="footer-section links">
          <h4>Sobre</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Suporte</a>
            </li>
            <li>
              <a href="#">Entre em Contato</a>
            </li>
          </ul>
        </section>

        <section className="footer-section stay-tuned">
          <h4>Fique Atualizado!</h4>
          <ul>
            <li>
              <a href="#">Discord</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">X (Twitter)</a>
            </li>
            <li>
              <a href="#">YouTube</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </section>

        <section className="footer-section app-links">
          <h4>Baixe o App</h4>
          <a href="https://www.apple.com/app-store">
            <img
              src="https://leonardo-cdn.b-cdn.net/wp-content/uploads/2024/09/btn-appstore.svg"
              alt="App Store"
            />
          </a>
          <a href="https://play.google.com">
            <img
              src="https://leonardo-cdn.b-cdn.net/wp-content/uploads/2024/09/btn-g-play.svg"
              alt="Google Play"
            />
          </a>
        </section>
      </section>

      <section className="footer-separator"></section>

      <section className="footer-bottom">
        <a href="#">Legal Notice</a>
        <a href="#">DMCA</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </section>
      </footer>
      </div>
  );
};

export default Footer;