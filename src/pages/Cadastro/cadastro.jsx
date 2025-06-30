import { useState, useContext, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/index.jsx";
import { registerUser } from "../../Services/Api.js";
import { useNavigate } from "react-router-dom";
import GeneralModal from "../../Components/GeneralModal/index.jsx";
import "./cadastro.css";
import Background from "../../Components/Background/index.jsx";
import { AuthContext } from "../../Context/Auth.jsx";

export default function Cadastro() {
  useEffect(() => {
    document.title = "Cadastro";
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profile: "",
  });
  const { role } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const [profile, setProfile] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.status === 200) {
        setModalMessage("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
      setModalMessage("Erro ao cadastrar o usuário, tente novamente!");
    }
  };

  const onCloseModal = () => {
    if (modalMessage === "Usuário cadastrado com sucesso!") {
      setShowModal(false);
      return navigate("/login");
    }
    setShowModal(false);
  };
  useEffect(() => {
    if (role !== "ADMIN") {
      const profile = "USER";
      setFormData({ ...formData.profile, profile });
    }
  }, []);

  useEffect(() => {
    if (modalMessage) {
      setShowModal(true);
    }
  }, [modalMessage]);

  return (
    <Background>
      <Header />
      <section className="signup-container">        
        <form className="form-container" onSubmit={handleSubmit}>
        <h2 tabIndex={0} className="titleRegister">
          Cadastro
        </h2>
          <section className="formInput">
            <label tabIndex={0} className="titleInput" htmlFor="name">
              Nome
            </label>
            <input
              tabIndex={0}
              className="inputRegister"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome"
              required
            />
          </section>
          <section className="formInput">
            <label tabIndex={0} className="titleInput" htmlFor="email">
              Email
            </label>
            <input
              tabIndex={0}
              className="inputRegister"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </section>
          <section className="formInput">
            <label tabIndex={0} className="titleInput" htmlFor="phone">
              Telefone
            </label>
            <input
              tabIndex={0}
              className="inputRegister"
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Telefone"
              required
            />
          </section>
          {role === "ADMIN" && (
            <div className="formInput">
              <label tabIndex={0} className="titleInput" htmlFor="role">
                Cargo
              </label>
              <select
                id="profile"
                name="profile"
                className="formSelect"
                tabIndex={0}
                value={formData.profile}
                onChange={handleChange}
              >
                <option
                  tabIndex={0}
                  className="selectRegister"
                  id="profile"
                  name="profile"
                  value={"USER"}
                >
                  USER
                </option>
                <option
                  tabIndex={0}
                  className="selectRegister"
                  id="profile"
                  name="profile"
                  value={"SELLER"}
                >
                  VENDEDOR
                </option>
                <option
                  tabIndex={0}
                  className="selectRegister"
                  id="profile"
                  name="profile"
                  value={"CHEF"}
                >
                  CHEF
                </option>
                <option
                  tabIndex={0}
                  className="selectRegister"
                  id="profile"
                  name="profile"
                  value={"ADMIN"}
                >
                  ADMIN
                </option>
              </select>
            </div>
          )}
          <section className="formInput">
            <label tabIndex={0} className="titleInput" htmlFor="password">
              Senha
            </label>
            <input
              tabIndex={0}
              className="inputRegister"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Senha"
              required
            />
          </section>
          <section className="formInput">
            <label
              tabIndex={0}
              className="titleInput"
              htmlFor="confirmPassword"
            >
              Confirme sua Senha
            </label>
            <input
              tabIndex={0}
              className="inputRegister"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua Senha"
              required
            />
          </section>

          <button className="registerButton" type="submit">
            Cadastrar
          </button>
        </form>
      </section>
      {showModal && (
        <GeneralModal
          message={modalMessage}
          onClose={onCloseModal}
          tabIndex={0}
        />
      )}
      <Footer />
    </Background>
  );
}
