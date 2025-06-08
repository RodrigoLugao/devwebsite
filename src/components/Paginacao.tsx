interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onChangePagina: (pagina: number) => void;
}

const Paginacao = ({ paginaAtual, totalPaginas, onChangePagina }: PaginacaoProps) => {
  const gerarPaginas = () => {
    const pages: (number | "...")[] = [];

    if (totalPaginas <= 7) {
      // Poucas páginas, exibir todas
      for (let i = 1; i <= totalPaginas; i++) pages.push(i);
    } else {
      pages.push(1);

      if (paginaAtual > 4) pages.push("...");

      const start = Math.max(2, paginaAtual - 1);
      const end = Math.min(totalPaginas - 1, paginaAtual + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (paginaAtual < totalPaginas - 3) pages.push("...");

      pages.push(totalPaginas);
    }

    return pages;
  };

  const paginas = gerarPaginas();

  return (
    <nav aria-label="Navegação dos resultados da busca">
      <ul className="pagination">
        <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onChangePagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
        </li>

        {paginas.map((pagina, index) =>
          pagina === "..." ? (
            <li key={index} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li
              key={pagina}
              className={`page-item ${paginaAtual === pagina ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onChangePagina(pagina)}>
                {pagina}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${paginaAtual === totalPaginas ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onChangePagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacao;