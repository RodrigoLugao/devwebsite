import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ListaCategoriasPeca from "../components/ListaCategoriasPeca";
import { Outlet } from "react-router-dom";

const PecasPage = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    string | null
  >(null);

  // Esta função será passada para ListaCategoriasPeca
  const handleCategoriaSelecionada = (nomeCategoria: string | null) => {
    setCategoriaSelecionada(nomeCategoria);
  };

  return (
    <div className="container mb-4 pt-5" style={{ marginTop: "94px" }}>
      <Breadcrumbs anteriores={[{ nome: "Início", link: "/" }]} atual="Peças" />
      <p className="h3 mb-4">Peças e Acessórios</p>

      <p className="h5">Categorias:</p>
      <ListaCategoriasPeca
        onCategoriaSelecionada={handleCategoriaSelecionada}
      />

      <p className="h5">
        {categoriaSelecionada !== null ? (
          <>
            Peças da Categoria <strong>{categoriaSelecionada}</strong>:
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
