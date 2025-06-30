import React, { useState, useEffect, useContext } from "react";
import Header from "../../Components/Header";
import { AuthContext } from "../../Context/Auth";
import {
  registerProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} from "../../Services/Api";
import { useParams } from "react-router-dom";
import GeneralModal from "../../Components/GeneralModal/index.jsx";
import "./styles.css";
import Background from "../../Components/Background/";

export default function CadastrarProdutos({ userRole }) {
  useEffect(() => {
    document.title = "Cadastrar Produtos";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    file: null,
    estoque: "",
    status: false,
  });
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const handleParams = async () => {
    if (id) {
      try {
        const response = await getProductById(id);
        const { name, description, price, category, estoque, status } =
          response;
        setFormData({
          name,
          description,
          price,
          category,
          estoque,
          status,
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const { role } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, status: e.target.checked });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerProduct(formData);
      if (response.status === 200) {
        setShowModal(true);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          file: null,
          estoque: "",
          status: false,
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct(id, formData);
      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteButton = async () => {
    try {
      const response = await deleteProduct(id);
      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    handleParams();
  }, []);

  return (
    <Background>
      {id ? null : <Header />}
      {role !== "ADMIN" ? (
        <h1>Você não tem permissão para visualizar o conteúdo dessa página</h1>
      ) : (
        <section className="register-product-container">
          <div className="cardRegisterProduct">
            <h1 tabIndex={0} className="titleRegisterProducts">
              {id ? "Atualizar Produto" : "Cadastrar Novo Produto"}
            </h1>
            <form
              className="formRegisterProduct"
              onSubmit={id ? handleSubmitUpdate : handleSubmitRegister}
            >
              <section className="form-groupRegisterProduct">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome do produto"
                  required
                />
              </section>
              <section className="form-groupRegisterProduct">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descrição do produto"
                  required
                />
              </section>
              <section className="form-groupRegisterProduct">
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Preço"
                  required
                />
              </section>
              <section className="form-groupRegisterProduct">
                <input
                  type="text"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  placeholder="Quantidade"
                  required
                />
              </section>
              <section className="form-groupRegisterProduct">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione a categoria</option>
                  <option value="sobremesa">Sobremesas</option>
                  <option value="bebida">Bebidas</option>
                  <option value="lanche">Lanches</option>
                </select>
              </section>
              {id ? (
                  <>
                  <div className="checkbox-container">              
                  <input
                    tabIndex={0}
                    className="checkboxActived"
                    type="checkbox"
                    checked={formData.status}
                    onChange={handleCheckboxChange}
                    />
                      <p tabIndex={0}>Ativar Produto</p>
                      </div>
                </>
              ) : (
                <section className="form-groupRegisterProduct">
                  <input
                    className="inputRegisterProduct"
                    type="file"
                    name="file"
                    onChange={handleImageChange}
                    required
                  />
                </section>
              )}
              <button type="submit" className="btn-submitRegisterProduct">
                {id ? "Atualizar" : "Cadastrar"}
              </button>
              {id && (
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDeleteButton()}
                >
                  Excluir Produto
                </button>
              )}
            </form>
            {showModal && (
              <GeneralModal
                message={
                  id
                    ? "Produto atualizado com sucesso"
                    : "Produto cadastrado com sucesso"
                }
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        </section>
      )}
    </Background>
  );
}
