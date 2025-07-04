/* import Peca from "../interfaces/Peca";

const pecas: Peca[] = [
  {
    id: 1,
    imagem: "motor1.jpg",
    nome: "Bloco do Motor V8",
    slug: "bloco-do-motor-v8",
    descricao: "Bloco de motor de alto desempenho.",
    disponivel: true,
    qtdEstoque: 5,
    preco: 4999.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 1,
      nome: "Motor e Transmissão",
      descricao: "Peças para o seu motor e a sua transmissão",
      imagem: "motor.jpg",
      slug: "motor-e-transmissao",
    },
  },
  {
    id: 2,
    imagem: "motor2.jpg",
    nome: "Embreagem Esportiva",
    slug: "embreagem-esportiva",
    descricao: "Embreagem de alta performance para trocas rápidas.",
    disponivel: true,
    qtdEstoque: 10,
    preco: 1299.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 1,
      nome: "Motor e Transmissão",
      descricao: "Peças para o seu motor e a sua transmissão",
      imagem: "motor.jpg",
      slug: "motor-e-transmissao",
    },
  },
  {
    id: 3,
    imagem: "freios1.jpg",
    nome: "Disco de Freio Ventilado",
    slug: "disco-de-freio-ventilado",
    descricao: "Disco de freio ventilado para melhor dissipação de calor.",
    disponivel: true,
    qtdEstoque: 20,
    preco: 349.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 2,
      nome: "Sistema de Freios",
      descricao: "",
      imagem: "freios.jpg",
      slug: "sistema-de-freios",
    },
  },
  {
    id: 4,
    imagem: "freios2.jpg",
    nome: "Pastilhas de Freio Cerâmicas",
    slug: "pastilhas-de-freio-ceramicas",
    descricao: "Pastilhas de freio para alta resistência e desempenho.",
    disponivel: true,
    qtdEstoque: 15,
    preco: 299.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 2,
      nome: "Sistema de Freios",
      descricao: "",
      imagem: "freios.jpg",
      slug: "sistema-de-freios",
    },
  },
  {
    id: 5,
    imagem: "chassi1.jpg",
    nome: "Amortecedor Esportivo",
    slug: "amortecedor-esportivo",
    descricao: "Amortecedor para melhor estabilidade em curvas.",
    disponivel: true,
    qtdEstoque: 12,
    preco: 799.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 3,
      nome: "Suspensão e Chassi",
      descricao: "",
      imagem: "chassi.jpg",
      slug: "suspensao-e-chassi",
    },
  },
  {
    id: 6,
    imagem: "chassi2.jpg",
    nome: "Molas Esportivas",
    slug: "molas-esportivas",
    descricao: "Molas reforçadas para maior controle de altura.",
    disponivel: true,
    qtdEstoque: 8,
    preco: 499.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 3,
      nome: "Suspensão e Chassi",
      descricao: "",
      imagem: "chassi.jpg",
      slug: "suspensao-e-chassi",
    },
  },
  {
    id: 7,
    imagem: "eletrica1.jpg",
    nome: "Bateria 70Ah",
    slug: "bateria-70ah",
    descricao: "Bateria de longa duração para sistemas eletrônicos.",
    disponivel: true,
    qtdEstoque: 10,
    preco: 699.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 4,
        nome: "Elétrica e Iluminação",
        descricao: "",
        imagem: "eletrica.jpg",
        slug: "eletrica-e-iluminacao"
    }
  },
  {
    id: 8,
    imagem: "eletrica2.jpg",
    nome: "Faróis LED Ultra Brilho",
    slug: "farois-led-ultra-brilho",
    descricao: "Faróis LED para melhor visibilidade noturna.",
    disponivel: true,
    qtdEstoque: 6,
    preco: 899.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 4,
        nome: "Elétrica e Iluminação",
        descricao: "",
        imagem: "eletrica.jpg",
        slug: "eletrica-e-iluminacao"
    }
  },
  {
    id: 9,
    imagem: "exaustao1.jpg",
    nome: "Filtro de Ar Esportivo",
    slug: "filtro-de-ar-esportivo",
    descricao: "Filtro de ar de alto fluxo para melhor desempenho.",
    disponivel: true,
    qtdEstoque: 15,
    preco: 249.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 5,
        nome: "Exaustão e Admissão",
        descricao: "",
        imagem: "exaustao.jpg",
        slug: "exaustao-e-admissao"
    },
  },
  {
    id: 10,
    imagem: "exaustao2.jpg",
    nome: "Escapamento Esportivo",
    slug: "escapamento-esportivo",
    descricao: "Sistema de escapamento para melhor potência e som.",
    disponivel: true,
    qtdEstoque: 5,
    preco: 1299.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 5,
        nome: "Exaustão e Admissão",
        descricao: "",
        imagem: "exaustao.jpg",
        slug: "exaustao-e-admissao"
    },
  },
  {
    id: 11,
    imagem: "acessorios1.jpg",
    nome: "Aerofólio Esportivo",
    slug: "aerofolio-esportivo",
    descricao: "Aerofólio para estabilidade em alta velocidade.",
    disponivel: true,
    qtdEstoque: 4,
    preco: 799.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 6,
        nome: "Carroceria e Acessórios",
        descricao: "",
        imagem: "acessorios.jpg",
        slug: "carroceria-e-acessorios"
    },
  },
  {
    id: 12,
    imagem: "acessorios2.jpg",
    nome: "Parachoque Dianteiro Personalizado",
    slug: "parachoque-dianteiro-personalizado",
    descricao: "Parachoque estilizado para melhor visual e aerodinâmica.",
    disponivel: true,
    qtdEstoque: 3,
    preco: 1499.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 6,
        nome: "Carroceria e Acessórios",
        descricao: "",
        imagem: "acessorios.jpg",
        slug: "carroceria-e-acessorios"
    },
  },
  {
    id: 13,
    imagem: "motor3.jpg",
    nome: "Turbo Compressor",
    slug: "turbo-compressor",
    descricao: "Aumenta a potência do motor com indução forçada.",
    disponivel: true,
    qtdEstoque: 7,
    preco: 3499.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 1,
      nome: "Motor e Transmissão",
      descricao: "Peças para o seu motor e a sua transmissão",
      imagem: "motor.jpg",
      slug: "motor-e-transmissao",
    },
  },
  {
    id: 14,
    imagem: "motor4.jpg",
    nome: "Radiador de Alto Fluxo",
    slug: "radiador-de-alto-fluxo",
    descricao: "Radiador reforçado para melhor resfriamento.",
    disponivel: true,
    qtdEstoque: 12,
    preco: 1199.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 1,
      nome: "Motor e Transmissão",
      descricao: "Peças para o seu motor e a sua transmissão",
      imagem: "motor.jpg",
      slug: "motor-e-transmissao",
    },
  },
  {
    id: 15,
    imagem: "freios3.jpg",
    nome: "Servo Freio",
    slug: "servo-freio",
    descricao: "Melhora a eficiência do sistema de frenagem.",
    disponivel: true,
    qtdEstoque: 8,
    preco: 799.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 2,
      nome: "Sistema de Freios",
      descricao: "",
      imagem: "freios.jpg",
      slug: "sistema-de-freios",
    },
  },
  {
    id: 16,
    imagem: "freios4.jpg",
    nome: "Pinça de Freio Esportiva",
    slug: "pinca-de-freio-esportiva",
    descricao: "Pinça de freio para performance avançada.",
    disponivel: true,
    qtdEstoque: 6,
    preco: 999.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 2,
      nome: "Sistema de Freios",
      descricao: "",
      imagem: "freios.jpg",
      slug: "sistema-de-freios",
    },
  },
  {
    id: 17,
    imagem: "chassi3.jpg",
    nome: "Braço de Controle Ajustável",
    slug: "braco-de-controle-ajustavel",
    descricao: "Melhora o alinhamento da suspensão.",
    disponivel: true,
    qtdEstoque: 10,
    preco: 599.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 3,
      nome: "Suspensão e Chassi",
      descricao: "",
      imagem: "chassi.jpg",
      slug: "suspensao-e-chassi",
    },
  },
  {
    id: 18,
    imagem: "chassi4.jpg",
    nome: "Barra Estabilizadora",
    slug: "barra-estabilizadora",
    descricao: "Reduz a rolagem da carroceria em curvas.",
    disponivel: true,
    qtdEstoque: 9,
    preco: 499.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 3,
      nome: "Suspensão e Chassi",
      descricao: "",
      imagem: "chassi.jpg",
      slug: "suspensao-e-chassi",
    },
  },
  {
    id: 19,
    imagem: "eletrica3.jpg",
    nome: "Alternador de Alta Potência",
    slug: "alternador-de-alta-potencia",
    descricao: "Alternador reforçado para maior eficiência.",
    disponivel: true,
    qtdEstoque: 5,
    preco: 899.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 4,
        nome: "Elétrica e Iluminação",
        descricao: "",
        imagem: "eletrica.jpg",
        slug: "eletrica-e-iluminacao"
    }
  },
  {
    id: 20,
    imagem: "eletrica4.jpg",
    nome: "Módulo de Ignição Eletrônica",
    slug: "modulo-de-ignicao-eletronica",
    descricao: "Sistema digital para ignição mais precisa.",
    disponivel: true,
    qtdEstoque: 6,
    preco: 499.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 4,
        nome: "Elétrica e Iluminação",
        descricao: "",
        imagem: "eletrica.jpg",
        slug: "eletrica-e-iluminacao"
    }
  },
  {
    id: 21,
    imagem: "exaustao3.jpg",
    nome: "Coletor de Escape Inox",
    slug: "coletor-de-escape-inox",
    descricao: "Melhora a saída de gases do motor.",
    disponivel: true,
    qtdEstoque: 7,
    preco: 1599.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 5,
        nome: "Exaustão e Admissão",
        descricao: "",
        imagem: "exaustao.jpg",
        slug: "exaustao-e-admissao"
    },
  },
  {
    id: 22,
    imagem: "exaustao4.jpg",
    nome: "Filtro de Combustível de Alto Fluxo",
    slug: "filtro-de-combustivel-de-alto-fluxo",
    descricao: "Garante combustível limpo e eficiente.",
    disponivel: true,
    qtdEstoque: 8,
    preco: 299.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 5,
        nome: "Exaustão e Admissão",
        descricao: "",
        imagem: "exaustao.jpg",
        slug: "exaustao-e-admissao"
    },
  },
  {
    id: 23,
    imagem: "acessorios3.jpg",
    nome: "Spoiler Dianteiro",
    slug: "spoiler-dianteiro",
    descricao: "Melhora a aerodinâmica e visual.",
    disponivel: true,
    qtdEstoque: 4,
    preco: 999.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 6,
        nome: "Carroceria e Acessórios",
        descricao: "",
        imagem: "acessorios.jpg",
        slug: "carroceria-e-acessorios"
    },
  },
  {
    id: 24,
    imagem: "acessorios4.jpg",
    nome: "Capô em Fibra de Carbono",
    slug: "capo-em-fibra-de-carbono",
    descricao: "Leve e resistente para melhor desempenho.",
    disponivel: true,
    qtdEstoque: 3,
    preco: 2499.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 6,
        nome: "Carroceria e Acessórios",
        descricao: "",
        imagem: "acessorios.jpg",
        slug: "carroceria-e-acessorios"
    },
  },
  {
    id: 25,
    imagem: "motor5.jpg",
    nome: "Correia Dentada Reforçada",
    slug: "correia-dentada-reforcada",
    descricao: "Material durável para maior vida útil.",
    disponivel: true,
    qtdEstoque: 7,
    preco: 349.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 1,
      nome: "Motor e Transmissão",
      descricao: "Peças para o seu motor e a sua transmissão",
      imagem: "motor.jpg",
      slug: "motor-e-transmissao",
    },
  },
  {
    id: 26,
    imagem: "freios5.jpg",
    nome: "Reservatório de Fluido de Freio",
    slug: "reservatorio-de-fluido-de-freio",
    descricao: "Garantia de eficiência no sistema hidráulico.",
    disponivel: true,
    qtdEstoque: 9,
    preco: 199.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 2,
      nome: "Sistema de Freios",
      descricao: "",
      imagem: "freios.jpg",
      slug: "sistema-de-freios",
    },
  },
  {
    id: 27,
    imagem: "chassi5.jpg",
    nome: "Kit de Levantamento de Suspensão",
    slug: "kit-de-levantamento-de-suspencao",
    descricao: "Ideal para off-road e terrenos acidentados.",
    disponivel: true,
    qtdEstoque: 4,
    preco: 1599.99,
    dataCadastro: new Date(),
    categoriaPeca: {
      id: 3,
      nome: "Suspensão e Chassi",
      descricao: "",
      imagem: "chassi.jpg",
      slug: "suspensao-e-chassi",
    },
  },
  {
    id: 28,
    imagem: "eletrica5.jpg",
    nome: "Sistema de Som Automotivo",
    slug: "sistema-de-som-automotivo",
    descricao: "Audio de alta qualidade para veículos.",
    disponivel: true,
    qtdEstoque: 5,
    preco: 2499.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 4,
        nome: "Elétrica e Iluminação",
        descricao: "",
        imagem: "eletrica.jpg",
        slug: "eletrica-e-iluminacao"
    }
  },
  {
    id: 29,
    imagem: "exaustao5.jpg",
    nome: "Kit de Admissão Direta",
    slug: "kit-de-admissao-direta",
    descricao: "Melhora fluxo de ar para potência máxima.",
    disponivel: true,
    qtdEstoque: 6,
    preco: 899.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 5,
        nome: "Exaustão e Admissão",
        descricao: "",
        imagem: "exaustao.jpg",
        slug: "exaustao-e-admissao"
    },
  },
  {
    id: 30,
    imagem: "acessorios5.jpg",
    nome: "Jogo de Rodas Esportivas",
    slug: "jogo-de-rodas-esportivas",
    descricao: "Rodas leves e resistentes para performance.",
    disponivel: true,
    qtdEstoque: 5,
    preco: 3999.99,
    dataCadastro: new Date(),
    categoriaPeca: {
        id: 6,
        nome: "Carroceria e Acessórios",
        descricao: "",
        imagem: "acessorios.jpg",
        slug: "carroceria-e-acessorios"
    },
  },
];

export default pecas;
 */