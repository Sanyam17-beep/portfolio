import React, { useEffect, useRef, useState } from 'react'
import {gsap} from "gsap"
import { ScrollTrigger } from 'gsap/all';
import {useNavigate} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

export const scrollAnimation = (showMenu,setShowMenu)=>{  
  let tl = gsap.timeline();
    tl.to(".navItems",{height:0},0.2)
    .to("#menuHead",{height:"auto",overflow:"hidden"},0.2)
  
  
  
  ScrollTrigger.create({
    animation:tl,
    trigger:"#hero",
      scroller:"#main",
      start:"bottom 15%",
      end:"top -3%",
      toggleActions: `restart none restart none`,
      // onEnter:()=>{
      //   if(showMenu)tl.play();
      //   setShowMenu(false);
      // },
      // onEnterBack:()=>{
      //   if(showMenu)tl.play();
      //   setShowMenu(false);
      // }
    }
  );

  

}

function Navbar({showMenu,setShowMenu,mobile,toggleMenu,setText,id}) {
  const navigate = useNavigate();

  const navigateHandler = (path)=>{
    console.log("ZOLO");
    navigate(path);
  }
  
  const animatedHide = (event)=>{
    if(window.innerWidth>1400){
      gsap.to("#menuHead",0,{height:0,overflow:"hidden"});
      gsap.to(".navItems",{height:"auto"});
      setShowMenu(!showMenu)
    }
    else{
      if(window.innerWidth<1400){
        let tl = gsap.timeline();
        tl.timeScale(2.5);
        tl.to(".sideContainer",{height:"100%"})
          .to("#mobileName",{height:"auto",overflow:"none"},">0")
          .to("#mobilemenuHead",{height:"auto",overflow:"none"},">0")
          .to(".mobileFooter",{height:"auto"},">0")
      }
     
    }
  }
  
  return (
    <nav className='outer-nav' data-scroll data-scroll-sticky data-scroll-target="#main">
    <div id={id}>
        <div id="Name"><a href="#">Sanyam</a></div>
        <div className="animatedClass">
        {<div className='navItems' style={{height:0,overflow:"hidden"}}>
            <ul className='skill_list'>
              <li className="my_items js-work-link"><span onClick={()=>navigateHandler('/skills')}>Skills</span><span className='underline'></span></li>
              <li className="my_items js-work-link" onClick={()=>navigateHandler('/experience')}>Experience<span className='underline'></span></li>
              <li className="my_items js-work-link" onClick={()=>navigateHandler('/projects')}>Projects<span className='underline'></span></li>
              <li className="my_items js-work-link" onClick={()=>navigateHandler('/contact')}>Contact<span className='underline'></span></li>
            </ul>
          </div>
        }

        {
          <div id="menu" onClick={(event)=>animatedHide(event)}>
            <h4 id="menuHead" className="js-work-link">Menu+<span className='underline'></span></h4>
          </div>
        }
        </div>
      </div>

    </nav>
  )
}

export default Navbar;

