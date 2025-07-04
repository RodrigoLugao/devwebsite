import { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  title: ReactNode; 
  children: ReactNode;
  footer: ReactNode; 
  onClose: () => void;
}

const CustomModal = ({ show, title, children, footer, onClose }: ModalProps) => {
  if (!show) {
    return null; // Não renderiza nada se o modal não deve ser exibido
  }

  return (
    <div
      className="modal show fade d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose} // Fecha o modal ao clicar fora
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche-o
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Fechar"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {children} {/* Aqui entra o conteúdo do corpo passado como children */}
          </div>
          <div className="modal-footer">
            {footer} {/* Aqui entram os botões e outros elementos do rodapé */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;