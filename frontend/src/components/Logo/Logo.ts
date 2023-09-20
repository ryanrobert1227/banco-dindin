import styled, { css } from "styled-components";

export const LogoCSS = styled.div<{}>(() => {
  return css`
    display: flex;
    width: 80%;

    .logotipo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 9.2rem;
      img {
        height: 2.5em;
      }

      h1 {
        color: #fff;
        text-align: center;
        font-family: Rubik, sans-serif;
        font-size: 2em;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }

    .mobile {
      display: none;
    }

    @media screen and (min-width: 0px) and (max-width: 500px) {
      justify-content: space-between;

      .mobile {
        display: inline-block;

        outline: unset;
        border: none;

        font-size: 1em;
        font-family: rubik, sans-serif;
        font-weight: 700;

        width: 15vw;
        height: 6vh;

        color: white;
        background: none;
      }
    }
  `;
});
