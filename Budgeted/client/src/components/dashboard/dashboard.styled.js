// Burger.styled.js
import styled from 'styled-components';
export const StyledDashboard = styled.div`
body {font-family: Arial, Helvetica, sans-serif;}
form {
  border: none;
  width:80%;
  display: inline-block

}

#btn1, #btn2 {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  line-height: 50px;
  text-align: center;
  font-size:20px;
}

.divider{
    width:50%;
    height:auto;
    display:inline-block;
}


.btnDiv{
  text-alignt:center;
  padding:50px;
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
  width:90%;
  margin-bottom:0px;
  align:right;
}

.container{
  position: relative;
}

/* .graph {
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
} */
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
    padding-left: 20%;
    padding-right:20%;
    display: table-cell;
    max-height:10px;
    display:inline-block;
    vertical-align: middle;
}
.childinner {
    min-height: 10px;
}

#footer {
  height: 150px;
  background-color: #f5f5f5;
  padding: 10px;
  margin-top: 80px;
}

.container-top ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.container-top li {
  float: left;
}

.container-top ul li a {
  display: block;
  padding: 14px 16px;
  text-align: center;
  text-decoration: none;
  color: #000;
}

.container-top ul li a:hover {
  text-decoration: underline;
  color: #000;
}

.container-bottom {
  margin-top: 50px;
  padding-left: 16px;
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
