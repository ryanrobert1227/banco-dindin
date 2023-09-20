import styled, { css } from "styled-components";

export const LeftTopStyled = styled.div<{}>(() => {
  return css`
    border-radius: 10px;
    box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.1);

    height: 43%;
    width: 100%;
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;

    background: #fafafa;

    h2 {
      color: #b9b9b9;
      font-family: Rubik, sans-serif;
      font-size: 0.8em;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .buttons-table {
      display: inline-block;

      margin-top: 0.7rem;

      height: 50%;
      width: 60%;

      .button-active {
        background-color: #7978d9;
      }

      button {
        position: relative;

        border: none;
        border-radius: 10px;
        box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.1);

        width: 25%;
        height: 30%;

        margin: 0.4em;

        background: #fafafa;
        color: #000;

        &:hover {
          background-color: #9695ed;
        }

        label {
          position: absolute;
          top: calc(50% - 0.6em);
          left: 1rem;

          width: 50%;

          text-align: center;
          font-feature-settings: "clig" off, "liga" off;
          font-family: Rubik, sans-serif;
          font-size: 0.8em;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        img {
          position: absolute;
          top: 35%;
          right: 1rem;

          height: 0.5rem;
        }
      }
    }

    .filter {
      display: flex;
      justify-content: space-between;

      height: 20%;
      width: 28%;
      margin-top: 1.2rem;
      margin-left: 0.3rem;

      button {
        border: none;
        border-radius: 10px;
        box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.1);

        padding: 0.3rem 0.7rem;

        background: #fafafa;

        &:hover {
          background-color: #7978d9;
        }

        &:active {
          background-color: #383791;
        }
      }
    }

    @media screen and (min-width: 0px) and (max-width: 500px) {
      .buttons-table {
        width: 100%;
        height: 70%;
      }

      .filter {
        width: 40%;
      }
    }
  `;
});
