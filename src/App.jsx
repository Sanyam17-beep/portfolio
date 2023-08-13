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
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [dateState, setDateState] = useState(new Date());
  const [showMenu,setShowMenu] = useState(null);
  const [loading,isLoading] = useState(true);
  const slideUp = ()=>{
    const tl = gsap.timeline();
    tl.to(".pre",{height:0,overflow:"hidden",duration:2,smoothOrigin:true})
      .call(isLoading,[false]);
  }
  useEffect(() => {
    if(loading)return;
    console.log("Zukabee");
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true
    });

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
    ScrollTrigger.addEventListener( 'refresh', () => locoScroll.update() );
    ScrollTrigger.refresh();
    scrollAnimation(showMenu,setShowMenu);
    return () => {
      locoScroll.destroy();
    };
  }, [loading]);
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, [loading]);
    
  useEffect(() => {
    if(loading)return
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
    };
  }, [loading]);
  useEffect(() => {
    if(loading)return
    function firstPageAnim() {
      var tl = gsap.timeline();

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
  }, [loading]);
  useEffect(()=>{
    if(loading)return
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
  },[loading])
  useEffect(()=>{
    console.log("Hey babde");
    setTimeout(slideUp,12000);
  },[])
  return (
    <>   
    {loading && <Preloader></Preloader>} 
    {loading===false && (
      <div className="App">
      <div id="side"> <IoChatbubbleEllipses id='ico' ></IoChatbubbleEllipses>
        <a href="https://drive.google.com/file/d/1TwE88G_fy0x3Q60NFUfIK9sgOSLrrmXA/view?usp=sharing" target="_blank"><div id="resume">Resume</div></a>
      </div>
      <div id="minicircle"></div>
      <div id="main" data-scroll-container data-scroll-speed="2">
      <div id="hero">
      <Navbar showMenu={showMenu} setShowMenu={setShowMenu} ScrollTrigger={ScrollTrigger}></Navbar>
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
            <Skills></Skills>
            <Experience></Experience>
            <Projects></Projects>
        </div>
      <About src={loh}></About>
      <Footer dateState={dateState}></Footer>
    </div>
    </div>
    )}
  </>
  );
}

export default App;
