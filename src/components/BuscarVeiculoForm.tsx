import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"; 
import { Tipo } from "../interfaces/Modelo";
import { FiltroVeiculo } from "../interfaces/FiltroVeiculo"; 


interface BuscarVeiculoFormProps {
  onSearch: (params: FiltroVeiculo) => void;
  initialValues?: FiltroVeiculo;
}

const BuscarVeiculoForm = ({ onSearch, initialValues }: BuscarVeiculoFormProps) => {
  const { register, handleSubmit, reset, watch, } = useForm<FiltroVeiculo>({
    defaultValues: initialValues, 
  });


  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const nomeDoModelo = watch("nomeModelo");
  const nomeDaFabricante = watch("fabricante");
  const anoMin = watch("anoMin");
  const anoMax = watch("anoMax");
  const precoMin = watch("precoMin");
  const precoMax = watch("precoMax");
  const kmsMin = watch("kmsMin");
  const kmsMax = watch("kmsMax");
  const cor = watch("cor");

  const onSubmit: SubmitHandler<FiltroVeiculo> = (data) => {
    const params: FiltroVeiculo = {
      nomeModelo: data.nomeModelo || undefined,
      fabricante: data.fabricante || undefined,
      tipo: data.tipo || undefined,
      anoMin: data.anoMin || undefined,
      anoMax: data.anoMax || undefined,
      precoMin: data.precoMin || undefined,
      precoMax: data.precoMax || undefined,
      kmsMin: data.kmsMin || undefined,
      kmsMax: data.kmsMax || undefined,
      cambio: data.cambio || undefined,
      cor: data.cor || undefined,
    };
    onSearch(params);
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="nomeModelo">Modelo</label>
            <input
              type="text"
              className="form-control"
              id="nomeModelo"
              placeholder="Ex: Fusion"
              {...register("nomeModelo")}
            />
            {/* O watch permite pegar o valor atual do campo para lógica condicional */}
            {nomeDoModelo && (
              <button
                type="button"
                className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute end-0 translate-middle-y me-2"
                aria-label="Limpar"
                onClick={() => reset({ ...watch(), nomeModelo: "" })} // Usa reset para limpar o campo
              >
                &times;
              </button>
            )}
          </div>

          <div className="form-group mb-3 position-relative">
            <label htmlFor="fabricante">Fabricante</label>
            <input
              type="text"
              className="form-control"
              id="fabricante"
              placeholder="Ex: Ford"
              {...register("fabricante")}
            />
            {nomeDaFabricante && (
              <button
                type="button"
                className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute end-0 translate-middle-y me-2"
                aria-label="Limpar"
                onClick={() => reset({ ...watch(), fabricante: "" })}
                style={{ top: "70%", right: "10px" }}
              >
                &times;
              </button>
            )}
          </div>

          <fieldset className="form-group mb-3">
            <legend className="col-form-label pt-0">Tipo de veículo</legend>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="carro"
                value={Tipo.CARRO}
                {...register("tipo")} // Registra para o campo 'tipo'
              />
              <label className="form-check-label" htmlFor="carro">
                Carros
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="moto"
                value={Tipo.MOTO}
                {...register("tipo")}
              />
              <label className="form-check-label" htmlFor="moto">
                Motos
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="ambos"
                value=""
                {...register("tipo")}
              />
              <label className="form-check-label" htmlFor="ambos">
                Ambos
              </label>
            </div>
          </fieldset>

          {/* Campos de Ano */}
          <div className="form-group mb-3">
            <label>Ano</label>
            <div className="row">
              <div className="col position-relative">
                <input
                  type="number"
                  className="form-control"
                  placeholder="De (ano)"
                  {...register("anoMin", { valueAsNumber: true })} // Converte para número
                />
                {anoMin && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute top-50 translate-middle-y me-4"
                    aria-label="Limpar"
                    onClick={() => reset({ ...watch(), anoMin: undefined })}
                    style={{ right: "25px" }}
                  >
                    &times;
                  </button>
                )}
              </div>
              <div className="col position-relative">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Até (ano)"
                  {...register("anoMax", { valueAsNumber: true })}
                />
                {anoMax && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute top-50 translate-middle-y me-4"
                    aria-label="Limpar"
                    onClick={() => reset({ ...watch(), anoMax: undefined })}
                    style={{ right: "25px" }}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Campos de Preço */}
          <div className="form-group mb-3">
            <label>Preço</label>
            <div className="row">
              <div className="col position-relative">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Mín. (R$)"
                  {...register("precoMin", { valueAsNumber: true })}
                />
                {precoMin && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute top-50 translate-middle-y me-4"
                    aria-label="Limpar"
                    onClick={() => reset({ ...watch(), precoMin: undefined })}
                    style={{ right: "25px" }}
                  >
                    &times;
                  </button>
                )}
              </div>
              <div className="col position-relative">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Máx. (R$)"
                  {...register("precoMax", { valueAsNumber: true })}
                />
                {precoMax && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute top-50 translate-middle-y me-4"
                    aria-label="Limpar"
                    onClick={() => reset({ ...watch(), precoMax: undefined })}
                    style={{ right: "25px" }}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Campos de Quilometragem */}
          <div className="form-group mb-3">
            <label>Quilometragem</label>
            <div className="row">
              <div className="col position-relative">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mín. (km)"
                  {...register("kmsMin", { valueAsNumber: true })}
                />
                {kmsMin && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute top-50 translate-middle-y me-4"
                    aria-label="Limpar"
                    onClick={() => reset({ ...watch(), kmsMin: undefined })}
                    style={{ right: "25px" }}
                  >
                    &times;
                  </button>
                )}
              </div>
              <div className="col position-relative">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Máx. (km)"
                  {...register("kmsMax", { valueAsNumber: true })}
                />
                {kmsMax && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-circle btn-clear-input position-absolute top-50 translate-middle-y me-4"
                    aria-label="Limpar"
                    onClick={() => reset({ ...watch(), kmsMax: undefined })}
                    style={{ right: "25px" }}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Campo de Câmbio */}
          <div className="form-group mb-3">
            <label htmlFor="cambio">Câmbio</label>
            <select
              id="cambio"
              className="form-select"
              {...register("cambio")}
            >
              <option value="">Selecione...</option>
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          {/* Campo de Cor */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="cor">Cor</label>
            <input
              type="text"
              className="form-control"
              id="cor"
              placeholder="Ex: Preto, Prata, Vermelho"
              {...register("cor")}
            />
            {cor && (
              <button
                type="button"
                className="btn btn-sm btn-light rounded-circle btn-clear-input"
                aria-label="Limpar"
                onClick={() => reset({ ...watch(), cor: "" })}
              >
                &times;
              </button>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuscarVeiculoForm;