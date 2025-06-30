import { useEffect, useState } from "react";
import { BiSolidDrink } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import { IoIceCreamOutline } from "react-icons/io5";
import { getProducts } from "../../Services/Api";
import ProductCard from "../ProductCard";
import "../ProductCard/ProductCard.css";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const Hamburgers = () => {
    const lanche = products.filter(
      (product) =>
        product.category === "lanche" && product.estoque > 0 && product.status
    );
    if (lanche.length === 0) {
      return null;
    }
    return (
      <section className="category-section" id="hamburguer">
        <h1 className="produtoCategoria">
          <GiKnifeFork /> Hambúrgueres
        </h1>
        <section className="produtosContainer">
          {lanche.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    );
  };

  const Beverages = () => {
    const bebidas = products.filter(
      (product) =>
        product.category === "bebida" && product.estoque > 0 && product.status
    );
    if (bebidas.length === 0) {
      return null;
    }
    return (
      <section className="category-section" id="bebidas">
        <h1 className="produtoCategoria">
          <BiSolidDrink /> Bebidas
        </h1>
        <section className="produtosContainer">
          {bebidas.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    );
  };

  const Sweets = () => {
    const sobremesas = products.filter(
      (product) =>
        product.category === "sobremesa" &&
        product.estoque > 0 &&
        product.status
    );
    if (sobremesas.length === 0) {
      return null;
    }
    return (
      <section className="category-section" id="sobremesas">
        <h1 className="produtoCategoria">
          <IoIceCreamOutline /> Sobremesas
        </h1>
        <section className="produtosContainer">
          {sobremesas.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    );
  };

  const Combos = () => {
    const combos = products.filter(
      (product) => product.category === "combo" && product.estoque > 0
    );
    if (combos.length === 0) {
      return null;
    }
    return (
      <section className="category-section" id="combos">
        <h1 className="produtoCategoria">
          <GiKnifeFork /> Combos
        </h1>
        <section className="produtosContainer">
          {combos.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    );
  };

  return (
    <>
      {products.length === 0 ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <Hamburgers />
          <Beverages />
          <Combos />
          <Sweets />
        </>
      )}
    </>
  );
}
