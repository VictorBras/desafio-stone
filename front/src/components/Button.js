import styled, { css } from 'styled-components';

const Button = styled.button`
  &,
  &::before {
    --color: white;
    --inverted-color: rgba(0, 0, 0, 0.9);

    ${(props) =>
      props.black &&
      css`
        --color: #000;
        --inverted-color: rgba(255, 255, 255, 0.9);
      `}
  }

  background: transparent;
  border-radius: 3px;
  border: 2px solid var(--color);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  color: var(--color);
  display: inline-block;
  margin: 0.5rem 1rem;
  overflow: hidden;
  padding: 0.5rem 0;
  position: relative;
  text-align: center;
  text-decoration: unset;
  transition: all 250ms;
  width: 11rem;
  z-index: 1;

  a {
    color: var(--color);
    text-decoration: unset;
  }

  &:hover {
    color: var(--inverted-color);

    a {
      color: var(--inverted-color);
    }

    &::before {
      width: 100%;
    }
  }

  &::before {
    background-color: var(--color);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: all 250ms;
    width: 0;
    z-index: -1;
  }
`;

export default Button;
