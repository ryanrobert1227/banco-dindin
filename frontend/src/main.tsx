import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import LoginPage from "./Pages/Login/Login.tsx";
import CadastroPage from "./Pages/Cadastro/Cadastro.tsx";
import Main from "./Pages/Main/Main.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: < />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/Cadastro",
        element: <CadastroPage />,
      },
      {
        path: "/Main",
        element: <Main />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
