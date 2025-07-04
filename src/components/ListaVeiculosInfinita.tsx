// src/components/ListaVeiculos.tsx

import { useState, useEffect } from "react";
import CardVeiculo from "./CardVeiculo";
import { FiltroVeiculo } from "../interfaces/FiltroVeiculo";
import { Pageable } from "../interfaces/Pageable";
import useRecuperarVeiculosComPaginacaoInfiniteQuery from "../hooks/veiculos/useRecuperarVeiculosComPaginacaoInfiniteQuery";
import InfiniteScroll from "react-infinite-scroll-component";

interface ListaVeiculosProps {
  pageable: Pageable;
  mostrarPaginacao?: boolean;
  titulo?: string;
  completo?: boolean;

  filtro?: FiltroVeiculo;
}

const ListaVeiculos = ({
  pageable,
  mostrarPaginacao = false,
  titulo = "Nossos Veículos",
  completo = false,
  filtro = {},
}: ListaVeiculosProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtro]);

  const pageForHook = mostrarPaginacao ? currentPage - 1 : 0;

  const {
    data: veiculos,
    isPending: carregandoVeiculos,
    error: errorVeiculos,
    hasNextPage,
    fetchNextPage,
  } = useRecuperarVeiculosComPaginacaoInfiniteQuery(filtro, {
    itensPorPagina: pageable.itensPorPagina,
    ordem: pageable.ordem,
    ordenarPor: pageable.ordenarPor,
    pagina: pageForHook,
  });

  if (carregandoVeiculos) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando veículos...</p>
      </div>
    );
  }

  if (errorVeiculos) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        Erro ao carregar veículos: {errorVeiculos.message}. Por favor, tente
        novamente.
      </div>
    );
  }

  if (!veiculos || veiculos.length === 0) {
    return (
      <div className="alert alert-info text-center my-5" role="alert">
        Nenhum veículo encontrado para os critérios de busca.
      </div>
    );
  }

  const columnClasses = completo
    ? "col-lg-4 col-md-6 col-sm-6 col-12 mb-3"
    : "col-lg-3 col-md-4 col-sm-6 col-6 mb-3";

  return (
    <div className="mb-4">
      {titulo && <h4 className="mb-4">{titulo}</h4>}
      <InfiniteScroll
        style={{ overflowX: "hidden" }}
        dataLength={veiculos.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={
          <div className="text-center my-3">
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Carregando mais...</span>
            </div>
            <p className="mt-2">Carregando mais veículos...</p>
          </div>
        }
        endMessage={
          !hasNextPage &&
          veiculos.length > 0 && (
            <p className="text-center text-muted my-4">
              Você viu todos os {veiculos.length} veículos!
            </p>
          )
        }
      >
        <div className="row mb-3">
          {veiculos.map((veiculo) => (
            <div key={veiculo.id} className={columnClasses}>
              <CardVeiculo veiculo={veiculo} completo={completo} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ListaVeiculos;
