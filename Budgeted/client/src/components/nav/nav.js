import React, {useState, useEffect } from 'react';
// import './nav.css';
import auth from "../auth";
import {Link} from 'react-router-dom';

function NavButtonsList() {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated())

useEffect(() =>{
  setIsAuthenticated(auth.isAuthenticated())
},[isAuthenticated])


  return (

    !isAuthenticated
    ?
    <ul className="navbar-nav mr-auto">
      <Link to="/login" className="nav-link">
        <li className="nav-item" onClick={() => {
            setIsAuthenticated(auth.isAuthenticated())
          }}>
          Login
        </li>
      </Link>
      <Link to="/register" className="nav-link" eventkey="link-1">
        <li className="nav-item">
          Register
        </li>
      </Link>
    </ul>
    :
    <ul className="navbar-nav mr-auto">
      <Link to="/budget" className="nav-link" eventkey="link-1">
        <li className="nav-item">
          Budget
        </li>
      </Link>
      <Link to="/login" className="nav-link" eventkey="link-1">
        <li className="nav-item" onClick={() => {
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{zIndex:9999}}>
    <Link to="/" className="navbar-brand">Budgeted</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <NavButtonsList/>
    </div>
  </nav>
);
}

export default Nav;
