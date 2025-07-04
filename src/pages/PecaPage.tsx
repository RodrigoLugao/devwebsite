import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import useRecuperarPecaPorId from "../hooks/pecas/useRecuperarPecaPorId";
import BotaoFavoritarPeca from "../components/BotaoFavoritarPeca";
import { useUsuarioStore } from "../store/usuarioStore";
import { useCarrinhoStore } from "../store/carrinhoStore";
import useRecuperarPecaFavoritaPorIds from "../hooks/favoritarPecas/useRecuperaPecaFavoritaPorIds";
import useRemoverPeca from "../hooks/pecas/useRemoverPeca";
import Peca from "../interfaces/Peca";
import CustomModal from "../components/CustomModal";

interface ModalState {
  show: boolean;
  peca: Peca | null;
}

const PecaPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate(); 

  const pecaId = id ? parseInt(id, 10) : undefined;

  const isAuthenticated = useUsuarioStore((state) => state.isAuthenticated);
  const isAdmin = useUsuarioStore((state) => state.isAdmin);
  const usuario = useUsuarioStore((state) => state.usuario);

  const {
    data: peca,
    isLoading,
    isError,
    error,
  } = useRecuperarPecaPorId(pecaId!);

  const [isImageLoading, setIsImageLoading] = useState(true);

  const imagemPadrao = new URL(
    "../assets/images/pecaplaceholder.jpg",
    import.meta.url
  ).href;

  const adicionarPecaAction = useCarrinhoStore((state) => state.adicionarItem);
  const subtrairPecaAction = useCarrinhoStore((state) => state.subtrairItem);
  const hasItemInCart = useCarrinhoStore((state) => state.hasItem(pecaId!));
  const quantidadeInCart = useCarrinhoStore((state) =>
    state.getQuantidade(pecaId!)
  );

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = imagemPadrao;
    setIsImageLoading(false);
  };

  const {
    data: pecaFavorita,
    isLoading: isLoadingPecaFavorita,
    isError: isErrorPecaFavorita,
  } = useRecuperarPecaFavoritaPorIds(usuario?.id, pecaId);

  useEffect(() => {
    setIsImageLoading(true);
  }, [pecaId]);


  const [modalState, setModalState] = useState<ModalState>({
    show: false,
    peca: null,
  });

  const {
    mutate: removerPecaMutation,
    error: apiError,
    isPending: isPendingRemover,
    isSuccess: isSuccessRemover,
    reset: resetRemoverMutation,
  } = useRemoverPeca();


  const openExcluirModal = () => {
    resetRemoverMutation();
    setModalState({ show: true, peca: peca || null }); 
  };

  const fecharModal = () => {
    setModalState({ show: false, peca: null });
    resetRemoverMutation(); 
  };


  const handleConfirmExcluirPeca = () => {
    if (modalState.peca && modalState.peca.id) {
      removerPecaMutation(modalState.peca);
    }
  };


  useEffect(() => {
    if (isSuccessRemover) {
      setTimeout(() => {
        navigate("/pecas"); 
      }, 1500); 
    }
  }, [isSuccessRemover, navigate]); 

  if (apiError) {
    return (
      <div className="container mt-5" style={{ marginTop: "94px" }}>
        <p className="text-danger text-center">
          Erro ao remover peça: {apiError.message || "Ocorreu um erro inesperado."}
        </p>
        <button className="btn btn-primary mt-3" onClick={resetRemoverMutation}>
          Tentar Novamente
        </button>
      </div>
    );
  }



  if (isLoading) {
    return (
      <div className="container mt-5 text-center" style={{ marginTop: "94px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando peça...</span>
        </div>
        <p className="mt-2">Carregando detalhes da peça...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mt-5" style={{ marginTop: "94px" }}>
        <p className="text-danger text-center">
          Erro ao carregar peça: {error?.toString()}
        </p>
        <p className="text-center">Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!peca) {
    return (
      <div className="container mt-5" style={{ marginTop: "94px" }}>
        <p className="text-center">Peça não encontrada.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mb-4" style={{ marginTop: "94px" }}>
        <div className="pt-5">
          <Breadcrumbs
            anteriores={[
              { nome: "Início", link: "/" },
              { nome: "Peças", link: "/pecas" },
              {
                nome: peca.categoriaPeca.nome,
                link: "/pecas/categoria/" + peca.categoriaPeca.slug,
              },
            ]}
            atual={peca.nome || "Detalhes da Peça"}
          />
        </div>
        <p className="mb-4 h3 position-relative">
          {peca?.nome}
          {isAdmin && (
            <div className="position-absolute top-0 end-0">
              <Link
                className="btn btn-secondary me-2"
                to={`/pecas/${peca.id}/editar`}
              >
                Alterar Informações da Peça
              </Link>
              <button
                className="btn btn-danger"
                onClick={openExcluirModal} 
              >
                Remover Peça
              </button>
            </div>
          )}
        </p>
        <div className="row">
          <div className="mb-3 col-md-6 col-12">
            <div className="position-relative">
              {isAuthenticated &&
                !isErrorPecaFavorita &&
                (isLoadingPecaFavorita ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <BotaoFavoritarPeca
                    isFavorito={!!pecaFavorita}
                    pecaId={peca.id!}
                  ></BotaoFavoritarPeca>
                ))}

              {isImageLoading && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    minHeight: "200px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                    borderRadius: "0.25rem",
                    aspectRatio: "1 / 1",
                  }}
                >
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                      Carregando imagem...
                    </span>
                  </div>
                </div>
              )}

              <img
                src={`${import.meta.env.BASE_URL}${peca.imagem}`}
                className={`card-img-top rounded ${
                  isImageLoading ? "d-none" : ""
                }`}
                alt={peca.nome}
                onError={handleImageError}
                onLoad={() => setIsImageLoading(false)}
                style={{
                  aspectRatio: "1 / 1",
                  objectFit: "contain",
                  display: isImageLoading ? "none" : "block",
                }}
              />
            </div>
          </div>
          <div className="col-md-6 col12">
            <p className="h4 mb-5">
              R${" "}
              {peca.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
            </p>
            <div className="mb-5">
              {peca.qtdEstoque > 0 ? (
                hasItemInCart ? (
                  <div>
                    <p className="muted">Quantidade no Carrinho:</p>
                    <div className="btn-group" style={{ width: "150px" }}>
                      <button
                        onClick={() => subtrairPecaAction(peca.id!)}
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
                        {quantidadeInCart}
                      </button>
                      <button
                        onClick={() => adicionarPecaAction(peca.id!)}
                        style={{ width: "32%" }}
                        type="button"
                        className="btn btn-primary btn-sm"
                      >
                        +
                      </button>
                    </div>
                    <p className="muted">
                      Total: R${" "}
                      {(peca.preco * quantidadeInCart).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                      })}
                    </p>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => adicionarPecaAction(peca.id!)}
                  >
                    Adicionar ao carrinho
                  </button>
                )
              ) : (
                <button className="btn btn-secondary btn-sm" disabled>
                  Produto Esgotado
                </button>
              )}
            </div>

            <strong>Informações da Peça:</strong>
            <br></br>
            {peca.descricao}
          </div>
        </div>
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
          <p>A peça foi removida com sucesso. Redirecionando...</p>
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

export default PecaPage;