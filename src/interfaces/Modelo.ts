export enum Tipo{
    CARRO = "Carro",
    MOTO = "Moto"
}

interface Modelo {
    id: number;
    imagem: string;
    nome: string;
    fabricante: string;
    tipo: Tipo;
    ano: number;
    qtdEstoque: number;
    combustivel: string;
    cambio: string;
    motor: string;
}
export default Modelo;