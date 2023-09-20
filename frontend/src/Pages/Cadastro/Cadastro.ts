import styled, { css } from "styled-components";

import background from "../../assets/background.png";

export const CadastroPageCSS = styled.section<{}>(() => {
  return css`
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    padding: 1.35rem 4.6rem;

    background: linear-gradient(
        180deg,
        rgba(5, 237, 227, 0.5) 0%,
        rgba(100, 95, 251, 0.5) 100%,
        rgba(100, 95, 251, 0.5) 100%
      ),
      url(${background}), lightgray 50% / cover no-repeat;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    .box {
      display: flex;
      flex-direction: column;
      align-items: center;

      border-radius: 0.5rem;
      box-shadow: 0.7rem 0.4rem 1rem rgba(0, 0, 0, 0.4);

      height: 88vh;
      width: 35vw;
      margin: auto;
      margin-top: 0.2rem;

      background-color: white;

      h2 {
        margin-top: 1rem;

        color: #7978d9;
        font-family: Rubik, sans-serif;
        font-size: 1.5em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
    @media screen and (min-width: 0px) and (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 1.35rem 0;

      .box {
        width: 80vw;
        height: 80vh;
        margin: 0;
        margin-top: 3rem;
      }
    }
  `;
});
