import CategoriaPeca from "./CategoriaPeca";

interface Peca{
    id?: number;
    imagem?: string;
    nome: string;
    slug: string;
    descricao: string;
    disponivel: boolean;
    qtdEstoque: number;
    preco: number;
    dataCadastro: Date | null;
    categoriaPeca: CategoriaPeca;
}
export default Peca;