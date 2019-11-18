// Burger.styled.js
import styled from "styled-components";
export const StyledToggle = styled.div`
  #toggle {
    cursor: pointer;
    color: white;
    font-size: 60px;
    background: transparent;
    border: none;
    padding: 10px;
    position: absolute;
  }

  button:focus {
    outline: 0;
  }

  button {
    transition: all 0.25s;
    z-index: 0;
    left: 10px;
    top: 60px;
  }

  button:hover {
    transform: rotate(90deg);
    color: #ff9900;
  }
`;
