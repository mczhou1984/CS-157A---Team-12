import React, {useState, useEffect} from 'react';
import './nav.css';
import {Link} from 'react-router-dom';

function Nav() {

  return (<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link to="/" class="navbar-brand">Budgeted</Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <Link to="/login" class="nav-link">
          <li class="nav-item">
            Login
          </li>
        </Link>
        <Link to="/register" class="nav-link" eventKey="link-1">
          <li class="nav-item">
            Register
          </li>
        </Link>

      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search"/>
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>);
}

export default Nav;
