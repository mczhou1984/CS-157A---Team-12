import React, {useState, useEffect} from 'react';
import {StyledLogin} from './login.styled.js';
import useFormValidation from "../useFormValidation";
import validateAuth from "../validateAuth";
import styled from 'styled-components'


function Login() {
  const {
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
  } = useFormValidation(validateAuth);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

//console.log(email);
  return (
    <StyledLogin>
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

      <p class={emailInput.p1}>
      <input
      onChange={handleEmailChange}
      class={emailInput.input == null ? "form-control mr-sm-2": emailInput.input}
      type="text"
      name="email"
      placeholder="Enter Email"
      value={email}
      />
        <p class="invalid-feedback">{emailInput.msg}</p>
      </p>

      <p class={passwordInput.p1}>
      <input
      onChange={handlePasswordChange}
      class={passwordInput.input == null ? "form-control mr-sm-2": passwordInput.input}
      type="password"
      name="password"
      placeholder="Enter Password"
      value={password}
      id="p1"
      />
      <p class="invalid-feedback">{passwordInput.msg}</p>
    </p>

      <button type="submit" class="btn btn-primary" disabled={isSubmitting}>Login</button>
      </form>
    </div>


    </StyledLogin>
  );
}


export default Login;
