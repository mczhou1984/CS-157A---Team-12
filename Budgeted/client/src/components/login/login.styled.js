// Burger.styled.js
import styled from 'styled-components';
export const StyledLogin = styled.div`
body {font-family: Arial, Helvetica, sans-serif;}
form {
  border: none;
  width:80%;
  display: inline-block

}


input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 10px;
  margin: 5px 0;
  display: inline-block;
  border: none;
  box-sizing: border-box;
  font-size:.75rem;
  focus:grey;
}

button {
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

div{
  text-align:center;
  background: white;
  margin-top:50px;
}



.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* img.avatar {
  width: 40%;
  border-radius: 50%;
} */

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
`;
