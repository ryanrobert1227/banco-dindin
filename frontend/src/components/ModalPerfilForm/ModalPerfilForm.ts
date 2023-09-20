import styled, { css } from "styled-components";

export const ModalPerfilFormCSS = styled.section<{}>(() => {
  return css`
    width: 90%;
    .form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 1.5rem;

      button {
        border: none;
        border-radius: 0.3em;

        height: 4vh;
        width: 50%;
        margin-top: 0.5em;
        margin: 0 auto;

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
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 0.4em;
        position: relative;

        width: 100%;

        label {
          font-family: Rubik, sans-serif;
          font-size: 1em;
          font-style: normal;
          font-weight: 500;
          line-height: normal;

          color: #484848;
        }

        input {
          width: 100%;
          height: 6vh;
          padding: 0 1rem;

          border-radius: 4px;
          border: 1px solid #555;

          background: #fff;
        }

        .input-error {
          border: solid 1px red;
        }

        span {
          position: absolute;
          left: 0rem;
          bottom: -1.4rem;

          color: #ff2222;
        }
      }
    }
  `;
});
