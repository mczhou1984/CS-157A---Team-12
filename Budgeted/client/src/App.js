import React, {Fragment, useState} from 'react'
import './App.css'
import Users from './components/users/users'
import Nav from './components/nav/nav'
import Register from './components/register/register'
import Login from './components/login/login'
import Home from './components/home/home'
import Budget from './components/budget'
import Dashboard from './components/dashboard/dashboard'
import Sidebar from './components/sidebar/sidebar'
import Toggle from './components/toggle/toggle'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {ProtectedRoute} from './components/protected.route'
import {PublicRoute} from './components/public.route'

  function App() {
    let styles = {
      background: 'rgb(2,0,36)',
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 8%, rgba(0,212,255,1) 100%)',
      position:'relative',
}
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const openHandler = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }

  let sidebar
  if (sidebarOpen) {
    sidebar = <Sidebar close={openHandler} sidebar={"sidebar"}/>
  }
  return (<header className="App-header">
    <div style={styles}></div>
    <Router>
      <Nav/>

        {sidebar}
        <Toggle click={openHandler}/>
      <Switch>
        <PublicRoute path="/" exact="exact" component={Users}/>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path="/register" component={Register}/>
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
        <ProtectedRoute path="/budget" component={Budget}/>
      </Switch>
    </Router>
  </header>);
}

export default App;
