import styled, { css } from "styled-components";

import background from "../../assets/background.png";

export const LoginPageCSS = styled.section<{}>(() => {
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

    .mobile {
      display: none;
    }

    .box {
      display: flex;
      justify-content: space-around;
      padding-top: 2.3rem;

      .left {
        display: flex;
        flex-direction: column;
        gap: 1em;

        height: 60vh;
        width: 40%;
        padding-top: 4.5rem;

        h1 {
          color: #fff;
          font-family: Rubik, sans-serif;
          font-size: 2.5em;
          font-style: normal;
          font-weight: 700;
          line-height: normal;

          span {
            color: #7978d9;
          }
        }

        p {
          color: #fff;
          font-family: Rubik, sans-serif;
          font-size: 1.1em;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        align-items: center;

        height: 60vh;
        width: 45%;

        background-color: #fff;

        h2 {
          margin-top: 1.8rem;

          color: #7978d9;
          font-family: Rubik, sans-serif;
          font-size: 1.3em;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
    }

    @media screen and (min-width: 0px) and (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 1.35rem 0;

      .mobile {
        display: inline-block;
        align-self: right;
      }

      .box {
        flex-direction: column;
        position: relative;

        width: 80vw;
        height: 80vh;
        margin: 0;
        padding-top: 0;

        .left {
          width: 100%;
          h1 {
            font-size: 2em;
          }
        }

        .right {
          position: absolute;

          border-radius: 0.7rem;

          width: 100%;
        }
      }
    }
  `;
});
