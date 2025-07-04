import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import useRecuperarPecaPorId from "../hooks/pecas/useRecuperarPecaPorId";
import PecaForm from "../components/PecaForm";
import useAlterarPeca from "../hooks/pecas/useAlterarPeca";
import Peca from "../interfaces/Peca";

const EditarPecaPage = () => {
  const { id } = useParams<{ id?: string }>();

  const pecaId = id ? parseInt(id, 10) : undefined;

  const {
    data: peca,
    isLoading,
    isError,
    error,
  } = useRecuperarPecaPorId(pecaId!);

  const {
    mutate: editarPecaMutation,
    error: errorEditarPeca,
    isPending: isPendingEditar,
    isSuccess: isSuccessEditar,
    data: pecaEditada, 
  } = useAlterarPeca();

  const handleEditPeca = (pecaData: Peca) => {
    editarPecaMutation(pecaData);
  };

  if (errorEditarPeca) throw errorEditarPeca;

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
                nome: "ID: " + peca.id,
                link: "/pecas/" + peca.id,
              },
            ]}
            atual={"Editar"}
          />
        </div>
        <p className="h3 pt-3">Alterar Peça Id: {peca.id}</p>
        {/* Indicador de Carregamento */}
        {isPendingEditar && (
          <div className="alert alert-info text-center" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            Alterando peça... Por favor, aguarde.
          </div>
        )}

        {/* Mensagem de Sucesso */}
        {isSuccessEditar && pecaEditada && ( 
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Sucesso!</h4>
            <p>
              A peça "<strong>{pecaEditada.nome}</strong>" foi alterada com êxito!
            </p>
            <hr />
            <div className="d-flex justify-content-end gap-2"> 
              <Link to={`/pecas/${pecaEditada.id}`} className="btn btn-success"> 
                Visualizar Peça
              </Link>
              <Link to="/pecas" className="btn btn-outline-success"> 
                Ver Todas as Peças
              </Link>
            </div>
          </div>
        )}

        {!isSuccessEditar && (
          <PecaForm peca={peca} submitPeca={handleEditPeca}></PecaForm>
        )}
      </div>
    </>
  );
};

export default EditarPecaPage;
