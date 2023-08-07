import './App.css';
import React, { useEffect,useRef,useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {IoArrowDownSharp,IoChatbubbleEllipses} from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import loh from './loh.jpeg';
import LocomotiveScroll from 'locomotive-scroll';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Clients from './components/Clients';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import About from './components/About';
import Footer from './components/Footer';
gsap.registerPlugin(ScrollTrigger);
function App() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
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
  }, []);

  return (
    <div className="App">
      <div id="side"> <IoChatbubbleEllipses id='ico' ></IoChatbubbleEllipses>
        <a href="https://drive.google.com/file/d/1TwE88G_fy0x3Q60NFUfIK9sgOSLrrmXA/view?usp=sharing" target="_blank"><div id="resume">Resume</div></a>
      </div>
      <div id="minicircle"></div>
      <div id="main">
      <div id="hero">
            <Navbar></Navbar>
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
  );
}

export default App;
