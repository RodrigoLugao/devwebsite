import { NavLink, useNavigate } from "react-router-dom"; // Apenas NavLink e useNavigate

type BreadcrumbsProps = {
  anteriores: { nome: string; link: string }[];
  atual: string;
};

const Breadcrumbs = ({ anteriores, atual }: BreadcrumbsProps) => {
  const navigate = useNavigate(); // Hook para navegação programática

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    navigate(-1); // Navega para a página anterior no histórico
  };

  return (
    <nav aria-label="breadcrumb" className="mb-3"> {/* Adiciona margem inferior à nav */}
      <ol className="breadcrumb p-2 rounded d-flex align-items-center"> {/* Adicionado d-flex e align-items-center */}
        {anteriores.map((anterior, index) => (
          <li className="breadcrumb-item" key={index}>
            <NavLink to={anterior.link}>{anterior.nome}</NavLink>
          </li>
        ))}
        {/* Item breadcrumb para a página atual, geralmente sem link */}
        <li className="breadcrumb-item active" aria-current="page">
          {atual}
        </li>
        {/* Novo item breadcrumb para o botão "Voltar" */}
        <span className="breadcrumb-item ms-auto"> {/* ms-auto empurra este item para a direita */}
          <NavLink
            to="#" // Define um href, mas a navegação é tratada pelo onClick
            onClick={handleGoBack}
            className="text-decoration-none d-flex align-items-center" // Remove sublinhado e alinha ícone/texto
          >
          
            Voltar
          </NavLink>
        </span>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;