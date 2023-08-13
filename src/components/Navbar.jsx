import React, { useEffect, useRef, useState } from 'react'
import {gsap} from "gsap"
import { TweenLite } from 'gsap/gsap-core';
import { TweenMax } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';

export const scrollAnimation = (showMenu,setShowMenu)=>{
  console.log("SGss",showMenu);
  
  let tl = gsap.timeline();
  tl.to(".navItems",{height:0})
    .to("#menuHead",{height:"auto",overflow:"hidden"},0)
  
  
  ScrollTrigger.create({
    animation:tl,
    trigger:"#hero",
      scroller:"#main",
      start:"bottom 15%",
      end:"top -3%",
      toggleActions: `restart none none restart`,
      onEnter:()=>{
        tl.play();
      },
      onEnterBack:()=>{
        tl.play();
      }
    }
  );

  

}

function Navbar({showMenu,setShowMenu}) {
  
  const animatedHide = (event)=>{
    gsap.to("#menuHead",0,{height:0,overflow:"hidden"});
    gsap.to(".navItems",{height:"auto"});
    setShowMenu(true);
  }
  
  return (
    <nav className='outer-nav' data-scroll data-scroll-sticky data-scroll-target="#main">
    <div id="nav">
        <div id="Name"><a href="#">Sanyam</a></div>
        <div className="animatedClass">
        {<div className='navItems' style={{height:0,overflow:"hidden"}}>
            <ul className='skill_list'>
              <li className="my_items js-work-link">Skills<span className='underline'></span></li>
              <li className="my_items js-work-link">Experience<span className='underline'></span></li>
              <li className="my_items js-work-link">Projects<span className='underline'></span></li>
              <li className="my_items js-work-link">Contact<span className='underline'></span></li>
            </ul>
          </div>
        }

        {
          <div id="menu" onClick={(event)=>animatedHide(event)}>
            <h4 id="menuHead" className="js-work-link">MENU+<span className='underline'></span></h4>
          </div>
        }
        </div>
      </div>

    </nav>
  )
}

export default Navbar;

