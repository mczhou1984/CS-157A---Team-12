import React from 'react';
import {StyledRegister} from './register.styled.js';
import useFormValidation from "../useFormValidation";
import validateAuth from "../validateAuth";


function Register(props) {
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
    isSubmitting,
    emailInput,
    passwordInput,
    password2Input,
    nameInput
  } = useFormValidation(validateAuth, props);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

//console.log(email);
  return (
    <StyledRegister>
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

      <p className={nameInput.p1}>
      <input
      onChange={handleNameChange}
      className={nameInput.input == null ? "form-control mr-sm-2": nameInput.input}
      type="text"
      name="name"
      placeholder="Enter Name"
      value={name}
      id="name"
      />
    </p>
      <p className={emailInput.p1}>
      <input
      onChange={handleEmailChange}
      className={emailInput.input == null ? "form-control mr-sm-2": emailInput.input}
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
      className={passwordInput.input == null ? "form-control mr-sm-2": passwordInput.input}
      type="password"
      name="password"
      placeholder="Enter Password"
      value={password}
      id="p1"
      />
      <p className="invalid-feedback">{passwordInput.msg}</p>
    </p>

          <p className={password2Input.p1}>
      <input
      onChange={handlePassword2Change}
      className={password2Input.input == null ? "form-control mr-sm-2": password2Input.input}
      type="password"
      name="password2"
      placeholder="Re-enter Password"
      value={password2}
      id="p2"
      />
      <p className="invalid-feedback">{password2Input.msg}</p>
    </p>



      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
      </form>
    </div>


    </StyledRegister>
  );
}


export default Register;
