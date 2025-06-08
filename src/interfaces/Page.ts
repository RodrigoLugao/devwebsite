interface Page<T> {
    totalItens: number,
    totalPaginas: number,
    paginaAtual: number,
    itens: T[]
};
export default Page;