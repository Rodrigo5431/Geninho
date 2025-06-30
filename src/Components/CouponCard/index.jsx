import React, { useState, useEffect } from "react";
import { changeCouponStatus, deleteCoupon } from "../../Services/Api";
import GeneralModal from "../GeneralModal";
import ConfirmationModal from "../ConfirmationModal";
import "./CouponCard.css";

export default function CouponCard({ coupon, handleCoupons }) {
  const [date, setDate] = useState();
  const [showGeneralModal, setShowGeneralModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [messageModal, setMessageModal] = useState(""); 
  const [messageConfirmationModal, setMessageConfirmationModal] = useState(""); 

  const { id, code, discount, valid, status } = coupon;

  const handleDate = () => {
    if (valid) {
      const date = new Date(valid);
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      const year = date.getFullYear();
      setDate(`${day}/${month}/${year}`);
    }
  };

  const onDeleteButtonClick = async () => {
    try {
      const response = await changeCouponStatus(id, !status);
      
      if (response.status === 200) {
        setShowConfirmationModal(false);
        setShowGeneralModal(true);
      }
      handleCoupons();
    } catch (e) {
      console.log(e.message);
    }
  };

  const onCloseGeneralModal = () => {
    setShowGeneralModal(false);
    
  };

  useEffect(() => {
    handleDate();
    if (status){
      setMessageModal("Tem certeza que deseja desativar cupom?");
    }
    else{
      setMessageModal("Tem certeza que deseja ativar cupom?");
    }
  }, []);

  useEffect(() => {
    if (status){
      setMessageConfirmationModal("Cupom desativado com sucesso");
    }
    else{
      setMessageConfirmationModal("Cupom ativado com sucesso");
    }
  },[messageModal])


  return (
    <div className="coupon-card">
      <p><strong>{`Código: ${code}`}</strong></p>
      <p>{`Id: ${id}`}</p>
      <p>{`Desconto: ${discount}`}</p>
      {/* <p>{`Desconto: ${discount} ${type === "PERCENTAGE" ? "%" : "Reais"}`}</p> */}
      <p>{`Validade: ${date}`}</p>
      {/* <p>{type}</p> */}
      <p>{`Status: ${status}`}</p>
      <button
        className="cupom-button"
        type="button"
        onClick={() => setShowConfirmationModal(true)}
      >
        {status ? "Desativar Cupom" : `Ativar Cupom`}
      </button>
      {showConfirmationModal && (
        <ConfirmationModal
          className="cart-modal"
          message={messageModal}
          onConfirm={() => onDeleteButtonClick()}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
      {/* {showGeneralModal && (
        <GeneralModal
          message={messageConfirmationModal}
          onClose={() => onCloseGeneralModal()}
          // onClose={() => setShowGeneralModal(false)}
        />
      )} */}
    </div>
  );
}
