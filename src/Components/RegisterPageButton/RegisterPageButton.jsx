import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPageButton.css"

export default function ({ props }) {
  const { address, buttonName } = props;
  const navigate = useNavigate();

  const navigationAddress = () => {
    navigate(`/${address}`);
  };

  return (
    <button
      className="registerButtonButton"
      onClick={() => {
        navigationAddress();
      }}
    >
      {buttonName}
    </button>
  );
}
