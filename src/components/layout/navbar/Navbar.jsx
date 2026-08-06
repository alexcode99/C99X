import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from '../../../../src/assets/Home_Page_Assets/c99x-logo.png'
import HoverLetters from "./HoverLetters";
import "./Navbar.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

//Data
import ServicesData from '../../../pages/services/data/ServicesData'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isWidthed, setIsWidthed] = useState(false);

  //  NEW ADDED
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 476) {
        setIsWidthed(true);
      } else {
        setIsWidthed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -------------------
    const handleNavigation = (path) => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf("*");

    window.scrollTo(0, 0);

    navigate(path);
  };
  // ------------------- 

  // Desktop dropdown close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  //  UPDATED SCROLL LOGIC (background + hide/show navbar)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // background change (your existing logic)
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      //  hide / show navbar logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileLinkClick = (path) => {
    setMobileOpen(false);
    setMobileDropdown(false);
    setOpen(false);
    handleNavigation()
  };

  const handleMobileDropdownToggle = () => {
    setMobileDropdown((p) => !p);
  };

  return (
    <header
      className={`${isScrolled ? "header-nav" : "navbar"} ${showNavbar ? "nav-show" : "nav-hide"
        }`}
    >
      <div className={isWidthed ? "container-nav" : "cont-navbar"}>

        {/* Logo */}
        <div className="logo-section">
          <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav hide-on-mobile">
          <Link style={{ fontSize: '15px'}} to="/" onClick={handleMobileLinkClick}>
            <HoverLetters text="Home" />
          </Link>

          <div className="dropdown" ref={dropdownRef}>
            <div
              style={{ fontSize: '15px' }}
              className="dropbtn"
              onClick={() => setOpen((p) => !p)}
            >
              <HoverLetters text="Services" /> {open ? "▴" : "▾"}
            </div>

            <div style={{ background: "white" }}>
              <div className={`dropdown-content ${open ? "show" : ""}`}>
                {ServicesData.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    onClick={() => { setOpen(false); handleMobileLinkClick(); }}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/about" onClick={handleMobileLinkClick}>
            <HoverLetters text="About us" />
          </Link>

          <Link to="/contact" onClick={handleMobileLinkClick}>
            <HoverLetters text="Contact" />
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger show-on-mobile"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav-panel ${mobileOpen ? "show" : ""}`}>
        <nav>
          <Link to="/" onClick={handleMobileLinkClick}>HOME</Link>

          <div className="dropdown-mobile">
            <div className="dropbtn-mobile" onClick={handleMobileDropdownToggle}>
              SERVICES {mobileDropdown ? "▴" : "▾"}
            </div>

            <div className={`dropdown-content-mobile ${mobileDropdown ? "show" : ""}`}>
              {ServicesData.map((service) => (
                <Link
                  key={service.id}
                  to={`/Services/${service.slug ?? service.id}`}
                  onClick={handleMobileLinkClick}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/about" onClick={handleMobileLinkClick}>ABOUT US</Link>
          <Link to="/contact" onClick={handleMobileLinkClick}>CONTACT</Link>
        </nav>
      </div>
    </header>
  );
}

// import { useState, useRef, useEffect, useLayoutEffect } from "react";
// import { Link } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";
// import Logo from '../../../../src/assets/Home_Page_Assets/c99x-logo.png'
// import HoverLetters from "./HoverLetters";
// import "./Navbar.css";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// gsap.registerPlugin(ScrollToPlugin);
// //Data
// import ServicesData from '../../../pages/services/data/ServicesData'

// export default function Navbar() {
//   const [open, setOpen] = useState(false); // desktop dropdown
//   const [mobileOpen, setMobileOpen] = useState(false); // mobile nav panel
//   const [mobileDropdown, setMobileDropdown] = useState(false); // mobile dropdown
//   const dropdownRef = useRef(null);
//   // background color
//   const [isScrolled, setIsScrolled] = useState(false);
//   // responsive background color

// const [isWidthed, setIsWidthed] = useState(false);

// useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth >= 476) {
//       setIsWidthed(true);
//     } else {
//       setIsWidthed(false);
//     }
//   };

//   handleResize(); // initial check

//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, []);

//   // Desktop dropdown close on outside click
//   useEffect(() => {
//     const handleOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//     // ------------------
//   }, []);

//   // -----------------------------
//   useEffect(() => {
//   const handleScroll = () => {
//     if (window.scrollY > 100) {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }
//   };

//   window.addEventListener("scroll", handleScroll);

//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);
// // ---------------------------------

// //Scroll To Top
//  const cleanupGSAP = () => {
//   // Kill all ScrollTriggers
//   ScrollTrigger.getAll().forEach((trigger) => {
//     trigger.kill(true);
//   });

//   // Kill all GSAP animations
//   gsap.globalTimeline.clear();

//   // Remove leftover styles (pin, transform, etc.)
//   document.querySelectorAll("[style]").forEach((el) => {
//     if (el.style.transform) el.style.transform = "";
//     if (el.style.position === "fixed") el.style.position = "";
//   });
// }
// // ---------------------------------------------


// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // Kill all old ScrollTriggers
//     ScrollTrigger.getAll().forEach(t => t.kill());

//     // Scroll to top instantly
//     window.scrollTo(0, 0);

//   }, [pathname]);

//   return null;
// };
//   // -----------------------
//   function handleClickServices() {
//   gsap.to(window, {
//     duration: 0.8,
//     scrollTo: { y: 0 },
//     ease: "power2.out",
//   });
// }
// // ----------------------------------------
// const handleNavigation = (path) => {
//   ScrollTrigger.getAll().forEach((t) => t.kill());
//   gsap.killTweensOf("*");

//   window.scrollTo(0, 0);

//   navigate(path);
// };
// // const handleNavigation = (path) => {
// //   // 1. Kill all existing ScrollTriggers
// //   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

// //   // 2. Kill all GSAP tweens (optional but safer)
// //   gsap.killTweensOf("*");

// //   // 3. Scroll instantly to top
// //   window.scrollTo({
// //     top: 0,
// //     left: 0,
// //     behavior: "instant", // important (no smooth)
// //   });

// //   // 4. Navigate
// //   navigate(path);

// //   // 5. Recalculate after DOM update
// //   // setTimeout(() => {
// //   //   ScrollTrigger.refresh();
// //   // }, 100);
// // };
// // -------------------



//   // Mobile: close navbar when any link clicks
//   const handleMobileLinkClick = (path) => {

//     setMobileOpen(false);
//     setMobileDropdown(false);
//     setOpen(false);
//     handleNavigation();

//   };

//   // Mobile: toggle dropdown only (Servicess)
//   const handleMobileDropdownToggle = () => {
//     setMobileDropdown((p) => !p);
//   };

//   return (
    
//     <header className={isScrolled ? "header-nav" : "navbar"}>
//       {/* <div className="container-nav "> */}
//       <div className={isWidthed ? "container-nav" : "cont-navbar"}>
//         {/* Logo */}
//         <div className="logo-section">
//           <Link to="/">
//             <img src={Logo} alt="Logo" className="logo" />
//           </Link>
//           {/* <span className="brand-name">C99X</span> */}
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="nav hide-on-mobile">
//           <Link style={{fontSize:'15px', marginTop:'6px'}} to="/" onClick={handleMobileLinkClick} ><HoverLetters text="Home" /></Link>
//           <div className="dropdown" ref={dropdownRef}>
//             <div style={{fontSize:'15px'}} className="dropbtn" onClick={() => setOpen((p) => !p)}>
//               {/* SERVICES  */}
//               <HoverLetters text= "Services"/> {open ? "▴" : "▾"}
//             </div>

//             <div style={{background:"white"}}>
//               <div className={`dropdown-content ${open ? "show" : ""}`}>
//                 {ServicesData.map((service) => (
//                   <Link
//                     key={service.id}
//                     to={`/services/${service.slug}`}
//                     onClick={() => { setOpen(false); handleMobileLinkClick(); }}
//                   >
//                     {/* {service.title} */}
//                     {service.title}
//                     {/* <HoverLetters> {service.title}</HoverLetters> */}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//           </div>
//           <Link style={{fontSize:'15px', marginTop:'6px'}} to="/about" onClick={handleMobileLinkClick}><HoverLetters text="About us" /></Link>
//           {/* <Link style={{fontSize:'15px', marginTop:'6px'}} to="/blog" onClick={handleMobileLinkClick}>BLOG</Link> */}
//           <Link style={{fontSize:'15px', marginTop:'6px'}} to="/contact" onClick={handleMobileLinkClick}><HoverLetters text="Contact" />  </Link>
//         </nav>

//         {/* Desktop Phone Button */}
//         {/* <div className="phone-section hide-on-mobile">
//           <a href="tel:+916374510754" className="call-button"
//            onClick={() => {
//         window.open(
//           "https://wa.me/6374510754?text=I'm interested, I want to join the Services.",
//           "_blank"
//         );
//         }}
//            >
//             <span> Enroll now</span>
//           </a>
//         </div> */}

//         {/* Hamburger icon (shown only below 900px) */}
//         <button
//           className="hamburger show-on-mobile"
//           // style={{ backgroundColor: 'white', color: 'black' }}
//           aria-label="Open menu"
//           onClick={() => setMobileOpen((prev) => !prev)}
//         >
//           {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Nav Panel */}
//       <div className={`mobile-nav-panel ${mobileOpen ? "show" : ""}`}>
//         <nav>
//           <Link to="/" onClick={handleMobileLinkClick}>HOME</Link>
//           <div className="dropdown-mobile">
//             <div className="dropbtn-mobile" onClick={handleMobileDropdownToggle}>
//               SERVICES {mobileDropdown ? "▴" : "▾"}
//             </div>
//             <div className={`dropdown-content-mobile ${mobileDropdown ? "show" : ""}`}>
//               {ServicesData.map((Services) => (
//                 <Link
//                   key={Services.id}
//                   to={`/Services/${Services.slug ?? Services.id}`}
//                   onClick={handleMobileLinkClick}
//                 >
//                   {Services.title}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <Link to="/about" onClick={handleMobileLinkClick}>ABOUT US</Link>
//           {/* <Link to="/blog" onClick={handleMobileLinkClick}>BLOG</Link> */}
//           <Link to="/contact" onClick={handleMobileLinkClick}>CONTACT</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

