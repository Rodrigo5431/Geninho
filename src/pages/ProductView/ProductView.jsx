import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../Services/Api";
import { AuthContext } from "../../Context/Auth";
import { CartContext } from "../../Context/Cart";
import { useNavigate } from "react-router-dom";
import GeneralModal from "../../Components/GeneralModal";
import Header from "../../Components/Header";
import CadastrarProdutos from "../CadastrarProdutos/CadastrarProdutos";
import "./ProductView.css";
import Footer from "../../Components/Footer";

export default function ProductView() {
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { addProductToCart } = useContext(CartContext);
  const { role } = useContext(AuthContext);

  const fetchProductById = async () => {
    try {
      const newProduct = await getProductById(id);
      if (newProduct) setProduct(newProduct);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleButtonClick = (id) => {
    addProductToCart(id);

    setShowModal(true);
  };

  const renderProductView = () => {
    if (product) {
      const { id, name, description, price, url } = product;
      return (
        // <BackGround>
        <>
          {role !== "ADMIN" ? (
            <section className="container">
              <img className="productImg" src={url}></img>
              <section className="productCard">
                <h2 style={{ fontWeight: "bold" }}>{name}</h2>
                <h2 style={{ fontWeight: "bold" }}>{description}</h2>
                <section>
                  <span>R$ {price.toFixed(2)}</span>
                </section>
                <button
                  onClick={() => {
                    handleButtonClick(id);
                  }}
                  className="productBtn"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  className="productBtn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Voltar
                </button>
              </section>
              {showModal && (
                <GeneralModal
                  message="Produto adicionado ao carrinho"
                  onClose={() => onCloseModal()}
                />
              )}
            </section>
          ) : (
            <CadastrarProdutos />
          )}
        </>
        // </BackGround>
      );
    }
    return <h1>Carregando...</h1>;
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  return (
    <>
      <Header />
      {renderProductView()}
      <Footer />
    </>
  );
}
