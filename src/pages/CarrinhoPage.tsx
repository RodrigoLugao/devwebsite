import { useState, useEffect } from "react";
import TabelaDePecasDoCarrinho from "../components/TabelaDePecasDoCarrinho";
import { useCarrinhoStore } from "../store/carrinhoStore";
import Paginacao from "../components/Paginacao";
import useRecuperarPecasPorIdsComPaginacao from "../hooks/pecas/useRecuperarPecasPorIdsComPaginacao";
import { Link } from "react-router-dom";

const CarrinhoPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pecasPorPagina = 12;

  const carrinhoItens = useCarrinhoStore((state) => state.itens);
  const limparCarrinhoAction = useCarrinhoStore(
    (state) => state.limparCarrinho
  );

  const idsDoCarrinho = carrinhoItens.map((item) => item.idPeca);

  const {
    data: pagePecas,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useRecuperarPecasPorIdsComPaginacao(idsDoCarrinho, {
    itensPorPagina: pecasPorPagina,
    pagina: currentPage - 1,
  });

  const totalPaginas = pagePecas?.totalPaginas ?? 0;
  const pecasExibidas = pagePecas?.itens ?? [];
  const totalItensNoCarrinhoFiltrados = pagePecas?.totalItens ?? 0;

  useEffect(() => {
    if (currentPage > totalPaginas && currentPage > 1) {
      setCurrentPage(totalPaginas);
    } else if (carrinhoItens.length === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPaginas, currentPage, carrinhoItens.length]);

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

      {pecasExibidas.length === 0 && totalItensNoCarrinhoFiltrados > 0 && !carregandoProdutos ? (
        <div className="alert alert-warning text-center" role="alert">
          Nenhum item para exibir na página atual. Por favor, ajuste a página.
        </div>
      ) : (
        <TabelaDePecasDoCarrinho
          pecas={pecasExibidas} 
          showTotalPrice={true} 
          showOnlyCartItems={true} 
        >
        </TabelaDePecasDoCarrinho>
      )}

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