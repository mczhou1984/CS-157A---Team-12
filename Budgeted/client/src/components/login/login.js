import React from 'react';
import {StyledLogin} from './login.styled.js';
import useFormValidation from "../useFormValidation";
import validateAuth from "../validateAuth";



function Login(props) {
  const {
    handleLogin,
    handleEmailChange,
    handlePasswordChange,
    email,
    password,
    isSubmitting,
    emailInput,
    passwordInput
  } = useFormValidation(validateAuth, props);
  return (
    <StyledLogin>
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>

      <p className={emailInput.p1}>
      <input
      onChange={handleEmailChange}
      className="form-control mr-sm-2"
      type="text"
      name="email"
      placeholder="Enter Email"
      value={email}
      id="email"
      />
        <p className="invalid-feedback">{emailInput.msg}</p>
      </p>

      <p className={passwordInput.p1}>
      <input
      onChange={handlePasswordChange}
      className="form-control mr-sm-2"
      type="password"
      name="password"
      placeholder="Enter Password"
      value={password}
      id="p1"
      />
      <p className="invalid-feedback">{passwordInput.msg}</p>
    </p>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
      </form>
    </div>


    </StyledLogin>
  );
}


export default Login;
