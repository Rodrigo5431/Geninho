import React, { useState, useEffect, useContext } from "react";
import Header from "../../Components/Header";
import ProductCard from "../../Components/ProductCard";
import { AuthContext } from "../../Context/Auth";
import { getAllProducts } from "../../Services/Api";
import "./Products.css";
import RegisterPageButton from "../../Components/RegisterPageButton/RegisterPageButton";

export default function Products() {
  useEffect(() => {
    document.title = "Produtos";
  }, []);

  const [products, setProducts] = useState([]);
  const { role } = useContext(AuthContext);

  const handleProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <>
      <Header />
      {role === "ADMIN" ? (
        <div className="coupons-main-container">
          <div className="button-container">
            <RegisterPageButton
              props={{ address: "cadastrar-produtos", buttonName: "Cadastrar" }}
            />
          </div>
          <div className="coupons-container">
           {/*  <h1>Produtos</h1> */}
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <h1>Access Denied</h1>
      )}
    </>
  );
}
