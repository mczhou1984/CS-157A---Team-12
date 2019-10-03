import React, {useState, useEffect} from 'react';
import {StyledRegister} from './register.styled.js';
import useFormValidation from "../useFormValidation";
import validateAuth from "../validateAuth";
import styled from 'styled-components'


function Register() {
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
    <StyledRegister>
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

      <p class={nameInput.p1}>
      <input
      onChange={handleNameChange}
      class={nameInput.input == null ? "form-control mr-sm-2": nameInput.input}
      type="text"
      name="name"
      placeholder="Enter Name"
      value={name}
      />
    </p>
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

          <p class={password2Input.p1}>
      <input
      onChange={handlePassword2Change}
      class={password2Input.input == null ? "form-control mr-sm-2": password2Input.input}
      type="password"
      name="password2"
      placeholder="Re-enter Password"
      value={password2}
      />
      <p class="invalid-feedback">{password2Input.msg}</p>
    </p>



      <button type="submit" class="btn btn-primary" disabled={isSubmitting}>Register</button>
      </form>
    </div>


    </StyledRegister>
  );
}


export default Register;
