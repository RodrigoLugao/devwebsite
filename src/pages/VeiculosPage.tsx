import { useState } from "react";
import CardVeiculo from "../components/CardVeiculo";
import { veiculos } from "../util/Veiculos";
import BuscarVeiculoForm from "../components/BuscarVeiculoForm";
import Breadcrumbs from "../components/Breadcrumbs";
import ToastMensagem from "../components/ToastMensagem";
import Alerta from "../components/Alerta";
import Paginacao from "../components/Paginacao"; // <-- novo componente de paginação

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
    <div className="container">
      {showToast && (
        <ToastMensagem
          nome="Vendedor"
          mensagem="Em breve teremos mais informações do veículo"
          onClose={() => setShowToast(false)}
        />
      )}

      <main className="container-fluid mb-4 pt-3" style={{ marginTop: "94px" }}>
        {showAlert && (
          <Alerta tipo="success" onClose={() => setShowAlert(false)}>
            <strong>Promoções de motos!</strong> Busque modelos de motos em
            promoção na loja.
          </Alerta>
        )}

        <Breadcrumbs
          anteriores={[{ nome: "Início", link: "/" }]}
          atual={"Veículos"}
        />

        <p className="h3">Veículos</p>

        <div className="row mb-5">
          <aside className="col col-lg-4 col-md-6 col-sm-12 col-12">
            <BuscarVeiculoForm />
          </aside>

          <section className="col col-lg-8 col-md-6 col-sm-12 col-12">
            <strong>{veiculos.length} veículos encontrados</strong>

            <Paginacao
              paginaAtual={currentPage}
              totalPaginas={totalPaginas}
              onChangePagina={handlePageChange}
            />

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
    </div>
  );
};

export default VeiculosPage;
