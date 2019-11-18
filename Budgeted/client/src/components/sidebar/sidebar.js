import React, {useState} from "react"
import {StyledSidebar} from './sidebar.styled.js'

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
        <a button="button">
          Balance
        </a>
        <a button="button">
          Daily Budget
        </a>
        <a button="button">
          Transactions
        </a>
        <a button="button">
          Analysis
        </a>
      </div>
    </div>
  </StyledSidebar>)
}

export default Sidebar
