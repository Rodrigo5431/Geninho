import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/Cart";
import { Link } from "react-router-dom";
import { getProductById } from "../../Services/Api";
import ConfirmationModal from "../ConfirmationModal";
import "./CartCard.css";

export default function CartProductsCard(props) {
  const { id, name, description, url, quantity } = props;
  const [newQty, setNewQty] = useState(quantity);
  const [stock, setStock] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { addProductQuantity, contextTotalPrice, removeProductFromCart } =
    useContext(CartContext);

  const handleStock = async () => {
    try {
      const stock = await getProductById(id);
      if (stock) setStock(stock.estoque);
    } catch (e) {
      console.log(e.message);
    }
  };

  const changeQuantity = (value) => {
    const updatedQty = newQty + value;
    if (updatedQty > stock) {
      setNewQty(stock);
    } else if (updatedQty <= 0) {
      removeProductFromCart(id);
    } else {
      setNewQty(updatedQty);
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const deleteProductFromCart = () => {
    // cleanCart();
    removeProductFromCart(id);
    setShowModal(false);
  };

  useEffect(() => {
    contextTotalPrice();
    addProductQuantity(id, newQty);
  }, [newQty]);

  useEffect(() => {
    handleStock();
  }, []);

  return (
    <section className="cart-card">
      <section className="cart-description">
        <section className="cart-img">
          <Link to={`/products/${id}`}>
            <img src={url} alt={name} />
          </Link>
        </section>
        <section className="nome-section">
          <h3>{name}</h3>
          <h3>{description}</h3>
        </section>
        <button
          type="button"
          className="delete-product-button"
          onClick={() => {
            handleDeleteClick();
          }}
        >
          X
        </button>
      </section>
      <section className="separate-section" />
      <section className="price-section">
        <section className="qty-section">
          <section className="price-quantity">
            <button
              className="qty-button"
              onClick={() => {
                changeQuantity(-1);
              }}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className="qty-button"
              onClick={() => {
                changeQuantity(1);
              }}
            >
              +
            </button>
          </section>
        </section>
      </section>
      {showModal && (
        <ConfirmationModal
          message="Você quer excluir todos os produtos?"
          onConfirm={() => deleteProductFromCart()}
          onCancel={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
