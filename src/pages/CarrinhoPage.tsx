import { useState } from "react";
import TabelaDePecas from "../components/TabelaDePecasDoCarrinho";
import { useCarrinhoStore } from "../store/carrinhoStore";
import Paginacao from "../components/Paginacao";
import useRecuperarPecasPorIdsComPaginacao from "../hooks/useRecuperarPecasPorIdsComPaginacao";
import { Link } from "react-router-dom";

const CarrinhoPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pecasPorPagina = 12;

  const carrinhoItens = useCarrinhoStore((state) => state.itens);
  const setQuantidadeAction = useCarrinhoStore((state) => state.setQuantidade);
  const limparCarrinhoAction = useCarrinhoStore(
    (state) => state.limparCarrinho
  );

  const idsDoCarrinho = carrinhoItens.map((item) => item.idPeca);

  const {
    data: pagePecas,
    isPending: carregandoProdutos, 
    error: errorProdutos,
  } = useRecuperarPecasPorIdsComPaginacao(
    idsDoCarrinho,
    pecasPorPagina,
    currentPage - 1
  );

  const totalPaginas = pagePecas ? pagePecas.totalPaginas : 0;
  const pecasExibidas = pagePecas ? pagePecas.itens : [];
  const totalItensNoCarrinhoFiltrados = pagePecas ? pagePecas.totalItens : 0;

  const handleRemocaoPeca = (pecaId: number) => {
    const itemNoCarrinho = carrinhoItens.find((item) => item.idPeca === pecaId);
    if (itemNoCarrinho) {
      setQuantidadeAction(pecaId, itemNoCarrinho.quantidade - 1);
      if (carrinhoItens.length === 1 && itemNoCarrinho.quantidade === 1) { 
         setCurrentPage(1);
      } else if (pecasExibidas.length === 1 && itemNoCarrinho.quantidade === 1 && currentPage > 1) {
         setCurrentPage(prev => prev - 1);
      }
    }
  };

  const handleUpdateQuantidade = (pecaId: number, qtd: number) => {
    const itemNoCarrinho = carrinhoItens.find((item) => item.idPeca === pecaId);
    if (itemNoCarrinho) {
      setQuantidadeAction(pecaId, qtd);
      if (qtd === 0) {
        if (carrinhoItens.length === 1 && itemNoCarrinho.quantidade === 1) {
            setCurrentPage(1);
        } else if (pecasExibidas.length === 1 && itemNoCarrinho.quantidade === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
      }
    }
  };

  if (errorProdutos) {
    return (
      <div
        className="container mb-4 pt-5"
        style={{ marginTop: "94px", minHeight: "600px" }}
      >
        <p className="h3 mb-4">Meu Carrinho</p>
        <p className="text-danger">
          Ocorreu um erro ao carregar os itens do carrinho. Por favor, tente
          novamente.
        </p>
        <Link className="btn btn-primary" to="/pecas">
          Voltar às Compras
        </Link>
      </div>
    );
  }

  if (carrinhoItens.length === 0) {
    return (
      <div
        className="container mb-4 pt-5"
        style={{ marginTop: "94px", minHeight: "600px" }}
      >
        <p className="h3 mb-4">Meu Carrinho</p>
        <div className="alert alert-info text-center" role="alert">
          Seu carrinho está vazio!
        </div>
        <Link className="btn btn-primary" to="/pecas">
          Voltar às Compras
        </Link>
      </div>
    );
  }

  if (carregandoProdutos) {
    return (
      <div
        className="container mb-4 pt-5"
        style={{ marginTop: "94px", minHeight: "600px" }}
      >
        <p className="h3 mb-4">Meu Carrinho</p>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p>Carregando itens do carrinho...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mb-4 pt-5"
      style={{ marginTop: "94px", minHeight: "600px" }}
    >
      <p className="h3 mb-4">
        Meu Carrinho ({totalItensNoCarrinhoFiltrados} itens)
      </p>

      {totalPaginas > 1 && (
        <Paginacao
          paginaAtual={currentPage}
          totalPaginas={totalPaginas}
          onChangePagina={setCurrentPage}
        />
      )}

      <TabelaDePecas
        pecas={pecasExibidas}
        pecasDoCarrinho={carrinhoItens}
        tratarRemocao={handleRemocaoPeca}
        onUpdateQuantidade={handleUpdateQuantidade}
      />
      <div className="d-flex mt-4 gap-3">
        <Link className="btn btn-secondary" to="/pecas">
          Voltar às Compras
        </Link>
        {totalItensNoCarrinhoFiltrados > 0 && (
          <>
            <button className="btn btn-primary" type="button">
              Fechar Compras
            </button>
            <button
              className="btn btn-danger ms-auto"
              type="button"
              onClick={limparCarrinhoAction}
            >
              Limpar Carrinho
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarrinhoPage;