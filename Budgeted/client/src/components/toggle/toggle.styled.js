// Burger.styled.js
import styled from 'styled-components';
export const StyledToggle = styled.div`
#toggle {
  cursor: pointer;
  color: white;
  font-size: 60px;
  margin-left: -900px;
  background: transparent;
  border: none;
  padding: 10px;
}

button:focus {
  outline: 0;
}


button {

  transition: all 0.25s;
  position: relative;
}

button:hover{
    transform: rotate(90deg);
    color: #FF9900;
}

`;
