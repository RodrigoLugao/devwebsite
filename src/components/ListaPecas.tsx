import { useEffect, useState } from "react";
import Paginacao from "./Paginacao";
import CardPeca from "./CardPeca";
import { useParams } from "react-router-dom";
import useRecuperarPecasPorSlugCategoriaComPaginacao from "../hooks/pecas/useRecuperarPecasPorSlugCategoriaComPaginacao";
import Peca from "../interfaces/Peca";

import { useCarrinhoStore } from "../store/carrinhoStore";
import { useUsuarioStore } from "../store/usuarioStore";
import { PecaFavoritaPayloadDTO } from "../interfaces/dtos/PecaFavoritaPayloadDTO";
import useRecuperarPecasFavoritasDTO from "../hooks/favoritarPecas/useRecuperarPecasFavoritasDTOPorUsuario";
import useRemoverPeca from "../hooks/pecas/useRemoverPeca";
import CustomModal from "./CustomModal";

interface ModalState {
  show: boolean;
  peca: Peca | null;
}

const ListaPecas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { slugCategoria } = useParams<{ slugCategoria?: string }>();
  const pecasPorPagina = 6;

  const isAuthenticated = useUsuarioStore((state) => state.isAuthenticated);
  const isAdmin = useUsuarioStore((state) => state.isAdmin);
  const { usuario } = useUsuarioStore.getState();

  const carrinho = useCarrinhoStore((state) => state.itens);
  const adicionarPecaAction = useCarrinhoStore((state) => state.adicionarItem);
  const removerPecaAction = useCarrinhoStore((state) => state.subtrairItem);

  const {
    data: pecasFavoritas,
    isLoading: isLoadingPecasFavoritas,
    error: errorPecasFavoritas,
  } = useRecuperarPecasFavoritasDTO(usuario ? usuario.id! : undefined);

  const [modalState, setModalState] = useState<ModalState>({
    show: false,
    peca: null,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [slugCategoria]);

  const adicionarPeca = (peca: Peca) => {
    if (peca.id) {
      adicionarPecaAction(peca.id);
    }
  };

  const subtrairPeca = (peca: Peca) => {
    if (peca.id) {
      removerPecaAction(peca.id);
    }
  };

  const openExcluirModal = (peca: Peca) => {
    resetRemoverMutation();
    setModalState({ show: true, peca: peca });
  };

  const fecharModal = () => {
    resetRemoverMutation();
    setModalState({ show: false, peca: null });
  };

  const {
    mutate: removerPecaMutation,
    error: apiError,
    isPending: isPendingRemover,
    isSuccess: isSuccessRemover,
    reset: resetRemoverMutation,
  } = useRemoverPeca();

  const handleConfirmExcluirPeca = () => {
    if (modalState.peca) {
      removerPecaMutation(modalState.peca);
    }
  };

  if (apiError) {
    return (
      <div className="row mb-5">
        <p className="text-danger text-center">
          Erro ao remover peça:{" "}
          {apiError.message || "Ocorreu um erro inesperado."}
        </p>
        <button className="btn btn-primary mt-3" onClick={resetRemoverMutation}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  const {
    data: pagePecas,
    isPending: carregandoPecas,
    error: errorPecas,
  } = useRecuperarPecasPorSlugCategoriaComPaginacao(
    { itensPorPagina: pecasPorPagina, pagina: currentPage - 1 },
    slugCategoria
  );

  if (carregandoPecas) {
    return (
      <div className="row mb-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando peças...</span>
        </div>
        <p className="mt-2">Carregando peças...</p>
      </div>
    );
  }

  if (errorPecas) {
    return (
      <div className="row mb-5">
        <p className="text-danger text-center">
          Erro ao carregar peças: {errorPecas.message}. Por favor, tente
          novamente.
        </p>
      </div>
    );
  }

  if (!pagePecas || pagePecas.itens.length === 0) {
    return (
      <div className="row mb-5">
        <p className="text-center">
          Nenhuma peça encontrada para esta categoria ou critérios.
        </p>
      </div>
    );
  }

  const totalPaginas = pagePecas.totalPaginas;
  const pecasExibidas = pagePecas.itens;

  return (
    <>
      <div className="row mb-5">
        <strong>{pagePecas.totalItens} peças encontradas</strong>

        <Paginacao
          paginaAtual={currentPage}
          totalPaginas={totalPaginas}
          onChangePagina={setCurrentPage}
        />

        {pecasExibidas.map((peca, i) => {
          try {
            const pecaNoCarrinho =
              carrinho.find((item) => item.idPeca === peca.id) || null;

            const isFavorito =
              pecasFavoritas?.some(
                (favPeca: PecaFavoritaPayloadDTO) => favPeca.pecaId === peca.id
              ) || false;

            return (
              <div
                key={peca.id}
                className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3"
              >
                <CardPeca
                  peca={peca}
                  adicionarPeca={adicionarPeca}
                  showFavorito={isAuthenticated && !errorPecasFavoritas}
                  isFavorito={isFavorito}
                  isAdmin={isAdmin}
                  subtrairPeca={subtrairPeca}
                  pecaNoCarrinho={pecaNoCarrinho}
                  isCarregando={isLoadingPecasFavoritas}
                  excluirPeca={openExcluirModal}
                />
              </div>
            );
          } catch (error) {
            console.error(
              `Erro ao renderizar peça no índice ${i}`,
              peca,
              error
            );
            return null;
          }
        })}
      </div>

      <CustomModal
        show={modalState.show}
        onClose={fecharModal}
        title={
          isSuccessRemover
            ? "Peça Removida com Sucesso!"
            : "Deseja mesmo excluir essa peça?"
        }
        footer={
          !isSuccessRemover ? (
            isPendingRemover ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <>
                <button className="btn btn-primary" onClick={fecharModal}>
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmExcluirPeca}
                  disabled={isPendingRemover}
                >
                  Excluir Peça
                </button>
              </>
            )
          ) : (
            <button className="btn btn-primary" onClick={fecharModal}>
              Ok
            </button>
          )
        }
      >
        {/* Corpo do modal, passado como children */}
        {isSuccessRemover ? (
          <p>A peça foi removida com sucesso.</p>
        ) : (
          <>
            {modalState.peca ? (
              <>
                Id da peça: {modalState.peca.id} <br />
                Nome da peça: {modalState.peca.nome}
              </>
            ) : (
              <p>Detalhes da peça não disponíveis.</p>
            )}
          </>
        )}
      </CustomModal>
    </>
  );
};

export default ListaPecas;
