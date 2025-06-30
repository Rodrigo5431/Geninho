import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../Context/Cart";
import { AuthContext } from "../../Context/Auth";
import GeneralModal from "../GeneralModal/";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addProductToCart } = useContext(CartContext);
  const { role } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const { id, name, description, price, url, status } = product;

  const handleAddProduct = () => {
    addProductToCart(id);
    setShowModal(true);
  };

  return role === "ADMIN" || role === "CHEF" ? (
    <section className="produtoCard" tabIndex={0}>
      <Link to={`/product/${id}`} className="produtoLink">
        <img src={url} alt={name} className="produtoImagem" />
      </Link>
      <section className="produtoConteudo" tabIndex={0}>
        <h2 className="produtoNome" tabIndex={0}>
          {name}
        </h2>
        <p className="produtoPreco" tabIndex={0}>
          R${price}
        </p>
        <p className="produtoDescricao">{`Status: ${status}`}</p>
      </section>
    </section>
  ) : (
    <section className="produtoCard" tabIndex={0}>
      <Link to={`/product/${id}`} className="produtoLink" tabIndex={0}>
        <img src={url} alt={name} className="produtoImagem" />
      </Link>
      <section className="produtoConteudo" tabIndex={0}>
        <h2 className="produtoNome" tabIndex={0}>
          {name}
        </h2>
        <section className="sectionAdicionar">
          <button className="botaoAdicionar" onClick={() => handleAddProduct()}>
            <p className="produtoPreco" tabIndex={0}>
              R${price} <FaShoppingCart />
            </p>
          </button>
        </section>
      </section>
      {showModal && (
        <GeneralModal
          message="Produto Adicionado ao Carrinho"
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}