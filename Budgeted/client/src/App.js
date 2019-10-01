import React from 'react';
import './App.css';
import Users from './components/users/users';
import Nav from './components/nav/nav';
import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (<header className="App-header">
    <Router>
      <Nav/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </Router>
  </header>);
}

export default App;
