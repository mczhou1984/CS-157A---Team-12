// Burger.styled.js
import styled from 'styled-components';
export const StyledDashboard = styled.div`
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



div{
  text-align:center;
  color:white;
  margin-top:50px;


}

hr {
  color:white;
  background-color:white;
  width:80%;
  margin-bottom:0px;
}

.container{
  position: relative;
}

.graph {
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.mom {
    margin-top:0px;
    width: 100%; /* Try setting this to 400px or something */
    display: table;
    margin: 0 auto !important;
}
.child {
    margin-top:0px;
    margin-bottom:0px;
    padding-left: 10%;
    padding-right:10%;
    display: table-cell;
    max-height:10px;
    display:inline-block;
    vertical-align: middle;
}
.childinner {
    min-height: 10px;
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
