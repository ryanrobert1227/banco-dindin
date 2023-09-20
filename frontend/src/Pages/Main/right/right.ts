import styled, { css } from "styled-components";

export const Right = styled.div<{}>(() => {
  return css`
    border-radius: 10px;
    box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.1);

    height: 45%;
    width: 20%;
    padding: 1rem;

    background: #fafafa;

    hr {
      opacity: 0.2;
    }

    h2 {
      margin-bottom: 1rem;

      font-family: Rubik, sans-serif;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      color: #2f2f2f;
    }

    .table {
      display: flex;
      flex-direction: column;
      gap: 0.5rem 0;
      div {
        display: flex;
        justify-content: space-between;

        p {
          font-family: Rubik, sans-serif;
          font-size: 0.8rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;

          color: #2f2f2f;
        }

        span {
          text-align: right;
          font-feature-settings: "clig" off, "liga" off;
          font-family: Rubik, sans-serif;
          font-size: 0.8rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;

          color: #645ffb;
        }
      }

      .row2 {
        span {
          color: #fa8c10;
        }
      }
      .row3 {
        margin-bottom: 1rem;
        p {
          font-family: Rubik, sans-serif;
          font-size: 0.8rem;
          font-style: normal;
          font-weight: 700;
          line-height: normal;

          color: #2f2f2f;
        }
        span {
          color: #3a9ff1;
        }
      }
    }

    @media screen and (min-width: 0px) and (max-width: 500px) {
      width: 100%;
    }
  `;
});
