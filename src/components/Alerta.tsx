import { ReactNode } from "react";

interface AlertaProps {
  onClose: () => void;
  tipo?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "light" | "dark";
  children: ReactNode;
}

const Alerta = ({ onClose, tipo = "success", children }: AlertaProps) => {
  return (
    <div className={`alert alert-${tipo} alert-dismissible fade show`} role="alert">
      {children}
      <button
        type="button"
        className="close btn btn-link p-0"
        onClick={onClose}
        aria-label="Fechar"
        style={{ fontSize: "1.5rem", lineHeight: "1", float: "right" }}
      >
        &times;
      </button>
    </div>
  );
};

export default Alerta;
