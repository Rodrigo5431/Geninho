import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import "./login.css";
import { login } from "../../Services/Api";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = { email, password };
      const response = await login(form);

      if (response.status !== 200) {
        return setError("Usuário ou senha não encontrados.");
      }
      setTimeout(() =>navigate("/"), 1000);


    } catch (error) {
      setError("Usuário ou senha não encontrados.");
      console.error(error);
    }
  };



  return (
    <div className="containerLogin">
      <div className="carouselOverlay" aria-live="polite">
      </div>
      <div className="cardLogin">
        <div className="formContainer">
          <h1 className="title" tabIndex={0}>
            Login
          </h1>
          <section className="login-form">
            {error && (
              <p className="error" role="alert" aria-live="assertive">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit} className="inputArea">
              <div className="input-field">
                <label htmlFor="email" className="visually-hidden">
                  Email
                </label>
                <input
                  id="email"
                  className="login-input-button"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  aria-describedby="email-helper"
                  aria-label="Email"
                />
                <span id="email-helper" className="visually-hidden">
                  Informe seu email para login
                </span>
              </div>
              <div className="input-field">
                <label htmlFor="password" className="visually-hidden">
                  Senha
                </label>
                <div className="password-container">
                  <input
                    id="password"
                    className="login-input-button"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                    aria-describedby="password-helper"
                    aria-label="Senha"
                  />
                  <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span id="password-helper" className="visually-hidden">
                  Informe sua senha
                </span>
              </div>
              <button className="loginButton" type="submit" tabIndex={0}>
                Entrar
              </button>
              <p className="account">
                <Link to="/cadastro" className="register" tabIndex={0}>
                  Não está cadastrado? Crie sua conta
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
