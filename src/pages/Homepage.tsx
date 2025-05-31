import { NavLink } from "react-router-dom";
import CarouselBanner from "../components/CarouselBanner";
import CardVeiculo from "../components/CardVeiculo";
import { veiculos } from "../util/Veiculos";
import { banners } from "../util/Banners";

const HomePage = () => {
  return (
    <>
      {/* Carrossel - largura total */}
      <div className="w-100 mb-4" style={{ marginTop: "94px" }}>
        <CarouselBanner banners={banners} />
      </div>

      {/* Ofertas Recentes */}
      <div className="container mb-4">
        <h4 className="mb-4">Ofertas Recentes</h4>
        <div className="row mb-3">
          {veiculos.slice(0,8).map((veiculo, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6 mb-3">
              <CardVeiculo veiculo={veiculo} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <NavLink to="/veiculos" className="btn btn-primary">
            Ver Mais Veículos
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default HomePage;
