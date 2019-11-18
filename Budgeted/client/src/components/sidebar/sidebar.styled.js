// Burger.styled.js
import styled from 'styled-components';
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
  width: 150px;
  position: fixed;
  z-index: 100;
  //top: 0;
  background-color: #426585;
  overflow-x: hidden;
  padding-top: 20px;
  left: -100%;
  animation: slideOpen 0.25s forwards;
}
@keyframes slideOpen {
    100% { left: 0 };
}


.sidebar a, .btn-group{
  padding: 6px 8px 6px 16px;
  font-size: 12px;
  color: #f3f3f3;
  display: block;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.sidebar a:hover {
  opacity: .5;
}

.sidebar.close {
  left: -100%;
}

`;
