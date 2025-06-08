import CategoriaPeca from "../interfaces/CategoriaPeca";
import { forwardRef } from "react";

interface Props {
  categoriaPeca: CategoriaPeca;
  isSelected?: boolean;
  onClick?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const CardCategoriaPeca = forwardRef<HTMLDivElement, Props>(
  ({ categoriaPeca, isSelected, onClick, onFocus, onKeyDown }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        tabIndex={0}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={`col-6 col-md-3 d-flex flex-column align-items-center justify-content-center card-categoria-peca`}
        style={{ width: "200px", height: "220px", cursor: "pointer" }}
      >
        <div className={`rounded shadow bg-white text-center d-flex align-items-center justify-content-center mb-3 p-1 border  ${isSelected ? "border-primary border-3" : "border-0"}`} style={{ width: "128px", height: "128px" }}>
          <img src={categoriaPeca.imagem} alt={categoriaPeca.nome} className="w-100" />
        </div>
        <span className="text-center lh-sm">{categoriaPeca.nome}</span>
      </div>
    );
  }
);

export default CardCategoriaPeca;
