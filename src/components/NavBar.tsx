import { NavLink } from "react-router-dom";
import logo from "../assets/images/simasautologo.png";
import { useCarrinhoStore } from "../store/carrinhoStore";

const NavBar = () => {
  const carrinhoItens = useCarrinhoStore((state) => state.itens);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} width="180" alt="Logo da concessionária Simas Auto" />
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Início
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/veiculos">
              Veículos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/pecas">
              Peças
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link text-decoration-none"
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
            >
              Serviços
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" to="/manutencao">
                Manutenção
              </NavLink>
              <NavLink className="dropdown-item" to="/revisao">
                Revisão
              </NavLink>
            </div>
          </li>
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link text-decoration-none"
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              type="button"
            >
              Sobre Nós
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" to="/quem-somos">
                Quem Somos
              </NavLink>
              <NavLink className="dropdown-item" to="/contato">
                Contato
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/carrinho">
              Carrinho{" "}
              {carrinhoItens !== null && carrinhoItens.length > 0 ? (
                <span
                  className="rounded-circle bg-white text-dark fw-bold d-inline-flex justify-content-center align-items-center"
                  style={{ width: "20px", height: "20px", fontSize: "0.75em" }}
                >
                  {carrinhoItens.length}
                </span>
              ) : (
                ""
              )}
            </NavLink>
          </li>
          <li className="nav-item d-md-none mt-3">
            <NavLink
              className="btn btn-outline-primary"
              to="/login"
              style={{ minWidth: "100px" }}
            >
              Login
            </NavLink>
          </li>
        </ul>

        {/* Separação visual e form de busca */}
        <div className="d-none d-md-block mx-3 border-start border-secondary ps-3">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Busque veículos"
              aria-label="Search"
            />
            <NavLink className="btn btn-outline-success" to="/busca">
              Buscar
            </NavLink>
          </form>
        </div>
        <div className="d-none d-md-block border-start border-secondary ps-3">
          <NavLink className="btn btn-outline-primary" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
