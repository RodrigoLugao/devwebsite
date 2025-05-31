import { NavLink } from "react-router-dom";
import Banner from "../interfaces/Banner";

interface CarouselProps {
  banners: Banner[];
}

const CarouselBanner = ({ banners }: CarouselProps) => {
  return (
    <div
      id="carouselHome"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselHome"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <NavLink to={banner.link}>
              <img
                src={`${import.meta.env.BASE_URL}${banner.imagem}`}
                className="d-block w-100 cropped-image"
                alt={banner.titulo}
              />
            </NavLink>
            <div className="carousel-caption custom-bg-opacity-50">
              <h5>{banner.titulo}</h5>
              <p>{banner.descricao}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselHome"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon custom-control-icon"
          aria-hidden="true"
        />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselHome"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon custom-control-icon"
          aria-hidden="true"
        />
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
};

export default CarouselBanner;
