import { NavLink } from "react-router-dom";
import Veiculo from "../interfaces/Veiculo";

interface Props {
  veiculo: Veiculo;
  completo?: boolean;
}

const CardVeiculo = ({ veiculo, completo = false }: Props) => {

  const imagemPadrao = new URL(
    "../assets/images/fotos-em-breve.png",
    import.meta.url
  ).href;

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = imagemPadrao;
  };

  return (
    <div className="card h-100">
      <img
        src={`${import.meta.env.BASE_URL}${veiculo.imagem}`}
        className="card-img-top"
        alt={veiculo.modelo.nome}
        onError={handleImageError}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "contain",
        }}
      />
      <div className="card-body">
        <p className="card-title h5 d-flex justify-content-between">
          {veiculo.modelo.nome}
          {completo && (
            <small className="text-muted">{veiculo.modelo.tipo}</small>
          )}
        </p>

        {!completo && <p className="card-text">{veiculo.descricao}</p>}

        <p className="card-text fw-bold d-flex justify-content-between">
          <span style={{ color: "rgb(220,60,60)" }}>
            R${" "}
            {veiculo.preco.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: true,
            })}
          </span>
          {completo && (
            <span className="text-end">Ano: {veiculo.modelo.ano}</span>
          )}
        </p>
      </div>

      <div className="card-footer bg-transparent border-0 d-flex justify-content-center">
        <NavLink className="btn btn-primary btn-sm" to={"/veiculos/codigo/" + veiculo.codigo}>
          Mais Informações
        </NavLink>
      </div>
    </div>
  );
};

export default CardVeiculo;
