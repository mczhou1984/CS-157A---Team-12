import React from "react";

function useFormValidation(validate) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState({});
  const [passwordInput, setPasswordInput] = React.useState({});
  const [password2Input, setPassword2Input] = React.useState({});

  React.useEffect(() => {
    // if (isSubmitting) {
    //   const noErrors = Object.keys(errors).length === 0;
    //   if (noErrors) {
    //     console.log("authenticated!", email, password);
    //     setSubmitting(false);
    //   } else {
    //     setSubmitting(false);
    //   }
    // }
    console.log(emailInput);
  }, [email,emailInput]);

  function handleNameChange(event){
    setName(event.target.value);

  }

  function handleEmailChange(event){

        setEmail(event.target.value);
    let emailState = {};
    const values = {
      name:name,
      email:email,
      password:password,
      password2:password2
    }

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if(errors.email){
        emailState  = {
        p1:"form-group has-danger",
        input:"form-control mr-sm-2 is-invalid",
        p2:"invalid-feedback",
        msg:errors.email
      }

    }

    setEmailInput(emailState);


  }
  function handlePasswordChange(event){
    let p1State = {};
    const values = {
      name:name,
      email:email,
      password:password,
      password2:password2
    }
    const validationErrors = validate(values);
    setErrors(validationErrors);

    setPassword(event.target.value);
    if(errors.password){
        p1State  = {
        p1:"form-group has-danger",
        input:"form-control mr-sm-2 is-invalid",
        p2:"invalid-feedback",
        msg:errors.password
      }
    }
    setPasswordInput(p1State);
  }
  function handlePassword2Change(event){
    let p2State = {};
    const values = {
      name:name,
      email:email,
      password:password,
      password2:password2
    }

    const validationErrors = validate(values);
    setErrors(validationErrors);

    setPassword2(event.target.value);
    if(errors.password2){
        p2State  = {
        p1:"form-group has-danger",
        input:"form-control mr-sm-2 is-invalid",
        p2:"invalid-feedback",
        msg:errors.password2
      }

    }
    setPassword2Input(p2State);
  }


  function handleSubmit(event) {
    const values = {
      email: email,
      password: password,
      password2:password2
    }
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log(errors);
  }

  return {
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
    password2Input
  };
}

export default useFormValidation;
