import { rightProps } from "../../../types/propsTypes.ts"

import Button from "../../../components/Button/Button.tsx";

import { Right } from "./right";

export default function right(props: rightProps) {
  const { exibirSomaDosDepositos, exibirSomaDosSaques, setDepositoModal } =
    props;
  return (
    <Right>
      <h2>Resumo</h2>
      <div className="table">
        <div className="row1">
          <p>Entradas</p>
          <span>{"R$ " + exibirSomaDosDepositos().replace(".", ",")}</span>
        </div>
        <div className="row2">
          <p>Saídas</p>
          <span>{"R$ " + exibirSomaDosSaques().replace(".", ",")}</span>
        </div>
        <hr />
        <div className="row3">
          <p>Saldo</p>
          <span>
            {"R$ " +
              String(
                (
                  Number(exibirSomaDosDepositos()) -
                  Number(exibirSomaDosSaques())
                ).toFixed(2)
              ).replace(".", ",")}
          </span>
        </div>

        <div onClick={() => setDepositoModal(true)}>
          <Button text="Deposite Aqui" widthflex="100%" />
        </div>
      </div>
    </Right>
  );
}
