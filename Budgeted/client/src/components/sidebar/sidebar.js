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
        <hr/>
        <a button="button">
          Daily Budget
        </a>
                <hr/>
        <a button="button">
          Transactions
        </a>
                <hr/>
        <a button="button">
          Analysis
        </a>
      </div>
    </div>
  </StyledSidebar>)
}

export default Sidebar
