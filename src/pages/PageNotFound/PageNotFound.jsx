import React from "react";
import "../../Pages/PageNotFound/PageNotFound.css";
import error from "../../assets/error404.jpg";

const PageNotFound = () => {
  useEffect(() => {
      document.title = "Not Found";
  }, []);
  
  return (
    <section className="style.contanier">
      <img
        className="error-img"
        src={error}
        alt="Logo de pagina não encontrada"
      />
    </section>
  );
};
export default PageNotFound;
