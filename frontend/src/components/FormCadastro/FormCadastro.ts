import styled, { css } from "styled-components";

export const FormCadastroCSS = styled.section<{}>(() => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 0.3rem;
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      width: 90%;
      gap: 0.7rem;

      h6 {
        position: absolute;
        top: -6rem;

        font-size: 2em;

        color: red;
      }

      div {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 0.5em;
        width: 100%;

        span {
          position: absolute;
          right: 0rem;
          bottom: -1.2rem;
        }

        label {
          color: #484848;
          font-family: Rubik, sans-serif;
          font-size: 0.8em;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        input {
          width: 100%;
          height: 6vh;
          padding: 0 1em;

          border-radius: 4px;
          border: 1px solid #555;

          background: #fff;
        }
      }
      button {
        border: none;
        border-radius: 0.3em;

        height: 5vh;
        width: 80%;
        margin-top: 1.5rem;

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

      .input-error {
        border: solid 1px red;
      }
    }
    span {
      margin-top: 0.5rem;

      font-feature-settings: "clig" off, "liga" off;
      font-family: Lato, sans-serif;
      font-size: 0.7em;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      color: #7b61ff;
    }
  `;
});
