// Burger.styled.js
import styled from "styled-components";
export const StyledDashboard = styled.div`
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  form {
    border: none;
    width: 80%;
    display: inline-block;
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
    width: 50px;
    height: 50px;
    margin: 0 auto;
    padding: 0;
    display: inline-block;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    font-color: white;
    color: white;
    border: 1px solid white;
    border-radius: 8px;
    background-color: transparent;
  }
  .divider {
    width: 50%;
    height: auto;
    display: inline-block;
  }
  .modal-contents {
    height: 300px;
    width: 500px;
    background-color: white;
    text-align: center;
    padding: 20px;
    position: relative;
    border-radius: 4px;
  }
  .btnDiv {
    text-alignt: center;
    padding: 50px;
  }
  div {
    text-align: center;
    color: white;
    margin:auto;
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
    margin-top:15%;
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
  .bg-modal1,
  .bg-modal2 {
    margin:0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index:9999999;
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
    margin:5%;
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
