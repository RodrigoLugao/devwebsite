import CarouselBanner from "../components/CarouselBanner";
import ListaVeiculosInfinita from "../components/ListaVeiculosInfinita";

const HomePage = () => {
  return (
    <>
      <div className="w-100 mb-4" style={{ marginTop: "94px" }}>
        <CarouselBanner itensPorPagina={6} />
      </div>
      <div className="container mb-5">
        <ListaVeiculosInfinita
          titulo="Ofertas Recentes"
          pageable={{
            itensPorPagina: 8,
            ordenarPor: "dataCadastro",
            ordem: "DESC",
          }}
          mostrarPaginacao={false}
        />
      </div>
    </>
  );
};

export default HomePage;
