import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"; // Arquivo CSS exclusivo para o carrossel

const Carousel = () => {
  const carouselSettings = {
    dots: true,
    arrows: false, // Remove as setas
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
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
  );
};

export default Carousel;
