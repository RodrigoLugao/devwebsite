// src/components/ListaVeiculos.tsx

import { useState, useEffect } from "react";
import useRecuperarVeiculosComPaginacao from "../hooks/veiculos/useRecuperarVeiculosComPaginacao";
import CardVeiculo from "./CardVeiculo";
import Paginacao from "./Paginacao";
import { FiltroVeiculo } from "../interfaces/FiltroVeiculo";
import { Pageable } from "../interfaces/Pageable";

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
    data: pageVeiculos,
    isPending: carregandoVeiculos,
    error: errorVeiculos,
  } = useRecuperarVeiculosComPaginacao(
    {itensPorPagina: pageable.itensPorPagina,
    ordem: pageable.ordem,
    ordenarPor: pageable.ordenarPor,
    pagina: pageForHook},
    filtro
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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

  if (!pageVeiculos || pageVeiculos.itens.length === 0) {
    return (
      <div className="alert alert-info text-center my-5" role="alert">
        Nenhum veículo encontrado para os critérios de busca.
      </div>
    );
  }

  const veiculosExibidos = pageVeiculos.itens;
  const totalPaginas = pageVeiculos.totalPaginas;

  const columnClasses = completo
    ? "col-lg-4 col-md-6 col-sm-6 col-12 mb-3"
    : "col-lg-3 col-md-4 col-sm-6 col-6 mb-3";

  return (
    <div className="mb-4">
      {titulo && <h4 className="mb-4">{titulo}</h4>}
      {mostrarPaginacao && totalPaginas > 1 && (
        <Paginacao
          paginaAtual={currentPage}
          totalPaginas={totalPaginas}
          onChangePagina={handlePageChange}
        />
      )}
      <div className="row mb-3">
        {veiculosExibidos.map((veiculo) => (
          <div key={veiculo.id} className={columnClasses}>
            <CardVeiculo veiculo={veiculo} completo={completo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaVeiculos;
