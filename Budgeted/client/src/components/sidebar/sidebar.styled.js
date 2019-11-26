// Burger.styled.js
import styled from "styled-components";
export const StyledSidebar = styled.div`

  .sidebar {
    height: 100%;
    width: 25%;
    position: fixed;
    z-index: 100;
    //top: 0;
    background-color: rgb(255, 255, 255);
    padding-top: 20px;
    left: -100%;
    animation: slideOpen 0.25s forwards;
  }
  @keyframes slideOpen {
    100% {
      left: 0;
    }
  }

  .sidebar .closebtn {
    text-align: right;
    font-size: 30px;
  }
  .sidebar a,
  .btn-group {
    padding: 6px 8px 6px 16px;
    color: black;
    display: block;
    width: 100%;
    text-align: left;
    cursor: pointer;
    opacity: 1;
  }
  hr{
    width: 100%;
  }

  .sidebar a:hover {
    opacity: .5;
  }

  .sidebar.close {
    left: -100%;
  }
`;
