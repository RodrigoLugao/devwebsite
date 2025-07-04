import Breadcrumbs from "../components/Breadcrumbs";
import PecaForm from "../components/PecaForm";
import useCadastrarPeca from "../hooks/pecas/useCadastrarPeca";
import { Link } from "react-router-dom";
import Peca from "../interfaces/Peca";

const CriarPecaPage = () => {
  const {
    mutate: cadastrarPecaMutation,
    error: errorCadastrarPeca,
    isPending: isPendingCadastrar,
    isSuccess: isSuccessCadastrar,
    data: novaPecaCriada, 
  } = useCadastrarPeca();

  const handleSavePeca = (pecaData: Peca) => {
    cadastrarPecaMutation(pecaData);
  };

  if (errorCadastrarPeca) throw errorCadastrarPeca;

  return (
    <>
      <div className="container mb-4" style={{ marginTop: "94px" }}>
        <div className="pt-5">
          <Breadcrumbs
            anteriores={[
              { nome: "Início", link: "/" },
              { nome: "Peças", link: "/pecas" },
            ]}
            atual={"Nova Peça"}
          />
        </div>
        <p className="h3 pt-3">Cadastrar Peça</p>

        {/* Indicador de Carregamento */}
        {isPendingCadastrar && (
          <div className="alert alert-info text-center" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            Cadastrando peça... Por favor, aguarde.
          </div>
        )}

        {/* Mensagem de Sucesso */}
        {isSuccessCadastrar && novaPecaCriada && ( 
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Sucesso!</h4>
            <p>
              A peça "<strong>{novaPecaCriada.nome}</strong>" foi cadastrada com êxito!
              Seu ID é: <strong>{novaPecaCriada.id}</strong>.
            </p>
            <hr />
            <div className="d-flex justify-content-end gap-2"> 
              <Link to={`/pecas/${novaPecaCriada.id}`} className="btn btn-success"> 
                Visualizar Peça
              </Link>
              <Link to="/pecas" className="btn btn-outline-success"> 
                Ver Todas as Peças
              </Link>
            </div>
          </div>
        )}

        {!isSuccessCadastrar && (
          <PecaForm submitPeca={handleSavePeca}></PecaForm>
        )}
      </div>
    </>
  );
};

export default CriarPecaPage;