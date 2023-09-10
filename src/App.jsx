import './App.css';
import React, { useEffect, useState, useRef } from "react";
import Hero from './components/Hero';
import { gsap, Power3 } from "gsap";
import { IoChatbubbleEllipses } from "react-icons/io5";
import LocomotiveScroll from 'locomotive-scroll';
import Navbar, { scrollAnimation } from './components/Navbar';
import Footer from './components/Footer';
import Transition from './transition/Transition';
// gsap.registerPlugin(ScrollTrigger);

function App({ mobileMenu, setMobileMenu, dateState, setDateState }) {

  const [showMenu, setShowMenu] = useState(null);
  const [loco, setLoco] = useState(null);

  const attachScrollEvent = (locoScroll) => {
    locoScroll.on("scroll", () => {
      let tl = scrollAnimation(showMenu, setShowMenu);
      tl.restart();
    })
  }

  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });

    setLoco(locoScroll);


    // ScrollTrigger.matchMedia({
    //   "(min-width:1400px)":function (){
    //     locoScroll.on( 'scroll', ( instance ) => {
    //       console.log("Scrolling....");
    //       ScrollTrigger.update();
    //       document.documentElement.setAttribute( 'data-scrolling', instance.direction );
    //     });
    //     ScrollTrigger.scrollerProxy("#main", {
    //       scrollTop(value) {
    //         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    //       }, 
    //       getBoundingClientRect() {
    //      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    //       },
    //       pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    //     });
    //     try{ ScrollTrigger.addEventListener( 'refresh', () => locoScroll.update() );
    //     ScrollTrigger.refresh();}
    //     catch(e){

    //     }

    //     scrollAnimation(showMenu,setShowMenu);
    //   },
    //   "(max-width:1400px)":()=>{console.log("Johny");}
    // })
    return () => {
      locoScroll.destroy();
    };
  }, []);
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);


  useEffect(() => {
    if (showMenu == null || showMenu == false) return;
    attachScrollEvent(loco);

  }, [showMenu])

  useEffect(() => {
    if (mobileMenu) return




    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;
    let timeout;

    const circleChaptaKaro = (dets) => {
      clearTimeout(timeout);

      xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
      yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

      xprev = dets.clientX;
      yprev = dets.clientY;

      circleMouseFollower(dets.clientX, dets.clientY, xscale, yscale);

      timeout = setTimeout(() => {
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
      }, 100);
    };

    const circleMouseFollower = (clientX, clientY, scaleX, scaleY) => {
      document.querySelector('#minicircle').style.transform = `translate(${clientX}px, ${clientY}px) scale(${scaleX}, ${scaleY})`;
    };

    window.addEventListener('mousemove', circleChaptaKaro);

    return () => {
      window.removeEventListener('mousemove', circleChaptaKaro);
      clearTimeout(timeout);
    };
  }, [mobileMenu]);

  useEffect(() => {
    if (window.innerWidth < 1400) {
      console.log("App.js wo");
      setMobileMenu(true);
    } else {
      if (mobileMenu) {
        console.log("kf4kf4");
        setMobileMenu(false);
      }
    }
  }, [window.innerWidth])
  return (
    <>
      {(
        <>

          <Transition>
          </Transition>

          <div className="App">
            <div id="side"> <IoChatbubbleEllipses id='ico' ></IoChatbubbleEllipses>
              <a href="https://drive.google.com/file/d/1TwE88G_fy0x3Q60NFUfIK9sgOSLrrmXA/view?usp=sharing" target="_blank"><div id="resume">Resume</div></a>
            </div>
            <div id="minicircle"></div>
            <div id="main" data-scroll-container data-scroll-speed="2">
              <Navbar showMenu={showMenu} setShowMenu={setShowMenu} mobile={mobileMenu} toggleMenu={setMobileMenu} id="nav"></Navbar>
              <Hero></Hero>
              <Footer dateState={dateState}></Footer>
            </div>
          </div>



        </>
      )}

    </>
  );
}

export default App;
