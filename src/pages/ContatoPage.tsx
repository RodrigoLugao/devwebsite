import Breadcrumbs from "../components/Breadcrumbs";

const ContatoPage = () => {
  return (
    <main className="container mb-4 pt-5" style={{ marginTop: "94px" }}>
      <Breadcrumbs
        anteriores={[{ nome: "Início", link: "/" }]}
        atual={"Contato"}
      ></Breadcrumbs>

      <header>
        <p className="mb-4 h3">Contato</p>
        <hr />
      </header>

      <section className="row mt-5 mb-5">
        <article className="col-12 col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h4">Formas de contato</h2>
              <hr />

              <h3 className="h5">Telefone</h3>
              <p>
                <i className="fa-solid fa-phone"></i> (21) 999-999-999
                <br />
                Seg - Sex: 9h às 18h
              </p>

              <h3 className="h5">Email</h3>
              <p>
                <i className="fa fa-envelope"></i> simasauto@turbo.com.br
              </p>

              <h3 className="h5">Endereço</h3>
              <address>
                123 Motor Drive - Automotive District, Detroit, MI, USA - ZIP
                48201
              </address>
            </div>
          </div>
        </article>

        <section className="col-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telefone" className="form-label">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefone"
                    name="telefone"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mensagem" className="form-label">
                    Mensagem
                  </label>
                  <textarea
                    className="form-control"
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ContatoPage;
