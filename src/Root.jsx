import React, { useEffect,useState } from 'react'
import App from './App'
import Preloader from './components/Preloader'
import { gsap } from 'gsap'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";

function Root() {
    const [loading,setLoading] = useState(true);
    const slideUp = ()=>{
        const tl = gsap.timeline();
        tl.to(".pre",{height:0,overflow:"hidden",duration:2,smoothOrigin:true})
          .call(setLoading,[false]);
    }
    useEffect(()=>{
        setTimeout(()=>{
        slideUp();
    },12000);  
    },[])
    return (
   <>
   <Preloader></Preloader>
   {!loading && (
    <Routes>
    <Route path='/' element={<App></App>}></Route>
    <Route path='/skills' element={<Skills></Skills>}></Route>
    <Route path='/experience' element={<Experience></Experience>}></Route>
    <Route path='/projects' element={<Projects></Projects>}></Route>
    </Routes>
   
  )}
  </>
  )
}

export default Root