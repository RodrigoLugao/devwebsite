interface CarouselProps {
  imagens: string[];
}

const CarouselPhotos = ({ imagens }: CarouselProps) => {
  const gruposDeImagens = [];

  // Divide o array de imagens em grupos de até 3
  for (let i = 0; i < imagens.length; i += 3) {
    gruposDeImagens.push(imagens.slice(i, i + 3));
  }

  return (
    <div
      id="carouselHome"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-indicators">
        {gruposDeImagens.map((_, index) => (
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
        {gruposDeImagens.map((grupo, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="d-flex justify-content-center">
              {grupo.map((imagem, i) => (
                <img
                  key={i}
                  src={imagem.startsWith("http")? imagem : "/" + imagem}
                  className="d-block col-4"
                  alt={`Imagem ${i + 1}`}
                  style={{maxHeight: "380px" ,objectFit: "cover", aspectRatio: "1 / 1" }}
                />
              ))}
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
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselHome"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
};

export default CarouselPhotos;
