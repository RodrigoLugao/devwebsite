import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/simasautologo.png";
import { useCarrinhoStore } from "../store/carrinhoStore";
import { useUsuarioStore } from "../store/usuarioStore";
import useLogoutApi from "../hooks/auth/useLogoutApi";
import { useState } from "react";

const NavBar = () => {
  const carrinhoItens = useCarrinhoStore((state) => state.itens);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const nome = useUsuarioStore.getState().usuario?.nome;
  const isAuthenticated = useUsuarioStore((state) => state.isAuthenticated);
  const isAdmin = useUsuarioStore((state) => state.isAdmin);

  const { handleLogout, isLoggingOut, logoutError } = useLogoutApi();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
      navigate(`/veiculos?modelo=${encodedSearchTerm}`);
      setSearchTerm("");
    }
  };

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
          <li className="nav-item dropdown">
            {isAuthenticated && (
              <>
                <button
                  className="nav-link dropdown-toggle btn btn-link text-decoration-none"
                  id="pecasDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                >
                  Peças
                </button>
                <div className="dropdown-menu" aria-labelledby="pecasDropdown">
                  <Link className="dropdown-item" to="/pecas">
                    Todas as Peças
                  </Link>
                  {isAuthenticated && (
                    <Link className="dropdown-item" to="/pecas/favoritas">
                      Favoritas
                    </Link>
                  )}
                  {isAdmin && (
                    <Link className="dropdown-item" to="/pecas/criar">
                      Cadastrar Peça
                    </Link>
                  )}
                </div>
              </>
            )}
            {!isAuthenticated && (
              <NavLink className="nav-link" to="/pecas">
                Peças
              </NavLink>
            )}
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
              <Link className="dropdown-item" to="/revisao">
                Revisão
              </Link>
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
              <Link className="dropdown-item" to="/quem-somos">
                Quem Somos
              </Link>
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
          <li className="nav-item d-lg-none mt-3">
            {isAuthenticated ? (
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{ minWidth: "100px" }}
              >
                {isLoggingOut ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Logout"
                )}
              </button>
            ) : (
              <Link
                className="btn btn-outline-primary"
                to="/login"
                style={{ minWidth: "100px" }}
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        <div className="d-none d-lg-block mx-3 border-start border-secondary ps-3">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Busque veículos"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-success">
              Buscar
            </button>
          </form>
        </div>
        <div className="d-none d-lg-block border-start border-secondary ps-3">
          {isAuthenticated ? (
            <>
              <span className="text-light me-3">{nome?.split(' ', 1)[0]}</span>
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Logout"
                )}
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
      {logoutError && (
        <div className="alert alert-danger mt-3" role="alert">
          {logoutError}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
