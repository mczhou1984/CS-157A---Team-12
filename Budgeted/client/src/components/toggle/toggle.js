import React, {Fragment} from "react"
import {StyledToggle} from "./toggle.styled.js"

const Toggle = (props) => {
  return (<StyledToggle>
      <button id="toggle" onClick={props.click}>&#8801;</button>
  </StyledToggle>)
}

export default Toggle
