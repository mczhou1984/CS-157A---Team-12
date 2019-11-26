import React, {useState} from "react"
import {StyledSidebar} from './sidebar.styled.js'
import {Link} from 'react-router-dom';

  const Sidebar = (props) => {
  const [sidebarClass, setSidebarClass] = useState(props.sidebar)
  const closeHandler = (e) => {
    e.preventDefault()
    setSidebarClass("sidebar close")
    props.close()
  }
  return (<StyledSidebar>
    <div className={sidebarClass}>
      <a class="closebtn" onClick={closeHandler}>
        &times;
      </a>
      <div className="btn-group">
        <Link to="/dashboard" className="nav-link" eventkey="link-1">
          <a button="button">
          Dashboard
          </a>
        </Link>
        <hr/>
        <Link to="/budget" className="nav-link" eventkey="link-1">
          <a button="button">
          Daily Budget
          </a>
        </Link>
                <hr/>
        <Link to="/transactions" className="nav-link" eventKey="link-1">
          <a button="button">
          Transactions
          </a>
        </Link>
                <hr/>
        <Link to="/Analysis" className="nav-link" eventKey="link-1">
          <a button="button">
          Analysis
          </a>
        </Link>
      </div>
    </div>
  </StyledSidebar>)
}

export default Sidebar
