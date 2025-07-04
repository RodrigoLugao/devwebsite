import { isRouteErrorResponse, useRouteError } from "react-router-dom"; // Importe useLocation
import NavBar from "../components/NavBar";
import isErrorResponse from "../util/isErrorResponse";

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage: string = "Ocorreu um erro desconhecido.";
  let errorDetails: { [key: string]: string } | null = null;
  let statusCode: number | null = null;
  let errorTitle: string = "Erro Inesperado";
  let requestInfo: string | null = null;
  
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorTitle = `Erro ${error.status} - ${error.statusText}`;
    errorMessage = error.data?.message || "A página que você está procurando não existe.";
    if (error.data?.error) {
        errorDetails = error.data.error;
    }
  } 

  else if (isErrorResponse(error)) {

    errorTitle = `Erro ${error.errorCode} - ${error.error || 'API Error'}`;
    errorMessage = error.message || "A requisição falhou.";
    statusCode = error.errorCode;
    errorDetails = error.map || null;
    requestInfo = `${error.metodo} ${error.requestUri}`;
  } 

  else if(error instanceof Error) {
    errorTitle = "Erro de Aplicação";
    errorMessage = error.message;
  } 

  else {
    errorMessage = "Erro desconhecido. Mensagem: " + String(error);
  }


  return (
    <>
      <NavBar />
      <div className="container" style={{marginTop: "104px"}}>
        <div className="card border-danger">
          <div className="card-header bg-danger text-white">
            <h4 className="mb-0">{errorTitle}</h4>
          </div>
          <div className="card-body">
            {statusCode && (
              <p className="card-text">
                <strong>Status da Requisição:</strong> <span className="badge bg-danger">{statusCode}</span>
              </p>
            )}
            {requestInfo && (
              <p className="card-text">
                <strong>Requisição:</strong> <code>{requestInfo}</code>
              </p>
            )}
            <p className="card-text">
              <strong>Mensagem:</strong> {errorMessage}
            </p>

            {errorDetails && Object.keys(errorDetails).length > 0 && (
              <>
                <p className="card-text mt-3">
                  <strong>Detalhes da Validação:</strong>
                </p>
                <ul className="list-group list-group-flush">
                  {Object.entries(errorDetails).map(([field, msg]) => (
                    <li key={field} className="list-group-item">
                      <strong>{field}:</strong> {msg}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <hr />
            <p className="text-muted small">
              Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.
            </p>
            <button className="btn btn-primary" onClick={() => window.history.back()}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;