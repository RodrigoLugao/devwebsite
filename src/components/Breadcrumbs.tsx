import { NavLink } from "react-router-dom";

type BreadcrumbsProps = {
  anteriores: { nome: string; link: string }[];
  atual: string;
};

const Breadcrumbs = ({ anteriores, atual }: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb p-2 rounded">
        {anteriores.map((anterior, index) => (
          <li className="breadcrumb-item" key={index}>
            <NavLink to={anterior.link}>{anterior.nome}</NavLink>
          </li>
        ))}
        <li className="breadcrumb-item active" aria-current="page">
          {atual}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
