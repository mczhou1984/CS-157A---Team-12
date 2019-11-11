import React from 'react'
import './App.css'
import Users from './components/users/users'
import Nav from './components/nav/nav'
import Register from './components/register/register'
import Login from './components/login/login'
import Home from './components/home/home'
import Income from './components/income'
import Expenses from './components/expenses'
import Dashboard from './components/dashboard/dashboard'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ProtectedRoute } from './components/protected.route'
import { PublicRoute } from './components/public.route'

function App() {
  return (<header className="App-header">
      <div style={{background: 'linear-gradient(to bottom, #1e5799 0%,#2989d8 50%,#207cca 100%,#7db9e8 100%)'}}></div>
    <Router>
      <Nav/>
      <Switch>
        <PublicRoute path="/" exact component={Users}/>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path="/register" component={Register}/>
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
        <ProtectedRoute path="/income" component={Income}/>
        <ProtectedRoute path="/expenses" component={Expenses}/>
      </Switch>
    </Router>
  </header>);
}

export default App;
