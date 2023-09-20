import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../components/Logo/Logo.tsx";
import Button from "../../components/Button/Button.tsx";
import FormLogin from "../../components/FormLogin/FormLogin.tsx";

import { LoginPageCSS } from "./Login";

export default function Login() {
  const [openLoginModal, setOpenLoginModal] = useState(true);
  return (
    <LoginPageCSS>
      <Logo setOpenLoginModal={setOpenLoginModal} page={true} />
      <div className="box">
        <div className="left">
          <h1>
            Controle suas <span>finanças</span>, sem planilhas chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
            tem tudo num único lugar e em um clique de distância.
          </p>
          <Link to="/cadastro">
            <Button text="Cadastre-se" widthflex="60%" />
          </Link>
        </div>
        {openLoginModal && (
          <div className="right">
            <h2>Login</h2>
            <FormLogin />
          </div>
        )}
      </div>
    </LoginPageCSS>
  );
}
