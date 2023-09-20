import { createGlobalStyle } from "styled-components";

export const EditarPerfilCSS = createGlobalStyle`
      .modal-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        background: #3d3d3d7a 48%;

        .modal-content {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: calc( 50% - 45vh);
          left: calc( 50% - 20vw);

          border-radius: 1.5rem;
          border: none;
          outline: unset;

          width: 40vw;
          height: 90vh;
          padding: 3rem 4rem;

          background-color: white;

          h1 {
            font-family: Rubik, sans-serif;
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            color: #000;
          }
        }
      }
  `;
