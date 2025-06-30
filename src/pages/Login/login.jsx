import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AuthContext } from "../../Context/Auth";
import "./login.css";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = { email, password };
      const response = await login(form);

      if (response.status !== 200) {
        return setError("Usuário ou senha não encontrados.");
      }
    } catch (error) {
      setError("Usuário ou senha não encontrados.");
      console.error(error);
    }
  };

  const carouselSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="containerLogin">
      <div className="carouselOverlay" aria-live="polite">
        <Slider {...carouselSettings} aria-label="Carrossel de imagens">
          <div className="carouselItem">
            <img
              src="https://www.sabornamesa.com.br/media/k2/items/cache/b9ad772005653afce4d4bd46c2efe842_XL.jpg"
              alt="Imagem 1"
              className="carouselImage"
            />
          </div>
          <div className="carouselItem">
            <img
              src="https://www.grupomateus.com.br/wp-content/uploads/2022/01/Como-preparar-o-melhor-hamburguer.jpg"
              alt="Imagem 2"
              className="carouselImage"
            />
          </div>
          <div className="carouselItem">
            <img
              src="https://focalizando.com.br/sites/default/files/2022-03/hamburguerias-sao-paulo-para-visitar-em-2022.jpg"
              alt="Imagem 3"
              className="carouselImage"
            />
          </div>
        </Slider>
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
              {/* <div className="rememberPassword">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    aria-label="Lembrar senha"
                  />
                  Lembrar senha
                </label>
                <Link to="/esqueci-minha-senha" className="forgotPassword">
                  Esqueci minha senha
                </Link>
              </div> */}
              <button className="loginButton" type="submit" tabIndex={0}>
                Login
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
