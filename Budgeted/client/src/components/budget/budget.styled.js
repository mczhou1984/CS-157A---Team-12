// Burger.styled.js
import styled from "styled-components";
export const StyledBudget = styled.div`
.slidecontainer {
  width: 100%;
}
.income-text{
  color:green;
}
.expense-text{
  color:orange;
}
.savings-text{
  color:CornflowerBlue ;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4CAF50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4CAF50;
  cursor: pointer;
}
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  form {
    border: none;
    width: 80%;
    display: inline-block;
    margin-top: 5%;
  }
  input[type="text"],
  input[type="email"],
  select {
    width: 100%;
    padding: 12px 10px;
    margin: 5px 0;
    display: inline-block;
    border: none;
    font-size: 0.75rem;
    focus: grey;
  }

  button:focus {
    outline: none;
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
  #btn1,
  #btn2 {
    width: 250px;
    height: auto;
    margin: 0 auto;
    padding: 0;
    display: inline-block;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    font-color: white;
    color: white;
    border-radius: 8px;
    box-shadow: 0;
    background-color: transparent;
  }
  .divider {
    width: 50%;
    height: auto;
    display: inline-block;
  }
  .modal-contents {
    overflow-y:auto
    max-height:750px;
    height: auto;
    width: 500px;
    background-color: white;
    text-align: center;
    padding: 20px;
    position: relative;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }
  #income-card{
    max-width:80%;
    justify-content: center;
    align-items: center;
    margin:auto;
  }
  .savings-modal-contents {
      overflow-y:auto
      height: 300px;
      width: 500px;
      background-color: white;
      text-align: center;
      padding: 20px;
      position: relative;
      border-radius: 4px;
      justify-content: center;
      align-items: center;
    }
  .btnDiv {
    text-alignt: center;
    padding: auto;
  }
  /* div {
    text-align: center;
    color: white;
    margin-top: 50px;
  } */

  h1,
  h4 {
    color: white;
  }
  hr {
    color: white;
    background-color: white;
    width: 90%;
    margin-bottom: 0px;
    align: right;
  }
  .container {
    position: relative;
    margin-top: 5%;
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
    margin-top: 0px;
    width: 100%; /* Try setting this to 400px or something */
    display: table;
    margin: 0 auto !important;
  }
  .child {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 20%;
    padding-right: 20%;
    display: table-cell;
    max-height: 10px;
    display: inline-block;
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

  /* input::-webkit-input-placeholder {
    color: black;
} */
  .income-modal,
  .expense-modal,
  .savings-modal {
    margin: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
  }
  /* .bg-modal2{
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: none;
  justify-content: center;
  align-items: center;
} */
  .close {
    position: absolute;
    margin: 5%;
    top: 0;
    right: 10px;
    font-size: 42px;
    color: #333;
    transform: rotate(45deg);
    cursor: pointer;
    &:hover {
      color: #666;
    }
  }
  .close2 {
    position: absolute;
    margin-top: 7%;
    top: 0;
    right: 10px;
    font-size: 42px;
    color: white;
    transform: rotate(45deg);
    cursor: pointer;
    &:hover {
      color: #666;
    }
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
