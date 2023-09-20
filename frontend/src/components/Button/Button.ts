import styled, { css } from "styled-components";

export const ButtonCSS = styled.button<{ widthflex: string }>((props) => {
  const { widthflex } = props;
  return css`
    border: none;
    border-radius: 0.3em;

    height: 6vh;
    width: ${widthflex};

    text-align: center;
    font-family: Rubik, sans-serif;
    font-size: 0.7em;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    background-color: #7978d9;
    color: white;

    &:hover {
      background-color: #5756c7;
    }
    &:active {
      background-color: #32317a;
    }
  `;
});
