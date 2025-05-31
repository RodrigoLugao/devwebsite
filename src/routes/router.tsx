import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/Homepage";
import QuemSomosPage from "../pages/QuemSomosPage";
import ContatoPage from "../pages/ContatoPage";
import VeiculosPage from "../pages/VeiculosPage";
import VeiculoPage from "../pages/VeiculoPage";

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
      ],
    },
  ],

  {
    basename: import.meta.env.BASE_URL,
  }
);
export default router;
