const BuscarVeiculoForm = () => {
  return (
    <div className="card">
      <div className="card-body">
        <form>
          <div className="form-group mb-3">
            <label htmlFor="nomeDoModelo">Modelo</label>
            <input
              type="text"
              className="form-control"
              id="nomeDoModelo"
              aria-describedby="modeloHelp"
            />
            <small id="modeloHelp" className="form-text text-muted">
              Insira o nome do modelo que deseja buscar
            </small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="nomeDaMontadora">Fabricante</label>
            <input
              type="text"
              className="form-control"
              id="nomeDaMontadora"
              aria-describedby="fabricanteHelp"
            />
            <small id="fabricanteHelp" className="form-text text-muted">
              Insira o nome da fabricante que deseja buscar
            </small>
          </div>

          <fieldset className="form-group mb-3">
            <legend className="col-form-label pt-0">Tipo de veículos</legend>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                name="inlineRadioOptions"
                type="radio"
                id="carro"
                value="1"
              />
              <label className="form-check-label" htmlFor="carro">
                Carros
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                name="inlineRadioOptions"
                type="radio"
                id="moto"
                value="2"
              />
              <label className="form-check-label" htmlFor="moto">
                Motos
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                name="inlineRadioOptions"
                type="radio"
                id="ambos"
                value="3"
              />
              <label className="form-check-label" htmlFor="ambos">
                Ambos
              </label>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuscarVeiculoForm;
