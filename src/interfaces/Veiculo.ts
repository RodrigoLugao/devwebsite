import Modelo from "./Modelo";

interface Veiculo{
    id?: number;
    modelo: Modelo;
    kmsRodados: number;
    descricao: string;
    codigo: string;
    imagem: string;
    preco: number;
    cor?: string;
    vendido: boolean;
    informacoes?: string;
}
export default Veiculo;