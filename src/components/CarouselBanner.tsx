import { NavLink } from "react-router-dom";
import useRecuperarBannersComPaginacao from "../hooks/banners/useRecuperarBannersComPaginacao";

interface CarouselProps {
  itensPorPagina?: number;
}

const CarouselBanner = ({ itensPorPagina = 6 }: CarouselProps) => {
  // Define 6 como padrão, mas permite sobrescrever
  const {
    data: pageBanners,
    isPending: carregandoBanners,
    error: errorBanners,
  } = useRecuperarBannersComPaginacao({
    itensPorPagina: itensPorPagina,
    pagina: 0,
    ordenarPor: "dataCadastro",
    ordem: "DESC",
  });

  if (carregandoBanners) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando banners...</span>
        </div>
      </div>
    );
  }

  if (errorBanners) {
    console.error("Erro ao carregar banners:", errorBanners);
    return (
      <div className="alert alert-danger text-center" role="alert">
        Não foi possível carregar os banners.
      </div>
    );
  }

  const banners = pageBanners?.itens || [];

  if (banners.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        Nenhum banner disponível.
      </div>
    );
  }

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
            key={banner.id || index}
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
