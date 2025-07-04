import { useParams } from "react-router-dom";
import CarouselPhotos from "../components/CarouselPhotos";
import Breadcrumbs from "../components/Breadcrumbs";

import useRecuperarVeiculoPorId from "../hooks/veiculos/useRecuperarVeiculoPorId";
import useRecuperarVeiculoPorCodigo from "../hooks/veiculos/useRecuperarVeiculoPorCodigo";

const VeiculoPage = () => {
  const { id, codigo } = useParams<{ id?: string; codigo?: string }>();

  const veiculoId = id ? parseInt(id, 10) : undefined;
  const veiculoCodigo = codigo; 

  const {
    data: veiculoById,
    isLoading: isLoadingById,
    isError: isErrorById,
    error: errorById,
  } = useRecuperarVeiculoPorId(veiculoId!);

  const {
    data: veiculoByCodigo,
    isLoading: isLoadingByCodigo,
    isError: isErrorByCodigo,
    error: errorByCodigo,
  } = useRecuperarVeiculoPorCodigo(veiculoCodigo!); 

  const veiculo = veiculoById || veiculoByCodigo;

  const isLoading = (veiculoId && isLoadingById && !veiculoByCodigo) || (veiculoCodigo && isLoadingByCodigo && !veiculoById);

  const isError = (veiculoId && isErrorById) || (veiculoCodigo && isErrorByCodigo);
  const error = (veiculoId && errorById) || (veiculoCodigo && errorByCodigo);


  // --- Lógica de renderização de estados ---
  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando veículo...</span>
        </div>
        <p className="mt-2">Carregando detalhes do veículo...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mt-5">
        <p className="text-danger text-center">
          Erro ao carregar veículo: {error?.toString()}
        </p>
        <p className="text-center">Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!veiculo) {
    // Se ambos os parâmetros foram fornecidos, mas nenhum veículo foi encontrado
    // Ou se apenas um foi fornecido e não encontrou o veículo
    return (
      <div className="container mt-5">
        <p className="text-center">Veículo não encontrado.</p>
      </div>
    );
  }

  // --- Dados do veículo carregados com sucesso ---
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
        <Breadcrumbs
          anteriores={[{ nome: "Início", link: "/" }, { nome: "Veículos", link: "/veiculos" }]}
          atual={veiculo.modelo?.nome || "Detalhes do Veículo"}
        />
        <p className="mb-5 h3">
          {veiculo.modelo?.fabricante}{" "}
          <span style={{ color: "red" }}>{veiculo.modelo?.nome}</span>
        </p>
        <p className="text-muted">
          {veiculo.modelo?.motor} {veiculo.modelo?.cambio} {veiculo.modelo?.ano}
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
            <p>{veiculo.modelo?.ano}</p>
          </div>
          <div className="col">
            <p className="mb-0">
              <b>Câmbio</b>
            </p>
            <p>{veiculo.modelo?.cambio}</p>
          </div>
          <div className="col">
            <p className="mb-0">
              <b>Combustível</b>
            </p>
            <p>{veiculo.modelo?.combustivel}</p>
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
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Comando de voz
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Manual embutido
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Scanner
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Assistente Virtual
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Vidros à prova de bala
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Opcionais</h5>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Ar condicionado
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Sistema de alarme ultrassônico
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Desembaçador traseiro
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Travas com biometria
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Direção automática por IA
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Comunicação por Satélites
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Porta-copos com regulador de temperatura
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Insulfilm inteligente
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Toca-fitas
            </span>
            <span className="badge rounded-pill bg-secondary text-light me-1 mb-1">
              Dadinhos no retrovisor
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VeiculoPage;