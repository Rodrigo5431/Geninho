import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
// import { createSession } from "../../Services/Api";
import "./ButtonSize.css";
import { AuthContext } from "../../../Context/Auth";

// import iconeContrasteBranco""  


const handleFontSize = (updateValue) => {
  const selectors = "h1, h2, h3,h4, h5,h6, p, a, span, li, ul, label, input, button, text";
  const elements = document.querySelectorAll(selectors);

 elements.forEach((element) => {
  if (element instanceof HTMLElement) {
    const currentFontSize = window.getComputedStyle(element).fontSize;
    const newFontSize = parseInt(currentFontSize) + updateValue;
    const minFontSize = 14; 
    const maxFontSize = 30;
    // element.style.fontSize = `${newFontSize}px`;
//parei************* em 25m
  
    if (newFontSize >= minFontSize && newFontSize <= maxFontSize) {
      element.style.fontSize = `${newFontSize}px`;
    }
  }
});
};

const ButtonSize = () => {
  const [outlineIsActive, setOutlineIsActive] = useState(false);
  // const {darckThemeIsActive, handletheme } = useContext(ThemeContext);

function handleoutlineIsActive(event){
  setOutlineIsActive(!outlineIsActive);
  alert("metodo outline nao implementado")

}

  return (
    <section id="container-botoes">
      
      <button
        id="diminuir"
        className="btnAce"
        aria-label="diminuir tamanho do texto -A" 
        type="button"
        onClick={() => handleFontSize(-1)}
      >
        -A
      </button>
      <button
        id="aumentar"
        className="btnAce"
        aria-label="aumentar tamanho do texto +A" 
        type="button"
        onClick={() => handleFontSize(1)}
      >
        +A
      </button>
      
{/* 
      <button
        className="btnAceC"
        arial-label="ativar alto contraste" 
        //  arial-pressed={darckthemeIsActive}
        // onClick={handletheme} 
       > 
         {/* <imag
          id="icone-contraste"
          src={iconeContrasteBranco}
          alt="icon ilustrativo de alto contraste"
        /> */}
      {/* </button> */}
    </section>
  );
};

export default ButtonSize;
