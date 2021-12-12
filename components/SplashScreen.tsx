import { css } from '@emotion/react'

const SplashScreen = () => (
  <div css={css`
    background: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 0;
  `}>
    <img src='/logo.svg' alt="Poppy Logo"
      css={css`
        width: 200px;
        transform-origin: 50% 50%;
        transition: transform 1s linear;

        @keyframes zoominoutsinglefeatured {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        animation-name: zoominoutsinglefeatured;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
      `} />
  </div>
);

export default SplashScreen;
