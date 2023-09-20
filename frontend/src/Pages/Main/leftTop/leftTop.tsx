import Plus from "../../../assets/plus.svg";

import { LeftTopProps } from "../../../types/propsTypes";

import { LeftTopStyled } from "./leftTop";

export default function leftTop(props: LeftTopProps) {
  const { filtros, keyWordFilter, setkeyWordFilter, alterEstadoDeFiltro } =
    props;

  return (
    <LeftTopStyled>
      <h2>Categorias</h2>
      <div className="buttons-table">
        {filtros.map((e: string) => {
          return (
            <button
              className={keyWordFilter.includes(e) ? "button-active" : ""}
              onClick={() => alterEstadoDeFiltro(e)}
            >
              <label>{e}</label>
              <img src={Plus} />
            </button>
          );
        })}
      </div>
      <div className="filter">
        <button onClick={() => setkeyWordFilter([""])}>Limpar Filtros</button>
      </div>
    </LeftTopStyled>
  );
}
