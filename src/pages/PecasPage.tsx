import { Outlet, useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ListaCategoriasPeca from "../components/ListaCategoriasPeca";

const PecasPage = () => {
  const { slugCategoria } = useParams<{ slugCategoria?: string }>();
  const navigate = useNavigate();

  //Categoria para ser exibida no Título, vinda da url
  const categoriaExibidaTitulo = slugCategoria || null;

  // Navega pelas categorias, mudando a url
  const handleCategoriaSelecionada = (slugNomeCategoria: string | null) => {
    if (slugNomeCategoria) {
      navigate(`/pecas/categoria/${slugNomeCategoria}`);
    } else {
      navigate(`/pecas`); // Rota base para todas as peças
    }
  };

  return (
    <div className="container mb-4 pt-5" style={{ marginTop: "94px" }}>
      <Breadcrumbs anteriores={[{ nome: "Início", link: "/" }]} atual="Peças" />
      <p className="h3 mb-4">Peças e Acessórios</p>

      <p className="h5">Categorias:</p>
      <ListaCategoriasPeca
        onCategoriaSelecionada={handleCategoriaSelecionada}
        categoriaAtual={slugCategoria} 
      />

      <p className="h5">
        {categoriaExibidaTitulo !== null ? (
          <>
            Peças da Categoria <strong>{categoriaExibidaTitulo}</strong>:
          </>
        ) : (
          <>Todas as Peças:</>
        )}
      </p>

      <Outlet />
    </div>
  );
};

export default PecasPage;