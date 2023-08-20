import './App.css';
import React, { useEffect,useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {IoArrowDownSharp,IoChatbubbleEllipses} from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import loh from './loh.jpeg';
import LocomotiveScroll from 'locomotive-scroll';
import Navbar,{scrollAnimation} from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Clients from './components/Clients';
import About from './components/About';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import SideBar from './components/SideBar';
import Transition from './transition/Transition';
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [dateState, setDateState] = useState(new Date());
  const [showMenu,setShowMenu] = useState(null);
  const [mobileMenu,setMobileMenu] = useState(false);
  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true,
      smartphone:{
        smooth:true
      },
      tablet:{
        smooth:true
      }
    });

    
    ScrollTrigger.matchMedia({
      "(min-width:1400px)":function (){
        locoScroll.on( 'scroll', ( instance ) => {
          ScrollTrigger.update();
          document.documentElement.setAttribute( 'data-scrolling', instance.direction );
        });
        ScrollTrigger.scrollerProxy("#main", {
          scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
          }, 
          getBoundingClientRect() {
         return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
          },
          pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
        });
        try{ ScrollTrigger.addEventListener( 'refresh', () => locoScroll.update() );
        ScrollTrigger.refresh();}
        catch(e){

        }
       
        scrollAnimation(showMenu,setShowMenu);
      },
      "(max-width:1400px)":()=>{console.log("Johny");}
    })
    return () => {
      locoScroll.destroy();

    };
  }, []);
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);
    
  useEffect(() => {
    if(mobileMenu)return
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
    // if(loading)return
    function firstPageAnim() {
      let tl = gsap.timeline();

      tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut",
      })
        .to(".boundingelem", {
          y: 0,
          ease: "expo.inOut",
          duration: 2,
          delay: -1,
          stagger: 0.2,
        })
        .from("#herofooter", {
          y: -10,
          opacity: 0,
          duration: 1.5,
          delay: -1,
          ease: "expo.inOut",
        });
    }

    firstPageAnim();
  }, []);
  useEffect(()=>{
    function enterAnimation(link, e, index) {
      link.tl.tweenFromTo(0, "midway");
    }
    
    // Mouseleave function
    function leaveAnimation(link, e) {
      link.tl.play();
    }
    
   
    // Get all links
    let workLinks = document.querySelectorAll(".js-work-link");
    
    workLinks.forEach((link, index, value) => {
      let underline = link.querySelector(".underline");
      link.tl = gsap.timeline({paused: true});
      
      link.tl.fromTo(underline, {
        width: "0%",
        left: "0%",
      }, {
        width: "100%",
        duration: 0.2,
      });
      
      link.tl.add("midway");
      
      link.tl.fromTo(underline, {
        width: "100%",
        left: "0%",
      }, {
        width: "0%",
        left:"100%",
        duration: 0.2, 
        immediateRender: false
      });
    
      // Mouseenter
      console.log(link.tl);
      link.addEventListener("mouseenter", (e) => {
        enterAnimation(link, e, index);
      });
    
      // Mouseleave
      link.addEventListener("mouseleave", (e) => {
        leaveAnimation(link, e);
      });
      return ()=>{
        link.removeEventListener("mouseenter", (e) => {
          enterAnimation(link, e, index);
        });
      
        // Mouseleave
        link.removeEventListener("mouseleave", (e) => {
          leaveAnimation(link, e);
        });
      }
    });
  },[])
  
  useEffect(()=>{
    if(window.innerWidth<1400){
      setMobileMenu(true);
    }else{
      if(mobileMenu){
        setMobileMenu(false);
      }
    }
  },[window.innerWidth])
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
      <div id="hero">
            <HeroBanner></HeroBanner>
            <div id="chhotiheadings">
                <div class="bounding">
                    <h5 class="boundingelem moi">available for freelance</h5>
                </div>
                <div class="bounding">
                    <h5 class="boundingelem moi oo">work for web</h5>
                </div>
            </div>
            <Clients></Clients>
            <div id="herofooter">
                <a href="#">Working with MERN<FiArrowUpRight></FiArrowUpRight></a>
                <a href="#">Developing Projects<FiArrowUpRight></FiArrowUpRight></a>
                <div id="iconset">
                    <div class="circle"> <IoArrowDownSharp></IoArrowDownSharp> </div>
                    <div class="circle"> <IoArrowDownSharp></IoArrowDownSharp> </div>
                </div>
            </div>
      </div>
      <div id="second">
        <div class="elem">
          <h1>SKILLS</h1>
          <h2>+</h2>
          <div class="center14"></div>
        </div>
        <div class="elem">
          <h1>SKILLS</h1>
          <h2>+</h2>
          <div class="center14"></div>
        </div>
        <div class="elem elemlast">
          <h1>SKILLS</h1>
          <h2>+</h2>
          <div class="center14"></div>
        </div>
      </div>
      <About src={loh}></About>
      <Footer dateState={dateState}></Footer>
    </div>
    {mobileMenu && (
      <SideBar dateState={dateState} id="sidenav"></SideBar>
    )}
    </div>
    </>
    )}
    
  </>
  );
}

export default App;
