import React, { useState } from "react"
import "./sidebar.css"

const Sidebar = (props) => {
  const [sidebarClass, setSidebarClass] = useState(props.sidebar)
  const closeHandler = (e) => {
    e.preventDefault()
    setSidebarClass("sidebar close")
    props.close()
  }
  return (
    <div className={sidebarClass}>
    <div className="btn-group">
      <a button="#close" onClick ={closeHandler}>
        &times;close
      </a>
      <a button> Balance </a>
      <a button> Daily Budget </a>
      <a button> Transactions </a>
      <a button> Analysis </a>
      </div></div>
  )
}

export default Sidebar
