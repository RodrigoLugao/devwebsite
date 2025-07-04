import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/Homepage";
import QuemSomosPage from "../pages/QuemSomosPage";
import ContatoPage from "../pages/ContatoPage";
import VeiculosPage from "../pages/VeiculosPage";
import VeiculoPage from "../pages/VeiculoPage";
import PecasPage from "../pages/PecasPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ListaPecas from "../components/ListaPecas";
import LoginPage from "../pages/LoginPage";
import PecasFavoritasPage from "../pages/PecasFavoritasPage";
import AuthGuard from "../components/AuthGuard"; // Importe o AuthGuard
import PecaPage from "../pages/PecaPage";
import AdminGuard from "../components/AdminGuard";
import EditarPecaPage from "../pages/EditarPecaPage";
import CriarPecaPage from "../pages/CriarPecaPage";
import CadastroUsuarioPage from "../pages/CadastroUsuarioPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "quem-somos",
          element: <QuemSomosPage />,
        },
        {
          path: "contato",
          element: <ContatoPage />,
        },
        {
          path: "veiculos",
          element: <VeiculosPage />,
        },
        { path: "veiculos/:id", element: <VeiculoPage /> },
        { path: "veiculos/codigo/:codigo", element: <VeiculoPage /> },
        {
          path: "pecas",
          element: <PecasPage />,
          children: [
            { index: true, element: <ListaPecas /> },
            { path: "categoria/:slugCategoria?", element: <ListaPecas /> },
          ],
        },
        { path: "pecas/:id", element: <PecaPage /> },
        { path: "carrinho", element: <CarrinhoPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "cadastrar-usuario", element: <CadastroUsuarioPage /> },

        // --- Rotas Protegidas ---
        {
          element: <AuthGuard />, 
          children: [
            { path: "pecas/favoritas", element: <PecasFavoritasPage /> },
          ],
        },
        {
          element: <AdminGuard />, 
          children: [
            { path: "pecas/:id/editar", element: <EditarPecaPage /> },
            { path: "pecas/criar", element: <CriarPecaPage /> },
          ],
        },
      ],
    },
  ],

  {
    basename: import.meta.env.BASE_URL,
  }
);

export default router;