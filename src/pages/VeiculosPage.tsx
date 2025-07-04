import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BuscarVeiculoForm from "../components/BuscarVeiculoForm";
import Breadcrumbs from "../components/Breadcrumbs";
import ToastMensagem from "../components/ToastMensagem";
import Alerta from "../components/Alerta";
import ListaVeiculos from "../components/ListaVeiculos";
import { FiltroVeiculo } from "../interfaces/FiltroVeiculo"; // Importe a interface FiltroVeiculo

const VeiculosPage = () => {
  const [searchParams] = useSearchParams();

  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  // Um único estado para todos os filtros de busca, usando a interface FiltroVeiculo
  const [filtrosBusca, setFiltrosBusca] = useState<FiltroVeiculo>({});

  // useEffect para carregar os parâmetros da URL no filtro inicial
  useEffect(() => {
    const newFiltros: FiltroVeiculo = {
      nomeModelo: searchParams.get("modelo") || undefined,
      // Você pode expandir isso para outros parâmetros da URL se necessário
      fabricante: searchParams.get("fabricante") || undefined,
      tipo: (searchParams.get("tipo") as any) || undefined, // Casting necessário se 'Tipo' for um enum
      anoMin: searchParams.get("anoMin") ? parseInt(searchParams.get("anoMin")!) : undefined,
      anoMax: searchParams.get("anoMax") ? parseInt(searchParams.get("anoMax")!) : undefined,
      precoMin: searchParams.get("precoMin") ? parseFloat(searchParams.get("precoMin")!) : undefined,
      precoMax: searchParams.get("precoMax") ? parseFloat(searchParams.get("precoMax")!) : undefined,
      kmsMin: searchParams.get("kmsMin") ? parseInt(searchParams.get("kmsMin")!) : undefined,
      kmsMax: searchParams.get("kmsMax") ? parseInt(searchParams.get("kmsMax")!) : undefined,
      cambio: searchParams.get("cambio") || undefined,
      cor: searchParams.get("cor") || undefined,
    };

    // Uma verificação mais robusta para evitar atualizações desnecessárias e loops
    const areFiltersEqual = Object.keys(newFiltros).every(key => 
      newFiltros[key as keyof FiltroVeiculo] === filtrosBusca[key as keyof FiltroVeiculo]
    ) && Object.keys(filtrosBusca).every(key => 
      newFiltros[key as keyof FiltroVeiculo] === filtrosBusca[key as keyof FiltroVeiculo]
    );

    if (!areFiltersEqual) {
      setFiltrosBusca(newFiltros);
    }
  }, [searchParams]); // Depende apenas de searchParams para reagir a mudanças na URL

  // A função handleSearch agora simplesmente atualiza o estado de filtrosBusca
  const handleSearch = (params: FiltroVeiculo) => {
    setFiltrosBusca(params);
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
            {/* Passa o objeto de filtro atual para o BuscarVeiculoForm */}
            <BuscarVeiculoForm onSearch={handleSearch} initialValues={filtrosBusca} />
          </aside>

          <section className="col col-lg-8 col-md-6 col-sm-12 col-12">
            <ListaVeiculos
              titulo=""
              pageable={{ itensPorPagina: 6, ordenarPor: "id", ordem: "ASC" }}
              mostrarPaginacao={true}
              completo={true}
              filtro={filtrosBusca}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default VeiculosPage;