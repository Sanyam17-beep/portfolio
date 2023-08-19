import React from 'react'
import Transition from '../transition/Transition';
import {useNavigate} from "react-router-dom";
function Skills() {
  const navigate = useNavigate();

  const navigateHandler = (path)=>{
    console.log("ZOLO");
    navigate(path);
  }
  return (
    <>
 <Transition>
    </Transition>
 <div className='dabba'>
 <span onClick={()=>navigateHandler('/')}>projects</span>
 </div>

    </>
  )
}

export default Skills;