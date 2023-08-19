import React from 'react'
import Footer from './Footer'
import { gsap } from 'gsap'


function SideBar({dateState,id,backgroundColor,setBackgroundColor}) {
    const slideUp = ()=>{
        let tl = gsap.timeline();
        tl.timeScale(2.5);
        tl.to(".mobileFooter",0.6,{height:0})
          .to("#mobileName",{height:0,overflow:"hidden"},"<0.3")
          .to("#mobilemenuHead",{height:0,overflow:"hidden"},"<0")
          .to(".sideContainer",2,{height:0,duration:2},"<0")
    }
  return (
    <div className="sideContainer">
    <div className='sideBar'>
        <div className="top">
            
        <div id={id}>
        <div id="mobileName"><a href="#">Sanyam</a></div>
        <h4 id="mobilemenuHead" className="js-work-link" onClick={slideUp}>Close<span className='underline'></span></h4>
        </div>
        </div>
        <div className="coverMobileSkills">
        <ul className="mobileItems">
            <li className="mobileSkills">Skills</li>
            <li className="mobileSkills">Experience</li>
            <li className="mobileSkills">Projects</li>
            <li className="mobileSkills">Contact</li>
        </ul>
        </div>
        <div className="mobilefooter">
        <div id="mobfooter">
        <div id="mobilefooterleft">
            <div className='mobileFooter'>
              <h5>2023 &copy;</h5>
            </div>
            <div className='mobileFooter'>
            <h5>{dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            
            })} IST</h5>
            </div>
        </div>
    </div>
        </div>
    </div>
    </div>
  )
}

export default SideBar;