import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../../Components/CartCard";
import ConfirmationModal from "../../Components/ConfirmationModal";
import Header from "../../Components/Header";
import { AuthContext } from "../../Context/Auth";
import { CartContext } from "../../Context/Cart";
import { getProductById } from "../../Services/Api";
import "./Cart.css";
import Footer from "../../Components/Footer";

export default function CartProducts() {
  useEffect(() => {
    document.title = "Carrinho";
  }, []);

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { cart, totalPrice, cleanCart } = useContext(CartContext);
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();



  const renderCartProducts = () => {
    return products.map((product) => {
      const { id, name, description, price, url, quantity } = product;
      return (
        <section key={id} className="cart-item-container">
          <CartCard
            id={id}
            name={name}
            price={price}
            url={url}
            quantity={quantity}
            description={description}
          />
        </section>
      );
    });
  };

  const goToCheckout = () => {
    return authenticated ? navigate("/checkout") : navigate("/login");
  };

  const handleDeleteAllClick = () => {
    setShowModal(true);
  };

  const deleteAllProductsFromCart = () => {
    cleanCart();
    setShowModal(false);
  };

  const handleProducts = async () => {
    const cartProducts = await Promise.all(
      cart.map(async (product) => {
        try {
          const productData = await getProductById(product.id);
          return { ...productData, quantity: product.quantity };
        } catch (e) {
          console.log(e.message);
        }
      })
    );
    return setProducts(cartProducts);
  };

  useEffect(() => {
    handleProducts();
  }, [cart]);

  return (
    <>
      <Header />
      <div className="cart-container">
        <h2 tabIndex={0} className="titulo-carrinho">
          Carrinho
        </h2>
          {cart.length === 0 ? (
          <section className="empty-cart">
            <h3 tabIndex={0} className="empty-cart-h3">
              Seu carrinho está vazio
            </h3>
          </section>
        ) : (
          <section className="cart-content">
            <section className="cart-products-container">
              {renderCartProducts()}
            </section>
            <section className="cart-summary">
                <p className="total-price">Total: R$ {totalPrice.toFixed(2)}</p>
                <button className="continue-shopping" onClick={() => navigate("/")}>
                  Continuar comprando
                </button> 
              <button
                type="button"
                className="go-to-payment"
                onClick={() => goToCheckout()}
                >
                Ir para pagamento
              </button>
              <button
                type="button"
                className="delete-all-products"
                onClick={() => handleDeleteAllClick()}
              >
                Apagar Carrinho
              </button>
            </section>
          </section>
        )}
        {showModal && (
          <>
            <ConfirmationModal
              className="cart-modal"
              message="Tem certeza que deseja apagar todos os produtos do carrinho?"
              onConfirm={() => deleteAllProductsFromCart()}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
