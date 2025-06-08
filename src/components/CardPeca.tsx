import { NavLink } from "react-router-dom";
import Peca from "../interfaces/Peca";

import { PecaCarrinho } from '../store/carrinhoStore';

interface Props {
  peca: Peca;
  pecaNoCarrinho: PecaCarrinho | null; 
  adicionarPeca: (peca: Peca) => void;
  subtrairPeca: (peca: Peca) => void;
}

const CardPeca = ({ peca, pecaNoCarrinho, adicionarPeca, subtrairPeca }: Props) => {
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
        <NavLink
          className="btn btn-outline-primary btn-sm"
          to={`/pecas/${peca.id}`}
        >
          Mais Informações
        </NavLink>
        {peca.qtdEstoque > 0 ? (
          pecaNoCarrinho !== null ?
            <div className="btn-group" style={{width: "150px"}}>
              <button onClick={() => subtrairPeca(peca)} style={{width: "32%"}} type="button" className="btn btn-primary btn-sm">-</button>
              <button style={{width: "36%"}} type="button" className="btn btn-outline-primary btn-sm" disabled>{pecaNoCarrinho.quantidade}</button>
              <button onClick={() => adicionarPeca(peca)} style={{width: "32%"}} type="button" className="btn btn-primary btn-sm">+</button>
            </div> :
            <button className="btn btn-primary btn-sm" onClick={() => adicionarPeca(peca)}> 
              Adicionar ao carrinho
            </button>
        ) : (
          <button className="btn btn-secondary btn-sm" disabled>
            Produto Esgotado
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPeca;