import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";
import GeneralModal from "../../Components/GeneralModal/index.jsx";
import Header from "../../Components/Header";
import { registerCoupon } from "../../Services/Api";
import Footer from "../../Components/Footer";
import "./RegisterCoupons.css";

export default function Coupons() {
  useEffect(() => {
    document.title = "Criação de Cupons";
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discount: 0,
    valid: "",
    type: "PERCENTAGE",
  });
  const { role } = useContext(AuthContext);

  const navigate = useNavigate();

  const checkRole = () => {
    if (role !== "ADMIN") {
      navigate("/");
    }
    return;
  };

  const handleCouponChange = (e) => {
    setCouponForm({ ...couponForm, [e.target.name]: e.target.value });
  };

  const onClickCouponButton = async () => {
    try {
      const response = await registerCoupon(couponForm);
      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const onCloseModal = () => {
    setCouponForm({
      code: "",
      discount: 0,
      valid: "",
      type: "PERCENTAGE",
    });
    setShowModal(false);
  };

  useEffect(() => {
    checkRole();
  }, []);

  return (
    <>
      <Header />
      <section className="signup-container"> 
      <form className="coupon-form">
        <div className="coupon-form-group">
          <label htmlFor="code" className="titleInput">Código</label>
            <input
            className="inputRegister"
            type="text"
            id="code"
            name="code"
            value={couponForm.code}
            onChange={(e) =>
              setCouponForm({ ...couponForm, code: e.target.value })
            }
          />
        </div>
        <div className="coupon-form-group">
          <label htmlFor="discount" className="titleInput">Desconto</label>
            <input
            className="inputRegister"
            type="number"
            id="discount"
            name="discount"
            value={couponForm.discount}
            onChange={(e) => handleCouponChange(e)}
          />
        </div>
        <div className="coupon-form-group">
          <label htmlFor="valid" className="titleInput">Validade</label>
            <input
            className="inputRegister"
            type="date"
            id="valid"
            name="valid"
            value={couponForm.valid}
            onChange={(e) => handleCouponChange(e)}
          />
        </div>
        <div className="coupon-form-group">
          <label htmlFor="type" className="titleInput">Tipo</label>
          <select
            id="type"
            name="type"
            value={couponForm.type}
            onChange={(e) => handleCouponChange(e)}
          >
            <option value="PERCENTAGE">Porcentagem</option>
            <option value="ABSOLUTE">Fixo</option>
          </select>
        </div>
        <button type="button" onClick={() => onClickCouponButton()}>
          Cadastrar
        </button>
        </form>
        </section>
      {showModal && (
        <GeneralModal
          message="Cupom cadastrado com sucesso!"
          onClose={() => onCloseModal()}
        />
      )}
      <Footer />
    </>
  );
}
