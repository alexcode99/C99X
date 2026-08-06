import { useState,  } from 'react'
import './App.css'
import Navbar from './components/layout/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import _ScrollTrigger from 'gsap/ScrollTrigger'
//pages
import Home from './pages/home/Home'
import Footer from './components/layout/Footer/Footer'
import AboutSection from './pages/home/aboutsection/AboutSection'
import Contact from './pages/contact/Contact'
import About from './pages/about/About'
import Services from './pages/services/Services'
import ScrollManager from './components/layout/navbar/ScrollManager'
import MouseFollower from "./components/mouse/Cursor"
import GlobalClickSpark from './components/click/click'
import { HelmetProvider } from "react-helmet-async";
import PrivacyPolicy from './components/layout/privacy/PrivacyPolicy'
function App() {
 
  const useCleanGSAP = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);
};


  return (
    <>
    <HelmetProvider>
      <BrowserRouter>
      {/* <ScrollManager/> */}
      
      <Navbar/>
      <MouseFollower/>
      <GlobalClickSpark/>
        <Routes>
          {/* <Route path='/' element={<Navbar/>}/> */}
          <Route path='/' element={<Home/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path= '/about' element={<About/>}/>
          <Route path="/services/:slug" element={<Services/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          {/* <Route path='/contact' element={<AboutSection/>}/> */}
        </Routes>
        {/* <About/> */}
        <Footer/>
      </BrowserRouter>
    </HelmetProvider>
    </>
  )
}

export default App
