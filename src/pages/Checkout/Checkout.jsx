import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/Cart";
import { AuthContext } from "../../Context/Auth.jsx";
import {
  getProductById,
  postInvoice,
  updateProductQuantityById,
  getCouponByCode,
} from "../../Services/Api";
import Header from "../../Components/Header/index.jsx";
import GeneralModal from "../../Components/GeneralModal/index.jsx";
import { useNavigate } from "react-router-dom";
import qrCode from "../../assets/qrCode.webp";
// import Footer from "../../components/Footer/Footer.jsx";
import "./Checkout.css";

export default function Checkout() {
  useEffect(() => {
    document.title = "Pagamento";
  }, []);

  const { cart, totalPrice, cleanCart } = useContext(CartContext);
  const { role } = useContext(AuthContext);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [client, setClient] = useState({
    name: "",
    phone: "",
  });
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [coupon, setCoupon] = useState({
    code: "",
    isValid: false,
    discount: 0,
    type: "",
  });
  const [form, setForm] = useState({
    cardNumber: "",
    cardName: "",
    cardDate: "",
    cardCVV: "",
    installments: 1,
  });
  const [invoice, setInvoice] = useState({
    products: [],
    paymentMethod: "PIX",
    coupon: {
      code: coupon.code,
    },
  });

  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const updateState = {
      ...form,
      [name]: value,
    };
    setForm(updateState);
  };

  const renderCartProducts = () => {
    return products.map((product) => {
      const { id, name, price, quantity } = product;
      return (
        <section key={id} className="cart-sec">
          <p>{name}</p>
          <section>
            <p>Quantidade: {quantity}</p>
            <p>R$ {price.toFixed(2)}</p>
          </section>
        </section>
      );
    });
  };

  const onPaymentClick = async () => {
    try {
      let newInvoice = { ...invoice };
      if (!invoice.coupon.code) {
        const { coupon, ...invoiceWithoutCoupon } = invoice;
        newInvoice = invoiceWithoutCoupon;
      }
      if (role === "SELLER") {
        newInvoice = { ...newInvoice, client };
      }
      const response = await postInvoice(newInvoice);
      if (response.status === 200) {
        try {
          await Promise.all(
            cart.map((item) =>
              updateProductQuantityById(item.id, Number(item.quantity))
            )
          );
          setModalMessage(
            "Compra realizada com sucesso! Seu pedido está sendo preparado"
          );
        } catch (e) {
          console.error(e.message);
          setModalMessage("Erro ao atualizar estoque dos produtos");
        }
      } else {
        setModalMessage("Erro ao realizar pagamento");
      }
    } catch (e) {
      console.error(e.message);
      setModalMessage("Erro ao finalizar compra. Tente novamente");
    } finally {
      setShowModal(true);
    }
  };

  const formValidation = () => {
    if (invoice.paymentMethod === "CARTÃO") {
      if (form.cardNumber.length !== 16) {
        return setButtonDisabled(true);
      }
      if (form.cardName.length < 3) {
        return setButtonDisabled(true);
      }
      const currentDate = new Date();
      const cardExpiryDate = new Date(form.cardDate);
      if (isNaN(cardExpiryDate) || cardExpiryDate < currentDate) {
        return setButtonDisabled(true);
      }
      if (form.cardCVV.length !== 3) {
        return setButtonDisabled(true);
      }
    }
    setButtonDisabled(false);
  };

  const handleProducts = async () => {
    const cartProducts = await Promise.all(
      cart.map(async (product) => {
        const productData = await getProductById(product.id);
        return { ...productData, quantity: product.quantity };
      })
    );
    return setProducts(cartProducts);
  };

  const handleCartItens = () => {
    const itens = cart.map((product) => {
      return { id: product.id, qtd: product.quantity };
    });
    setInvoice(() => ({
      ...invoice,
      products: itens,
    }));
  };

  const onCloseModal = () => {
    if (
      modalMessage ===
        "Compra realizada com sucesso! Seu pedido está sendo preparado" ||
      modalMessage === "Erro ao finalizar compra. Tente novamente" ||
      modalMessage === "Erro ao realizar pagamento"
    ) {
      setShowModal(false);
      setModalMessage("");
      cleanCart();
      return navigate("/");
    }
    if (
      modalMessage === "Cupom aplicado com sucesso" ||
      modalMessage === "Cupom inválido"
    ) {
      setModalMessage("");
      return setShowModal(false);
    }
    setModalMessage("");
    cleanCart();
  };

  const handlePaymentMethod = (e) => {
    const { value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      paymentMethod: value,
    }));
    if (value === "PIX" || value === "DINHEIRO") {
      return setButtonDisabled(false);
    }
    return setButtonDisabled(true);
  };

  const handleCouponChange = (e) => {
    const { value } = e.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      code: value,
    }));
  };

  const handleCouponClick = async () => {
    try {
      const response = await getCouponByCode(coupon.code, client);
      const { discount, isValid, type } = response.data;
      if (response.status === 200 && isValid) {
        setModalMessage("Cupom aplicado com sucesso");
        setCoupon((prevCoupon) => ({
          ...prevCoupon,
          isValid,
          discount,
          type,
        }));
        setInvoice((prevInvoice) => ({
          ...prevInvoice,
          coupon: {
            code: coupon.code,
          },
        }));
      } else {
        setModalMessage("Cupom inválido");
      }
    } catch (error) {
      console.error(error.message);
      setModalMessage("Cupom inválido");
      setShowModal(true);
    }
  };

  const handleCouponDiscount = () => {
    if (coupon.type === "ABSOLUTE") {
      return <p>{`R$ ${(totalPrice - coupon.discount).toFixed(2)}`}</p>;
    }
    if (coupon.type === "PERCENTAGE") {
      return (
        <p>{`R$ ${(totalPrice - (totalPrice * coupon.discount) / 100).toFixed(
          2
        )}`}</p>
      );
    }
    return <p>{totalPrice.toFixed(2)}</p>;
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleProducts();
    handleCartItens();
  }, []);

  useEffect(() => {
    if (modalMessage) {
      setShowModal(true);
    }
  }, [modalMessage]);

  useEffect(() => {
    formValidation();
  }, [form]);

  return (
    <>
      {cart.length === 0 && navigate("/")}
      <Header />
      <section className="payment-section" tabIndex={0}>
        {role === "USER" ? (
          <form className="card-form" tabIndex={0}>
            <input
              type="text"
              value={coupon.code}
              onChange={handleCouponChange}
              placeholder="Insira seu cupom"
            />
            <button type="button" onClick={handleCouponClick}>
              Aplicar Cupom
            </button>
            <select
              className="select"
              onChange={(e) => handlePaymentMethod(e)}
              tabIndex={0}
            >
              <option value="PIX">PIX</option>
              <option value="CARTÃO">Cartão de crédito</option>
              <option value="DINHEIRO">Pagar na entrega</option>
            </select>
            {invoice.paymentMethod === "CARTÃO" && (
              <>
                <input
                  tabIndex={0}
                  type="text"
                  placeholder="Número do cartão"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={(e) => onInputChange(e)}
                />
                <input
                  tabIndex={0}
                  type="text"
                  placeholder="name do titular"
                  name="cardName"
                  value={form.cardName}
                  onChange={(e) => onInputChange(e)}
                />
                <input
                  tabIndex={0}
                  type="date"
                  placeholder="Data de validade"
                  name="cardDate"
                  value={form.cardDate}
                  onChange={(e) => onInputChange(e)}
                />
                <input
                  tabIndex={0}
                  type="text"
                  placeholder="CVV"
                  name="cardCVV"
                  value={form.cardCVV}
                  onChange={(e) => onInputChange(e)}
                />
                <select>
                  <option value="1">1x de R$ {totalPrice.toFixed(2)}</option>
                  <option value="2">
                    2x de R$ {(totalPrice / 2).toFixed(2)}
                  </option>
                  <option value="3">
                    3x de R$ {(totalPrice / 3).toFixed(2)}
                  </option>
                  <option value="4">
                    4x de R$ {(totalPrice / 4).toFixed(2)}
                  </option>
                  <option value="5">
                    5x de R$ {(totalPrice / 5).toFixed(2)}
                  </option>
                  <option value="6">
                    6x de R$ {(totalPrice / 6).toFixed(2)}
                  </option>
                </select>
              </>
            )}
            {invoice.paymentMethod === "PIX" && <img src={qrCode} />}
            <button
              type="button"
              disabled={buttonDisabled}
              onClick={() => onPaymentClick()}
            >
              Finalizar compra
            </button>
          </form>
        ) : (
          <form className="card-form" tabIndex={0}>
            <input
              type="text"
              value={coupon.code}
              onChange={handleCouponChange}
              placeholder="Insira seu cupom"
            />
            <button type="button" onClick={handleCouponClick}>
              Aplicar Cupom
            </button>
            <input
              type="text"
              name="name"
              value={client.name}
              onChange={(e) => handleClientChange(e)}
              placeholder="Nome do Cliente"
              required
            />
            <input
              type="text"
              name="phone"
              value={client.phone}
              onChange={(e) => handleClientChange(e)}
              placeholder="Telefone do Cliente"
              required
            />
            <button
              type="button"
              disabled={buttonDisabled}
              onClick={() => onPaymentClick()}
            >
              Finalizar Pedido
            </button>
          </form>
        )}
        <section className="cart-confirmation">
          {renderCartProducts()}
          {handleCouponDiscount()}
        </section>
      </section>
      {showModal && (
        <GeneralModal message={modalMessage} onClose={() => onCloseModal()} />
      )}
      {/* <Footer /> */}
    </>
  );
}
