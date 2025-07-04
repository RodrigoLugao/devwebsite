import { useState, useEffect } from "react";
import TabelaDePecas from "../components/TabelaDePecasDoCarrinho";
import Paginacao from "../components/Paginacao";
import { Link } from "react-router-dom";
import { useUsuarioStore } from "../store/usuarioStore";
import useDesfavoritarPeca from "../hooks/favoritarPecas/useDesfavoritarPeca";
import useRecuperarPecasFavoritasComPaginacao from "../hooks/pecas/useRecuperarPecasFavoritasComPaginacao";

const PecasFavoritasPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pecasPorPagina = 12;

  const { usuario } = useUsuarioStore();

  const {
    data: pagePecas,
    isLoading: carregandoPecas,
    error: errorProdutos,
  } = useRecuperarPecasFavoritasComPaginacao(usuario!.id, {
    pagina: currentPage - 1,
    itensPorPagina: pecasPorPagina,
  });

  const { mutate: desfavoritarPeca } =
    useDesfavoritarPeca();

  const totalPaginas = pagePecas ? pagePecas.totalPaginas : 0;
  const pecasExibidas = pagePecas ? pagePecas.itens : [];
  const totalItensFavoritos = pagePecas ? pagePecas.totalItens : 0;

  useEffect(() => {
    if (
      !carregandoPecas &&
      pecasExibidas.length === 0 &&
      currentPage > 1 &&
      totalItensFavoritos > 0
    ) {
      setCurrentPage((prev) => prev - 1);
    } else if (
      !carregandoPecas &&
      totalItensFavoritos === 0 &&
      currentPage !== 1
    ) {
      setCurrentPage(1);
    }
  }, [pecasExibidas, carregandoPecas, currentPage, totalItensFavoritos]);

  const handleDesfavoritarPeca = (pecaId: number) => {
    desfavoritarPeca(pecaId);
  };

  if (errorProdutos) {
    return (
      <div
        className="container mb-4 pt-5"
        style={{ marginTop: "94px", minHeight: "600px" }}
      >
        <p className="h3 mb-4">Peças Favoritas</p>
        <p className="text-danger">
          Ocorreu um erro ao carregar as peças favoritas. Por favor, tente
          novamente.
        </p>
        <Link className="btn btn-primary" to="/pecas">
          Voltar às Compras
        </Link>
      </div>
    );
  }

  if (!carregandoPecas && totalItensFavoritos === 0) {
    return (
      <div
        className="container mb-4 pt-5"
        style={{ marginTop: "94px", minHeight: "600px" }}
      >
        <p className="h3 mb-4">Peças Favoritas</p>
        <div className="alert alert-info text-center" role="alert">
          Você não possui nenhuma peça favorita no momento!
        </div>
        <Link className="btn btn-primary" to="/pecas">
          Voltar às Compras
        </Link>
      </div>
    );
  }

  if (carregandoPecas) {
    return (
      <div
        className="container mb-4 pt-5"
        style={{ marginTop: "94px", minHeight: "600px" }}
      >
        <p className="h3 mb-4">Peças Favoritas</p>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mb-4 pt-5"
      style={{ marginTop: "94px", minHeight: "600px" }}
    >
      <p className="h3 mb-4">Peças Favoritas ({totalItensFavoritos} itens)</p>

      {totalPaginas > 1 && (
        <Paginacao
          paginaAtual={currentPage}
          totalPaginas={totalPaginas}
          onChangePagina={setCurrentPage}
        />
      )}

      <TabelaDePecas
        pecas={pecasExibidas}
        showOnlyCartItems={false}
        showTotalPrice={false}
        tratarDesfavoritar={handleDesfavoritarPeca}
      />
      <div className="d-flex mt-4 gap-3">
        <Link className="btn btn-secondary" to="/pecas">
          Voltar às Compras
        </Link>
      </div>
    </div>
  );
};

export default PecasFavoritasPage;
