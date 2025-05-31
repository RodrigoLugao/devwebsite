import { Tipo } from "../interfaces/Modelo";
import Veiculo from "../interfaces/Veiculo";

export const veiculos: Veiculo[] = [
  {
    descricao: "O carro do Batman. Perfeito para lutar contra o crime.",
    id: 1,
    modelo: {
      nome: "Tumbler",
      id: 1,
      imagem: "fotos-em-breve.png",
      fabricante: "Wayne",
      tipo: Tipo.CARRO,
      ano: 2005,
      qtdEstoque: 1,
      combustivel: "Gasolina",
      cambio: "Automático",
      motor: "V8"
    },
    kmsRodados: 60000,
    codigo: "BATMO001",
    imagem: "https://m.media-amazon.com/images/I/61IsZo-irFL._AC_UF894,1000_QL80_.jpg",
    preco: 15000000
  },
  {
    descricao: "Luxo e sofisticação em um veículo de reis.",
    id: 2,
    modelo: {
      nome: "Regalia",
      id: 2,
      imagem: "fotos-em-breve.png",
      fabricante: "Lucis Motors",
      tipo: Tipo.CARRO,
      ano: 2016,
      qtdEstoque: 1,
      combustivel: "Gasolina",
      cambio: "Automático",
      motor: "V12"
    },
    kmsRodados: 20000,
    codigo: "FFX001",
    imagem: "https://cache-na.finalfantasy.com/uploads/content/file/2021/11/24/13834/211125_ddoff_1.png",
    preco: 2600000
  },
  {
    descricao: "De Volta para o Futuro com esse clássico.",
    id: 3,
    modelo: {
      nome: "DeLorean DMC-12",
      id: 3,
      imagem: "fotos-em-breve.png",
      fabricante: "DMC",
      tipo: Tipo.CARRO,
      ano: 1981,
      qtdEstoque: 1,
      combustivel: "Fluxo de Energia",
      cambio: "Manual",
      motor: "Elétrico 1.21GW"
    },
    kmsRodados: 88888,
    codigo: "DMC1981",
    imagem: "delorean.jpg",
    preco: 1000000
  },
  {
    descricao: "O clássico Muscle Car do filme Velozes e Furiosos.",
    id: 4,
    modelo: {
      nome: "Charger R/T",
      id: 4,
      imagem: "fotos-em-breve.png",
      fabricante: "Dodge",
      tipo: Tipo.CARRO,
      ano: 1970,
      qtdEstoque: 2,
      combustivel: "Gasolina",
      cambio: "Manual",
      motor: "V8 HEMI"
    },
    kmsRodados: 45000,
    codigo: "CHARGER70",
    imagem: "charger.jpg",
    preco: 800000
  },
  {
    descricao: "O carro do James Bond, sinônimo de elegância e poder.",
    id: 5,
    modelo: {
      nome: "DB5",
      id: 5,
      imagem: "fotos-em-breve.png",
      fabricante: "Aston Martin",
      tipo: Tipo.CARRO,
      ano: 1964,
      qtdEstoque: 1,
      combustivel: "Gasolina",
      cambio: "Manual",
      motor: "4.0L I6"
    },
    kmsRodados: 30000,
    codigo: "DB50064",
    imagem: "db5.jpg",
    preco: 4000000
  },
  {
    descricao: "A moto futurista de Tron Legacy.",
    id: 6,
    modelo: {
      nome: "Light Runner",
      id: 6,
      imagem: "fotos-em-breve.png",
      fabricante: "Encom Motors",
      tipo: Tipo.MOTO,
      ano: 2010,
      qtdEstoque: 1,
      combustivel: "Energia",
      cambio: "Automático",
      motor: "Plasma"
    },
    kmsRodados: 0,
    codigo: "TRON001",
    imagem: "lightcycle.jpg",
    preco: 5000000
  },
  {
    descricao: "A lenda dos muscle cars americanos.",
    id: 7,
    modelo: {
      nome: "Ford Mustang GT500",
      id: 7,
      imagem: "fotos-em-breve.png",
      fabricante: "Ford",
      tipo: Tipo.CARRO,
      ano: 1967,
      qtdEstoque: 2,
      combustivel: "Gasolina",
      cambio: "Manual",
      motor: "V8 7.0L"
    },
    kmsRodados: 60000,
    codigo: "MUST67",
    imagem: "fotos-em-breve.png",
    preco: 900000
  },
  {
    descricao: "A icônica Ferrari do filme Curtindo a Vida Adoidado.",
    id: 8,
    modelo: {
      nome: "250 GT California",
      id: 8,
      imagem: "fotos-em-breve.png",
      fabricante: "Ferrari",
      tipo: Tipo.CARRO,
      ano: 1961,
      qtdEstoque: 1,
      combustivel: "Gasolina",
      cambio: "Manual",
      motor: "V12 3.0L"
    },
    kmsRodados: 40000,
    codigo: "FERRARI61",
    imagem: "fotos-em-breve.png",
    preco: 12000000
  },
  {
    descricao: "O carro do vilão Max Zorin, de 007.",
    id: 9,
    modelo: {
      nome: "Silver Cloud II",
      id: 9,
      imagem: "fotos-em-breve.png",
      fabricante: "Rolls-Royce",
      tipo: Tipo.CARRO,
      ano: 1962,
      qtdEstoque: 1,
      combustivel: "Gasolina",
      cambio: "Automático",
      motor: "V8 6.2L"
    },
    kmsRodados: 50000,
    codigo: "ROLLS62",
    imagem: "fotos-em-breve.png",
    preco: 7000000
  },
  {
    descricao: "O carro da série K.I.T.T – Super Máquina.",
    id: 10,
    modelo: {
      nome: "Firebird Trans Am",
      id: 10,
      imagem: "fotos-em-breve.png",
      fabricante: "Pontiac",
      tipo: Tipo.CARRO,
      ano: 1982,
      qtdEstoque: 1,
      combustivel: "Gasolina",
      cambio: "Automático",
      motor: "V8 5.0L"
    },
    kmsRodados: 55000,
    codigo: "KITT82",
    imagem: "fotos-em-breve.png",
    preco: 1500000
  },

  // --- Novos veículos ---

  {
    descricao: "Uma moto clássica, perfeita para aventuras urbanas.",
    id: 11,
    modelo: {
      nome: "Iron 883",
      id: 11,
      imagem: "fotos-em-breve.png",
      fabricante: "Harley-Davidson",
      tipo: Tipo.MOTO,
      ano: 2020,
      qtdEstoque: 3,
      combustivel: "Gasolina",
      cambio: "Manual",
      motor: "883cc V-Twin"
    },
    kmsRodados: 5000,
    codigo: "HD88320",
    imagem: "fotos-em-breve.png",
    preco: 55000
  },
  {
    descricao: "Performance extrema para os apaixonados por velocidade.",
    id: 12,
    modelo: {
      nome: "Ninja ZX-10R",
      id: 12,
      imagem: "fotos-em-breve.png",
      fabricante: "Kawasaki",
      tipo: Tipo.MOTO,
      ano: 2023,
      qtdEstoque: 2,
      combustivel: "Gasolina",
      cambio: "Manual",
      motor: "998cc Inline-4"
    },
    kmsRodados: 1000,
    codigo: "KAWAZX10R23",
    imagem: "fotos-em-breve.png",
    preco: 95000
  },
  {
    descricao: "A lendária moto esportiva italiana.",
    id: 14,
    modelo: {
      nome: "Panigale V4",
      id: 14,
      imagem: "fotos-em-breve.png",
      fabricante: "Ducati",
      tipo: Tipo.MOTO,
      ano: 2023,
      qtdEstoque: 1,
      combustivel: "Gasolina",
      cambio: "Manual",
      motor: "1103cc V4"
    },
    kmsRodados: 300,
    codigo: "DUCAV423",
    imagem: "fotos-em-breve.png",
    preco: 130000
  },
];

export default veiculos;
