// Burger.styled.js
import styled from "styled-components";
export const StyledSidebar = styled.div`
  /*header-wrapper {
    width: 100vw;
    height: 80px;
    background-color: navy;
    color: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
}
*/

  .sidebar {
    height: 100%;
    width: 25%;
    position: fixed;
    z-index: 100;
    //top: 0;
    background-color: rgb(66, 101, 133);
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
    color: #ffffff;
    display: block;
    width: 100%;
    text-align: center;
    cursor: pointer;
    opacity: 0.8;
  }

  .sidebar a:hover {
    opacity: 1;
  }

  .sidebar.close {
    left: -100%;
  }
`;
