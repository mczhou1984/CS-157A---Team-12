import React, {useState, useEffect, useCallback } from 'react';
// import './nav.css';
import auth from "../auth";
import {Link} from 'react-router-dom';

function NavButtonsList() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(auth.isAuthenticated())

useEffect(() =>{
  setIsAuthenticated(auth.isAuthenticated())
},[isAuthenticated])

console.log(auth.isAuthenticated())


  return (

    !isAuthenticated
    ?
    <ul class="navbar-nav mr-auto">
      <Link to="/login" class="nav-link">
        <li class="nav-item" onClick={() => {
            setIsAuthenticated(auth.isAuthenticated())
          }}>
          Login
        </li>
      </Link>
      <Link to="/register" class="nav-link" eventKey="link-1">
        <li class="nav-item">
          Register
        </li>
      </Link>
    </ul>
    :
    <ul class="navbar-nav mr-auto">
      <Link to="/login" class="nav-link" eventKey="link-1">
        <li class="nav-item" onClick={() => {
            auth.logout()
            setIsAuthenticated(auth.isAuthenticated())
          }}>
          Logout
        </li>
      </Link>
    </ul>
  )

}

function Nav() {

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link to="/" class="navbar-brand">Budgeted</Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <NavButtonsList/>
    </div>
  </nav>
);
}

export default Nav;
