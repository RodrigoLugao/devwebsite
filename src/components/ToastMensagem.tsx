interface ToastMensagemProps {
  onClose: () => void;
  nome: string;
  mensagem: string;
}

const ToastMensagem = ({ onClose, nome, mensagem }: ToastMensagemProps) => {
  return (
    <div
      className="toast-container"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        top: "94px",
        minHeight: "200px",
        zIndex: 1050,
        right: "20px",
      }}
    >
      <div
        className="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <header className="toast-header">
          <img
            src="assets/images/simasautologo.png"
            className="rounded mr-2"
            style={{ height: "20px" }}
            alt="Logo Simasauto"
          />
          <strong className="mr-auto">{nome}</strong>
          <small className="text-muted">Agora mesmo</small>
          <button
            type="button"
            className="ml-2 mb-1 close btn btn-link p-0"
            onClick={onClose}
            aria-label="Fechar"
            style={{ fontSize: "1.2rem", lineHeight: "1" }}
          >
            &times;
          </button>
        </header>
        <div className="toast-body">{mensagem}</div>
      </div>
    </div>
  );
};

export default ToastMensagem;
