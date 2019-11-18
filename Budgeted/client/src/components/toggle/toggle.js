import React, {Fragment} from "react"
import {StyledToggle} from "./toggle.styled.js"

 const Toggle = (props) => {
   return(
     <StyledToggle>
       <Fragment>
        <button id="toggle" onClick={props.click}>&#8801;</button>
       </Fragment>
     </StyledToggle>

   )
 }

 export default Toggle
