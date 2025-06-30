import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/index";
import { getAllCoupons } from "../../Services/Api";
import CouponCard from "../../Components/CouponCard/index.jsx";
import RegisterPageButton from "../../Components/RegisterPageButton/RegisterPageButton";
import "./CouponsPage.css";

export default function CouponsPage() {
  useEffect(() => {
    document.title = "Visualizar Cupons";
  }, []);
  const [coupons, setCoupons] = useState([]);

  const handleCoupons = async () => {
    try {
      const response = await getAllCoupons();
      if (response.status === 200) {
        return setCoupons(response.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    handleCoupons();
  }, []);

  return (
    <>
      <Header />
      <div className="container-coupons">
        <div className="coupons-main-container">
          <div className="button-container">
            <RegisterPageButton
              props={{ address: "register-coupons", buttonName: "Cadastrar" }}
            />
          </div>
          <div className="coupons-container">
            {coupons.length > 0 &&
              coupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  handleCoupons={handleCoupons}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
