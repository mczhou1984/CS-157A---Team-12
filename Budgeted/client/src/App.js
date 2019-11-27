import React, {useState} from 'react'
import './App.css'
import Users from './components/users/users'
import Nav from './components/nav/nav'
import Register from './components/register/register'
import Login from './components/login/login'
import {Budget,BudgetModal} from './components/budget/budget'
import {Dashboard, TransactionModal} from './components/dashboard/dashboard'
import Sidebar from './components/sidebar/sidebar'
import Toggle from './components/toggle/toggle'
import Analysis from './components/analysis/analysis'
import Transactions from './components/transactions/transactions'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {ProtectedRoute} from './components/protected.route'
import {PublicRoute} from './components/public.route'




  function App() {



//     let styles = {
//       background: 'linear-gradient(to bottom, #7db9e8 0%, #207cca 71%, #1e5799 100%)',
//       position:'relative',
// }
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
  return (<div className="App-header">

    <Router>
      <Nav/>
        {sidebar}
        <TransactionModal/>
                <BudgetModal/>


        <Toggle click={openHandler}/>
      <Switch>
        <PublicRoute path="/" exact="exact" component={Users}/>
        <PublicRoute path="/login" component={Login}/>
        <PublicRoute path="/register" component={Register}/>
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
        <ProtectedRoute path="/budget" component={Budget}/>
        <ProtectedRoute path="/transactions" component={Transactions}/>
        <ProtectedRoute path="/analysis" component={Analysis}/>
      </Switch>
    </Router>
  </div>
);
}

export default App;
