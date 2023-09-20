import Logo from "../../components/Logo/Logo.tsx";

import { CadastroPageCSS } from "./Cadastro";
import FormCadastro from "../../components/FormCadastro/FormCadastro.tsx";

export default function CadastroPage() {
  return (
    <CadastroPageCSS>
      <Logo />
      <div className="box">
        <h2>Cadastre-se</h2>
        <FormCadastro />
      </div>
    </CadastroPageCSS>
  );
}
