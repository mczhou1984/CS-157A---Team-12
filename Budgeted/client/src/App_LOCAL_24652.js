import React, {Fragment, useState} from 'react'
import './App.css';
import Users from './components/users/users';
import Nav from './components/nav/nav';
import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import Sidebar from './components/sidebar/sidebar'
import Toggle from './components/toggle/toggle'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
 const openHandler = () => {
   if (!sidebarOpen) {
     setSidebarOpen(true)
   } else {
     setSidebarOpen(false)
   }
 }
 const sidebarCloseHandler = () => {
   setSidebarOpen(false)
 }
 let sidebar
 if (sidebarOpen) {
   sidebar = <Sidebar close={sidebarCloseHandler} sidebar={"sidebar"}/>
 }
  return (<header className="App-header">
      <div style={{background: 'linear-gradient(to bottom, #1e5799 0%,#2989d8 50%,#207cca 100%,#7db9e8 100%)'}}></div>
    <Router>
      <Nav/>
      <Fragment>
        {sidebar}
        <Toggle click = {openHandler}/>
      </Fragment>
      <Switch>
        <Route path="/" exact component={Users}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </Router>
  </header>);
}

export default App;