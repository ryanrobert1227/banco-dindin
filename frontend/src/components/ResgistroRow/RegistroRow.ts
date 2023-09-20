import styled, { css } from "styled-components";

export const RegistroRowCSS = styled.div<{ tipo: string }>((props) => {
  const { tipo } = props;

  function getColor(tipo: string) {
    let color;

    if (tipo === "Deposito") {
      color = "rgba(100,95,251, 0.7)";
    } else if (tipo === "Saque") {
      color = "rgba(250,140,16, 0.7)";
    } else if (tipo === "Transferencia") {
      color = "#3A9FF1";
    } else {
      color = "white";
    }

    return color;
  }

  return css`
    display: flex;
    justify-content: space-around;

    background-color: ${getColor(tipo)};

    span {
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      border-right: 1px solid rgba(0, 0, 0, 0.15);

      width: 18%;
      padding: 0.8rem 0;

      font-feature-settings: "clig" off, "liga" off;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;
      text-overflow: ellipsis;

      white-space: nowrap;
      overflow: hidden;

      color: #000;

      img {
        height: 1.5em;
      }
    }

    .edit {
      margin-right: 1rem;
    }
  `;
});
