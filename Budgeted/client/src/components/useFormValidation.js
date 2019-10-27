import React from "react";
import axios from 'axios';
import {useRoutes, useRedirect} from 'hookrouter';
import { browserHistory } from 'react-router';


function useFormValidation(validate, props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState({});
  const [passwordInput, setPasswordInput] = React.useState({});
  const [password2Input, setPassword2Input] = React.useState({});
  const [nameInput, setNameInput] = React.useState({});

  React.useEffect(() => {
    // const user = {
    //   email: document.getElementById("email").value,
    //   password: document.getElementById("p1").value,
    //   password2:document.getElementById("p2").value,
    //   name:document.getElementById("name").value
    // }
    //
    // console.log(user);
    //
    // const validationErrors = validate(user);
    // setErrors(validationErrors);



  }, []);

  function handleNameChange(event){
    setName(event.target.value);
    let nameState = {};

    if(name){
        nameState  = {
            p1:"form-group  has-success",
            input:"form-control mr-sm-2 is-valid",
            p2:"valid-feedback",
            msg:errors.email
          }
    }

    setNameInput(nameState);




  }

  function handleEmailChange(event){
    let emailState = {};
    const values = {
      email:event.target.value
    }

    let error = (validate(values));
    if(error.email){
        emailState  = {
        p1:"form-group has-danger",
        input:"form-control mr-sm-2 is-invalid",
        p2:"invalid-feedback",
        msg:errors.email
      }

    }else{
      emailState  = {
      p1:"form-group  has-success",
      input:"form-control mr-sm-2 is-valid",
      p2:"valid-feedback",
      msg:errors.email
    }
    }
    setEmailInput(emailState);
    setEmail(event.target.value);


  }
  function handlePasswordChange(event){
    let p1State = {};
    const values = {
      password:event.target.value,
    }
    let error = (validate(values));
    if(error.password){
        p1State  = {
        p1:"form-group has-danger",
        input:"form-control mr-sm-2 is-invalid",
        p2:"invalid-feedback",
        msg:errors.password
      }
    }
    else{
      p1State  = {
      p1:"form-group  has-success",
      input:"form-control mr-sm-2 is-valid",
      p2:"valid-feedback",
      msg:errors.email
    }
    }
    setPasswordInput(p1State);
    setPassword(event.target.value);
  }
  function handlePassword2Change(event){
    let p2State = {};
    const values = {
      password:document.getElementById("p1").value,
      password2:event.target.value
    }
    let error = (validate(values));

    if(error.password2){
        p2State  = {
        p1:"form-group has-danger",
        input:"form-control mr-sm-2 is-invalid",
        p2:"invalid-feedback",
        msg:error.password2
      }

    }
    else{
      p2State  = {
      p1:"form-group  has-success",
      input:"form-control mr-sm-2 is-valid",
      p2:"valid-feedback",
      msg:error.email
    }
    }
    setPassword2Input(p2State);
    setPassword2(event.target.value);
  }


  function handleSubmit(event) {
    event.preventDefault();
    const url = '/user/register';
    const user = {
      email: document.getElementById("email").value,
      password: document.getElementById("p1").value,
      password2:document.getElementById("p2").value,
      name:document.getElementById("name").value
    }

    let error = validate(user);

    if(Object.entries(error).length === 0 && error.constructor === Object){
      axios.post(url, user)
      .then(res =>{
        if(res.data.success){
          props.history.push('/login');
        }
      })
    } else {
      console.log(error);
    }

  }

  function handleLogin(event) {
    event.preventDefault();
    const url = '/user/authenticate';
    const user = {
      email: document.getElementById("email").value,
      password: document.getElementById("p1").value,
    }


      axios.post(url, user)
      .then(res =>{
        if(res.data.success){
          props.history.push('/');
        }
      })
  }





  return {
    handleLogin,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePassword2Change,
    name,
    email,
    password,
    password2,
    errors,
    isSubmitting,
    emailInput,
    passwordInput,
    password2Input,
    nameInput
  };
}

export default useFormValidation;
