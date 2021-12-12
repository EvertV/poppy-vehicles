import { css } from '@emotion/react'

const Header = () => (
  <h1 css={css`
    text-align: center;
    background-color: red;
    padding: 1rem;
    display: block;
  `}>
    <img src='/logo.svg' css={css`
      filter: brightness(0) invert(1);
      margin:auto;
    `} alt="Poppy Logo" />
  </h1>
);

export default Header;
