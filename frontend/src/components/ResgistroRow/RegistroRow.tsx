import { RegistroRowCSS } from "./RegistroRow";

import { registroRowProps } from "../../types/propsTypes";

export default function RegistroRow(props: registroRowProps) {
  const { data, semana, descricao, categoria, valor, tipo } = props;

  return (
    <RegistroRowCSS tipo={tipo}>
      <span className="data">{data.slice(0, 10)}</span>
      <span>{semana}</span>
      <span>{descricao}</span>
      <span>{categoria}</span>
      <span>{"R$ " + (valor / 100).toFixed(2).replace(".", ",")}</span>
      <span>{tipo}</span>
    </RegistroRowCSS>
  );
}
