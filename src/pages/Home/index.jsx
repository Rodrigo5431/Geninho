import Footer from "../../Components/Footer/index.jsx";
import Header from "../../Components/Header";
import { NavBar } from "../../Components/NavBar/index.jsx";
import ProductsSection from "../../Components/ProductsSection/ProductsSection.jsx";


export default function Home() {

  return (
    <div>
      <Header />
       <NavBar />
      <ProductsSection />
      <Footer />
      </div>
  );
}
