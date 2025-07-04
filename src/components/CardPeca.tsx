import { Link } from "react-router-dom";
import Peca from "../interfaces/Peca";

import { PecaCarrinho } from "../store/carrinhoStore";
import BotaoFavoritarPeca from "./BotaoFavoritarPeca";

interface Props {
  peca: Peca;
  pecaNoCarrinho: PecaCarrinho | null;
  showFavorito?: boolean;
  isFavorito?: boolean;
  isCarregando?: boolean;
  isAdmin?: boolean;
  adicionarPeca: (peca: Peca) => void;
  subtrairPeca: (peca: Peca) => void;
  excluirPeca?: (peca: Peca) => void;
}

const CardPeca = ({
  peca,
  pecaNoCarrinho,
  showFavorito = false,
  isFavorito = false,
  isCarregando = false,
  isAdmin = false,
  adicionarPeca,
  subtrairPeca,
  excluirPeca
}: Props) => {
  const imagemPadrao = new URL(
    "../assets/images/pecaplaceholder.jpg",
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
        src={`${import.meta.env.BASE_URL}${peca.imagem}`}
        className="card-img-top"
        alt={peca.nome}
        onError={handleImageError}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "contain",
        }}
      />

      {showFavorito && (
        <BotaoFavoritarPeca
          pecaId={peca.id!}
          isFavorito={isFavorito}
        ></BotaoFavoritarPeca>
      )}

      <div className="card-body">
        <p className="card-title h5">{peca.nome}</p>

        <p className="card-text text-muted">
          Categoria: {peca.categoriaPeca?.nome}
        </p>

        <p className="card-text fw-bold" style={{ color: "rgb(220,60,60)" }}>
          R${" "}
          {peca.preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          })}
        </p>
      </div>

      <div className="card-footer bg-transparent border-0 d-flex gap-3 justify-content-center">
        <Link
          className="btn btn-outline-primary btn-sm w-100"
          to={`/pecas/${peca.id}`}
        >
          Mais Informações
        </Link>
        {peca.qtdEstoque > 0 ? (
          pecaNoCarrinho !== null ? (
            <div className="btn-group w-100" style={{ width: "150px" }}>
              <button
                onClick={() => subtrairPeca(peca)}
                style={{ width: "32%" }}
                type="button"
                className="btn btn-primary btn-sm"
              >
                -
              </button>
              <button
                style={{ width: "36%" }}
                type="button"
                className="btn btn-outline-primary btn-sm"
                disabled
              >
                {pecaNoCarrinho.quantidade}
              </button>
              <button
                onClick={() => adicionarPeca(peca)}
                style={{ width: "32%" }}
                type="button"
                className="btn btn-primary btn-sm"
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() => adicionarPeca(peca)}
            >
              Adicionar ao carrinho
            </button>
          )
        ) : (
          <button className="btn btn-secondary btn-sm w-100" disabled>
            Produto Esgotado
          </button>
        )}
      </div>
      {isAdmin && (
        <div className="card-footer bg-transparent border-o d-flex gap-3 justify-content-center">
          <Link className="btn btn-secondary btn-sm w-100" to={`/pecas/${peca.id}/editar`}>
            Alterar Informações
          </Link>

          <button className="btn btn-danger btn-sm w-100" onClick={() => {excluirPeca? excluirPeca(peca): {}}}>Excluir Peça</button>
        </div>
      )}
    </div>
  );
};

export default CardPeca;
