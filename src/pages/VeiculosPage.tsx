import { useState } from "react";
import { NavLink } from "react-router-dom";
import CardVeiculo from "../components/CardVeiculo";
import { veiculos } from "../util/Veiculos";

const VeiculosPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const veiculosPorPagina = 6;
  const totalPaginas = Math.ceil(veiculos.length / veiculosPorPagina);

  const indiceInicial = (currentPage - 1) * veiculosPorPagina;
  const indiceFinal = indiceInicial + veiculosPorPagina;

  const veiculosExibidos = veiculos.slice(indiceInicial, indiceFinal);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {showToast && (
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
            id="myToast"
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ display: "block" }}
          >
            <header className="toast-header">
              <img
                src="assets/images/simasautologo.png"
                className="rounded mr-2"
                style={{ height: "20px" }}
                alt="Logo Simasauto"
              />
              <strong className="mr-auto">Vendedor</strong>
              <small className="text-muted">Agora mesmo</small>
              <button
                type="button"
                className="ml-2 mb-1 close btn btn-link p-0"
                onClick={() => setShowToast(false)}
                aria-label="Fechar"
                style={{ fontSize: "1.2rem", lineHeight: "1" }}
              >
                &times;
              </button>
            </header>
            <div className="toast-body">
              Em breve teremos mais informações do veículo
            </div>
          </div>
        </div>
      )}

      <main className="container-fluid mb-4 pt-3" style={{ marginTop: "94px" }}>
        {showAlert && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Promoções de motos!</strong> Busque modelos de motos em
            promoção na loja.
            <button
              type="button"
              className="close btn btn-link p-0"
              onClick={() => setShowAlert(false)}
              aria-label="Fechar"
              style={{ fontSize: "1.5rem", lineHeight: "1", float: "right" }}
            >
              &times;
            </button>
          </div>
        )}

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb p-2 rounded">
            <li className="breadcrumb-item">
              <NavLink to="/">Início</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Veículos
            </li>
          </ol>
        </nav>

        <div className="row mb-5">
          <aside className="col col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="nomeDoModelo">Modelo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nomeDoModelo"
                      aria-describedby="modeloHelp"
                    />
                    <small id="modeloHelp" className="form-text text-muted">
                      Insira o nome do modelo que deseja buscar
                    </small>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="nomeDaMontadora">Fabricante</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nomeDaMontadora"
                      aria-describedby="fabricanteHelp"
                    />
                    <small id="fabricanteHelp" className="form-text text-muted">
                      Insira o nome da fabricante que deseja buscar
                    </small>
                  </div>

                  <fieldset className="form-group mb-3">
                    <legend className="col-form-label pt-0">
                      Tipo de veículos
                    </legend>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        name="inlineRadioOptions"
                        type="radio"
                        id="carro"
                        value="1"
                      />
                      <label className="form-check-label" htmlFor="carro">
                        Carros
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        name="inlineRadioOptions"
                        type="radio"
                        id="moto"
                        value="2"
                      />
                      <label className="form-check-label" htmlFor="moto">
                        Motos
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        name="inlineRadioOptions"
                        type="radio"
                        id="ambos"
                        value="3"
                      />
                      <label className="form-check-label" htmlFor="ambos">
                        Ambos
                      </label>
                    </div>
                  </fieldset>
                  <button type="submit" className="btn btn-primary">
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </aside>

          <section className="col col-lg-8 col-md-6 col-sm-12 col-12">
            <strong>{veiculos.length} veículos encontrados</strong>

            <nav aria-label="Navegação dos resultados da busca de veículos">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                </li>

                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    currentPage === totalPaginas ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPaginas}
                  >
                    Próximo
                  </button>
                </li>
              </ul>
            </nav>

            <div className="row mb-3">
              {veiculosExibidos.map((veiculo, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3"
                >
                  <CardVeiculo veiculo={veiculo} completo={true} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default VeiculosPage;
