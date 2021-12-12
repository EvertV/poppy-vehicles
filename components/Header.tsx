import { css } from '@emotion/react'

const Header = () => (
  <h1 css={css`
    text-align: center;
    background-color: red;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
  `}>
    <img src='/logo.svg' css={css`
      filter: brightness(0) invert(1);
    `} alt="Poppy Logo" />
  </h1>
);

export default Header;
