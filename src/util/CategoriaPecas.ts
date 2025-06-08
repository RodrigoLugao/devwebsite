import CategoriaPeca from "../interfaces/CategoriaPeca";

export const CategoriaPecas: CategoriaPeca[] = [
    {
        id: 1,
        nome: "Motor e Transmissão",
        descricao: "Peças para o seu motor e a sua transmissão",
        imagem: "motor.jpg",
        slug: "motor-e-transmissao"
    },
    {
        id: 2,
        nome: "Sistema de Freios",
        descricao: "",
        imagem: "freios.jpg",
        slug: "sistema-de-freios"
    },
    {
        id: 3,
        nome: "Suspensão e Chassi",
        descricao: "",
        imagem: "chassi.jpg",
        slug: "suspensao-e-chassi"
    },
    {
        id: 4,
        nome: "Elétrica e Iluminação",
        descricao: "",
        imagem: "eletrica.jpg",
        slug: "eletrica-e-iluminacao"
    },
    {
        id: 5,
        nome: "Exaustão e Admissão",
        descricao: "",
        imagem: "exaustao.jpg",
        slug: "exaustao-e-admissao"
    },
    {
        id: 6,
        nome: "Carroceria e Acessórios",
        descricao: "",
        imagem: "acessorios.jpg",
        slug: "carroceria-e-acessorios"
    }
];

export default CategoriaPecas;