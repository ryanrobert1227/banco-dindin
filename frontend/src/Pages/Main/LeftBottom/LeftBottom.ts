import styled, { css } from "styled-components";

export const LeftBottomStyled = styled.div<{}>(() => {
  return css`
    border-radius: 10px;
    box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.1);

    height: 50%;
    width: 100%;

    background: #fafafa;

    .categorias {
      display: flex;
      span {
        /* border-left: 1px solid rgba(0, 0, 0, 0.55);
      border-right: 1px solid rgba(0, 0, 0, 0.55);
      border-top: 1px solid rgba(0, 0, 0, 0.55); */

        width: 16.44%;
        padding: 0.5rem 0;

        font-feature-settings: "clig" off, "liga" off;
        font-family: Lato, sans-serif;
        font-size: 1em;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-align: center;

        color: #000;

        cursor: pointer;

        &:hover {
          background-color: #d9d9d9;
        }
      }
    }

    .rows {
      display: flex;
      flex-direction: column;

      height: 80%;

      overflow-y: scroll;

      hr {
        align-self: center;
        width: 95%;

        color: black;

        opacity: 0.55;
      }

      &&::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
        border-radius: 10px;
        background-color: #cccccc;
      }

      &::-webkit-scrollbar {
        width: 12px;
        background-color: rgba(0, 0, 0, 0.1);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #32a9ee;
        background-image: -webkit-linear-gradient(
          90deg,
          transparent,
          rgba(0, 0, 0, 0.4) 50%,
          transparent,
          transparent
        );
      }
    }
  `;
});
