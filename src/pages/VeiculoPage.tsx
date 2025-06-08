import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import veiculos from "../util/Veiculos";
import CarouselPhotos from "../components/CarouselPhotos";
import Breadcrumbs from "../components/Breadcrumbs";

const VeiculoPage = () => {
  const { id, codigo } = useParams();

  const [veiculo, setVeiculo] = useState(() => {
    const idNumerico = id ? parseInt(id, 10) : null;
    return veiculos.find((v) => v.id === idNumerico || v.codigo === codigo);
  });

  useEffect(() => {
    const idNumerico = id ? parseInt(id, 10) : null;
    const novoVeiculo = veiculos.find(
      (v) => v.id === idNumerico || v.codigo === codigo
    );
    setVeiculo(novoVeiculo);
  }, [id, codigo]);

  if (!veiculo) return <p>Veículo não encontrado.</p>;

  const photos: string[] = [
    veiculo.imagem,
    new URL(`../assets/images/fotos-em-breve.png`, import.meta.url).href,
    new URL(`../assets/images/fotos-em-breve.png`, import.meta.url).href,
    new URL(`../assets/images/fotos-em-breve.png`, import.meta.url).href,
  ];

  return (
    <>
      <div className="mb-4" style={{ marginTop: "94px" }}>
        <CarouselPhotos imagens={photos} />
      </div>
      <div className="container mb-4">
        <Breadcrumbs anteriores={[{nome: "Início", link:"/"}, {nome: "Veículos", link:"/veiculos"}]} atual={veiculo.modelo.nome}></Breadcrumbs>
        <p className="mb-5 h3">
          {veiculo.modelo.fabricante}{" "}
          <span style={{ color: "red" }}>{veiculo.modelo.nome}</span>
        </p>
        <p className="text-muted">
          {veiculo.modelo.motor} {veiculo.modelo.cambio} {veiculo.modelo.ano}
        </p>
        <hr />
        <p className="h4 mb-5">
          R${" "}
          {veiculo.preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          })}
        </p>
        <div className="row mb-5">
          <div className="col">
            <p className="mb-0">
              <b>Ano</b>
            </p>
            <p>{veiculo.modelo.ano}</p>
          </div>
          <div className="col">
            <p className="mb-0">
              <b>Câmbio</b>
            </p>
            <p>{veiculo.modelo.cambio}</p>
          </div>
          <div className="col">
            <p className="mb-0">
              <b>Combustível</b>
            </p>
            <p>{veiculo.modelo.combustivel}</p>
          </div>
          <div className="col">
            <p className="mb-0">
              <b>Km</b>
            </p>
            <p>{veiculo.kmsRodados}</p>
          </div>
          <div className="col">
            <p className="mb-0">
              <b>Cor</b>
            </p>
            <p>{veiculo.cor}</p>
          </div>
        </div>
        <strong>Informações do Veículo:</strong>
        <br />
        Entrada a partir de R$10.000,00 (Dez mil reais).
        <br />
        Primeira parcela em até 90 dias.
        <br />
        Parcele a sua entrada no cartão de crédito.
        <br />
        Ofertas Exclusivas:
        <ul>
          <li>Financiamento em até 60 meses.</li>
          <li>Tanque cheio no momento da entrega.</li>
        </ul>
        Código: {veiculo.codigo}
        <br />
        Localização:
        <div className="card mt-5 mb-2">
          <div className="card-body">
            <h5 className="card-title">Características</h5>

            <span className="badge rounded-pill bg-secondary text-light">
              Comando de voz
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Manual embutido
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Scanner
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Assistente Virtual
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Vidros à prova de bala
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Opcionais</h5>

            <span className="badge rounded-pill bg-secondary text-light">
              Ar condicionado
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Sistema de alarme ultrassônico
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Desembaçador traseiro
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Travas com biometria
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Direção automática por IA
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Comunicação por Satélites
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Porta-copos com regulador de temperatura
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Insulfilm inteligente
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Toca-fitas
            </span>

            <span className="badge rounded-pill bg-secondary text-light">
              Dadinhos no retrovisor
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VeiculoPage;
