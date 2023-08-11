import React, { useEffect, useState } from 'react'
import {gsap} from "gsap"
import { TweenLite } from 'gsap/gsap-core';
import { TweenMax } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';

function Navbar() {
  const [showMenu,setShowMenu] = useState(false);
  const animatedHide = (event)=>{
    let ele = document.getElementById("menuHead")
    let oldheight = ele.getBoundingClientRect().height;
    let newheight = oldheight ? 0:"auto"
    TweenMax.set("#menuHead",{height:newheight,overflow:"hidden"})
    console.log(newheight);
    TweenMax.from("#menuHead",0.2,{height:oldheight});
    console.log(oldheight);
    showAnimatedNavItems();
  }
  const showAnimatedNavItems = ()=>{
    let ele1 = document.querySelector(".navItems")
    let oldheight1 = ele1.getBoundingClientRect().height;
    let newheight1 = oldheight1 ? 0:"auto"
    TweenMax.set(".navItems",{height:newheight1})
    console.log(newheight1);
    TweenMax.from(".navItems",{height:oldheight1,delay:0.3});
    console.log(oldheight1);

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

