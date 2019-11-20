import React, {Fragment, useState, useContext} from 'react'
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
      background: 'linear-gradient(to bottom, #7db9e8 0%, #207cca 71%, #1e5799 100%)',
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
    <body style={styles}>
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
    </body>
  </header>
);
}

export default App;
