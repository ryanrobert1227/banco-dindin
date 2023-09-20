import styled, { css } from "styled-components";

export const MainPageCSS = styled.section<{}>(() => {
  return css`
    box-sizing: border-box;
    height: 100vh;
    width: 100%;

    background: linear-gradient(90deg, #05ede3 0.02%, #645ffb 99.63%);

    header {
      display: flex;
      justify-content: space-between;

      padding: 1.3rem 4.6rem;

      .perfil {
        display: flex;
        align-items: center;
        gap: 1rem;

        .perfil-photo {
          height: 2.7rem;

          cursor: pointer;
        }
        .left-icon {
          height: 1.2em;
          margin-left: 0.5rem;
        }

        span {
          text-align: center;
          font-family: Rubik, sans-serif;
          font-size: 0.8em;
          font-style: normal;
          font-weight: 700;
          line-height: normal;

          color: #fff;
        }
      }
    }

    .box {
      border-top-right-radius: 3rem;
      border-top-left-radius: 3rem;

      height: 87.3vh;
      width: 100%;
      padding: 2.5rem 4.6rem;

      background-color: white;

      .Filter-button {
        border: none;
        border-radius: 10px;
        box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.1);

        height: 7%;
        width: 9%;
        margin-bottom: 0.5rem;

        background: #fafafa;

        &:hover {
          box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.2);

          background: #e6e6e6;
        }
      }

      .column {
        display: flex;
        justify-content: space-between;

        height: 95%;
        width: 100%;
        z-index: 1;

        .left {
          display: flex;
          flex-direction: column;

          height: 100%;
          width: 75%;
        }
      }
    }
    @media screen and (min-width: 0px) and (max-width: 500px) {
      header {
        padding: 2.27rem 2rem;
      }

      .box {
        padding: 2rem 1rem;

        .column {
          display: flex;
          flex-direction: column;

          .left {
            display: inline-block;
            height: 70%;
            width: 100%;
          }
        }
      }
    }
  `;
});
