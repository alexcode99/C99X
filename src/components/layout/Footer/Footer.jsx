
// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// // import { EmailJSResponseStatus } from "emailjs-com";
// import emailjs from "@emailjs/browser";
// import {
//   FiFacebook,
//   FiInstagram,
//   FiYoutube,
//   FiLinkedin,
//   FiMail,
//   FiPhone,
// } from "react-icons/fi";
// import { BsTwitterX } from "react-icons/bs";
// import { GoLocation } from "react-icons/go";
// // import FooterLogo from "../../../assets/FooterImages/C99_Logo.png";

// import "./Footer.css";
// //Logo
// import Logo from '../../../../src/assets/Home_Page_Assets/c99x-logo.png'
// // import emailjs from "@emailjs/browser";

// export default function Footer() {
//   const form = useRef();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleClickCourse = () => {
//     gsap.to(window, {
//       duration: 0.8,
//       scrollTo: { y: 0 },
//       ease: "power2.out",
//     });
//   };

//   const handleSubscribe = (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       alert("Please enter your email");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);

//     emailjs
//       .sendForm(
//         "service_icjk6ij",
//         "template_gzq7m7k",
//         form.current,
//         "7KNgkOy42QirCM1Lr"
//       )
//       .then(() => {
//         alert("Subscribed Successfully!");
//         setEmail("");
//         form.current.reset();
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log("EmailJS Error:", error);
//         alert("Subscription Failed!");
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <footer className="site-footer-f">
//       <div className="footer-inner-f">
//         {/* Logo + Tagline */}
//         <div className="footer-left-f">
//           <div className="logo-stack-f">
//             <img src={Logo} alt="Code99 Logo" className="site-logo-f" />
//             {/* <h3>C99X</h3> */}     
//           </div>
//           <p className="tagline-f">
//             {/* Education should be free — we just maintain the space that makes it
//             possible. */}
//             Subscribe for our newsletter
            
//           </p>
//           {/* <div className="Subscribe">
//                 <input type="text" placeholder="Your Email" className="subs-input" /> 
//                 <button className="subs-button">Subscribe</button>
//           </div> */}
//          <form
//             ref={form}
//             onSubmit={handleSubscribe}
//             className="Subscribe"
//           >
//             <input
//               type="email"
//               name="user_email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="subs-input"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="subs-button"
//             >
//               {loading ? "Sending..." : "Subscribe"}
//             </button>
//           </form>
//             <p className="tagline-f">Your Information is never disclosed to third parties.</p>
//             <div className="icon-list-subs">
                
//                     <a href="https://www.facebook.com/code99itacademy/" target="_blank" rel="noreferrer"><FiFacebook /> </a>
//                     <a href="https://www.instagram.com/code99_it_academy/" target="_blank" rel="noreferrer"><FiInstagram /> </a>
//                     <a href="https://x.com/code99training" target="_blank" rel="noreferrer"><BsTwitterX /> </a>
//                     <a href="https://www.youtube.com/@Code99ITAcademy" target="_blank" rel="noreferrer"><FiYoutube /> </a>
//                     <a href="https://www.linkedin.com/company/code99itacademy/" target="_blank" rel="noreferrer"><FiLinkedin /> </a>
                
//             </div>
//         </div>

//         {/* Courses + Nav Links (side by side) */}
//         <div className="footer-course-nav-f">
//           <div className="col-f col-courses-f">
//             <h4 className="col-head">Services</h4>
//             <ul>
//               <li><Link to="services/digital-marketing" onClick={handleClickCourse} className="content_font">Digital Marketing</Link></li>
//               <li><Link to="services/web-development" onClick={handleClickCourse} className="content_font">Web Development</Link></li>
//               <li><Link to="services/e-commerce" onClick={handleClickCourse} className="content_font">E-Commerce Website</Link></li>
//               <li><Link to="services/design-video-editing" onClick={handleClickCourse} className="content_font">Design & Video Editing</Link></li>
//               <li><Link to="services/ui-ux-designing" onClick={handleClickCourse} className="content_font">UI & UX Design</Link></li>
//               <li><Link to="services/web-application" onClick={handleClickCourse} className="content_font">Web Application</Link></li>
//             </ul>
//           </div>

//           <div className="col-f col-navlink-f">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><Link to="/" onClick={handleClickCourse} className="content_font">Home</Link></li>
//               <li><Link to="about" onClick={handleClickCourse} className="content_font">About</Link></li>
//               {/* <li><Link to="services/digital-marketing" onClick={handleClickCourse} className="content_font">Services</Link></li> */}
//               <li><Link to="contact" onClick={handleClickCourse} className="content_font">Contact</Link></li>
//               <li><Link to="Privacy" onClick={handleClickCourse} className="content_font">Privacy Policy</Link></li>
//             </ul>
//           </div>
//           {/* Contact */}
//           <div className="col-f col-getin-f">
//             <h4>Get In Touch</h4>
//             <ul className="contact-list-f">
//               <li className="content_font"> No 16, 1st floor, Sarathy Nagar,<br />Opp To Vijaya Nagar Bus Stop, Velachery,<br />Chennai - 600 042.</li>
//               <li className="content_font"><a href="mailto:c99x.official@gmail.com">c99x.official@gmail.com</a></li>
//               <li className="content_font"><a href="tel:6374510754">+91 63 745 10 754</a></li>
//             </ul>
//           </div>
          
//         </div>

//         {/* Social Media */}
//         {/* <div className="col-f col-social-f">
//           <h4>Social Media</h4>
//           <ul className="icon-list-f">
//             <li><a href="https://www.facebook.com/code99itacademy/" target="_blank" rel="noreferrer"><FiFacebook /> Facebook</a></li>
//             <li><a href="https://www.instagram.com/code99_it_academy/" target="_blank" rel="noreferrer"><FiInstagram /> Instagram</a></li>
//             <li><a href="https://x.com/code99training" target="_blank" rel="noreferrer"><BsTwitterX /> X</a></li>
//             <li><a href="https://www.youtube.com/@Code99ITAcademy" target="_blank" rel="noreferrer"><FiYoutube /> YouTube</a></li>
//             <li><a href="https://www.linkedin.com/company/code99itacademy/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></li>
//           </ul>
//         </div> */}

//         {/* Contact */}
//         {/* <div className="col-f col-getin-f">
//           <h4>Get In Touch</h4>
//           <ul className="contact-list-f">
//             <li> No 16, 1st floor, Sarathy Nagar,<br />Opp To Vijaya Nagar Bus Stop, Velachery,<br />Chennai - 600 042.</li>
//             <li><a href="mailto:info@code99itacademy.com">info@code99itacademy.com</a></li>
//             <li><a href="tel:6374510754">+91 63 745 10 754</a></li>
//           </ul>
//         </div> */}
//       </div>

//       <div className="footer-bottom-f">
       
//         <div className="divider-footer-f" />
        
//         <div className="divider-footer-content">
//           <div>
//           <img src={Logo} alt="" />
//           </div>

//           <div>
//             <ul className="divider-footer-ul">
//               <li className="divider-footer-list">© 2026 C99X. All Rights Reserved</li>
//               <li className="divider-footer-list">Best Digital Marketing  Agency in Chennai</li>
//             </ul>
//           </div>
//         </div>
       
//       </div>
//     </footer>

//     </>
//   );
// }



// // footer/Footer.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FiFacebook,
//   FiInstagram,
//   FiYoutube,
//   FiLinkedin,
//   FiMail,
//   FiPhone,
// } from "react-icons/fi";
// import { BsTwitterX } from "react-icons/bs";
// import { GoLocation } from "react-icons/go";
// // import FooterLogo from "../../../assets/FooterImages/C99_Logo.png";

// import "./Footer.css";
// //Logo
// import Logo from '../../../../src/assets/Home_Page_Assets/c99x-logo.png'
// export default function Footer() {
//   const handleClickCourse = () => {
//     // window.scrollTo({ top: 0, behavior: "smooth" });
//     gsap.to(window, {
//     duration: 0.8,
//     scrollTo: { y: 0 },
//     ease: "power2.out",
//   });
//   };
//   const handleSubscribe = (e) => {
//   e.preventDefault();

//   if (!email.trim()) {
//     alert("Please enter your email");
//     return;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailRegex.test(email)) {
//     alert("Please enter a valid email address");
//     return;
//   }

//   setLoading(true);

//   // const form = useRef();
//   // const [email, setEmail] = useState("");
//   // const [loading, setLoading] = useState(false);

// //   emailjs
// //     .sendForm(
// //       "service_icjk6ij",
// //       "template_gzq7m7k",
// //       form.current,
// //       "7KNgkOy42QirCM1Lr"
// //     )
// //     .then(() => {
// //       alert("Subscribed Successfully!");
// //       setEmail("");
// //       form.current.reset();
// //       setLoading(false);
// //     })
// //     .catch((error) => {
// //       console.log("EmailJS Error:", error);
// //       alert("Subscription Failed!");
// //       setLoading(false);
// //     });
// // };

// //    function handleClickServices() {
// //   gsap.to(window, {
// //     duration: 0.8,
// //     scrollTo: { y: 0 },
// //     ease: "power2.out",
// //   });
// // }
//   const form = useRef();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       alert("Please enter your email");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);

//     emailjs
//       .sendForm(
//         "service_icjk6ij",
//         "template_gzq7m7k",
//         form.current,
//         "7KNgkOy42QirCM1Lr"
//       )
//       .then(() => {
//         alert("Subscribed Successfully!");
//         setEmail("");
//         form.current.reset();
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log("EmailJS Error:", error);
//         alert("Subscription Failed!");
//         setLoading(false);
//       });
//   };


//   return (
    // <footer className="site-footer-f">
    //   <div className="footer-inner-f">
    //     {/* Logo + Tagline */}
    //     <div className="footer-left-f">
    //       <div className="logo-stack-f">
    //         <img src={Logo} alt="Code99 Logo" className="site-logo-f" />
    //         {/* <h3>C99X</h3> */}     
    //       </div>
    //       <p className="tagline-f">
    //         {/* Education should be free — we just maintain the space that makes it
    //         possible. */}
    //         Subscribe for our newsletter
            
    //       </p>
    //       {/* <div className="Subscribe">
    //             <input type="text" placeholder="Your Email" className="subs-input" /> 
    //             <button className="subs-button">Subscribe</button>
    //       </div> */}
    //      <form
    //         ref={form}
    //         onSubmit={handleSubscribe}
    //         className="Subscribe"
    //       >
    //         <input
    //           type="email"
    //           name="user_email"
    //           placeholder="Your Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />

    //         <button
    //           type="submit"
    //           disabled={loading}
    //         >
    //           {loading ? "Sending..." : "Subscribe"}
    //         </button>
    //       </form>
    //         <p className="tagline-f">Your Information is never disclosed to third parties.</p>
    //         <div className="icon-list-subs">
                
    //                 <a href="https://www.facebook.com/code99itacademy/" target="_blank" rel="noreferrer"><FiFacebook /> </a>
    //                 <a href="https://www.instagram.com/code99_it_academy/" target="_blank" rel="noreferrer"><FiInstagram /> </a>
    //                 <a href="https://x.com/code99training" target="_blank" rel="noreferrer"><BsTwitterX /> </a>
    //                 <a href="https://www.youtube.com/@Code99ITAcademy" target="_blank" rel="noreferrer"><FiYoutube /> </a>
    //                 <a href="https://www.linkedin.com/company/code99itacademy/" target="_blank" rel="noreferrer"><FiLinkedin /> </a>
                
    //         </div>
    //     </div>

    //     {/* Courses + Nav Links (side by side) */}
    //     <div className="footer-course-nav-f">
    //       <div className="col-f col-courses-f">
    //         <h4 className="col-head">Services</h4>
    //         <ul>
    //           <li><Link to="services/digital-marketing" onClick={handleClickCourse} className="content_font">Digital Marketing</Link></li>
    //           <li><Link to="services/web-development" onClick={handleClickCourse} className="content_font">Web Development</Link></li>
    //           <li><Link to="services/e-commerce" onClick={handleClickCourse} className="content_font">E-Commerce Website</Link></li>
    //           <li><Link to="services/design-video-editing" onClick={handleClickCourse} className="content_font">Design & Video Editing</Link></li>
    //           <li><Link to="services/ui-ux-designing" onClick={handleClickCourse} className="content_font">UI & UX Design</Link></li>
    //           <li><Link to="services/web-application" onClick={handleClickCourse} className="content_font">Web Application</Link></li>
    //         </ul>
    //       </div>

    //       <div className="col-f col-navlink-f">
    //         <h4>Quick Links</h4>
    //         <ul>
    //           <li><Link to="/" onClick={handleClickCourse} className="content_font">Home</Link></li>
    //           <li><Link to="about" onClick={handleClickCourse} className="content_font">About</Link></li>
    //           {/* <li><Link to="services/digital-marketing" onClick={handleClickCourse} className="content_font">Services</Link></li> */}
    //           <li><Link to="contact" onClick={handleClickCourse} className="content_font">Contact</Link></li>
    //           <li><Link to="Privacy" onClick={handleClickCourse} className="content_font">Privacy Policy</Link></li>
    //         </ul>
    //       </div>
    //       {/* Contact */}
    //       <div className="col-f col-getin-f">
    //         <h4>Get In Touch</h4>
    //         <ul className="contact-list-f">
    //           <li className="content_font"> No 16, 1st floor, Sarathy Nagar,<br />Opp To Vijaya Nagar Bus Stop, Velachery,<br />Chennai - 600 042.</li>
    //           <li className="content_font"><a href="mailto:c99x.official@gmail.com">c99x.official@gmail.com</a></li>
    //           <li className="content_font"><a href="tel:6374510754">+91 63 745 10 754</a></li>
    //         </ul>
    //       </div>
          
    //     </div>

    //     {/* Social Media */}
    //     {/* <div className="col-f col-social-f">
    //       <h4>Social Media</h4>
    //       <ul className="icon-list-f">
    //         <li><a href="https://www.facebook.com/code99itacademy/" target="_blank" rel="noreferrer"><FiFacebook /> Facebook</a></li>
    //         <li><a href="https://www.instagram.com/code99_it_academy/" target="_blank" rel="noreferrer"><FiInstagram /> Instagram</a></li>
    //         <li><a href="https://x.com/code99training" target="_blank" rel="noreferrer"><BsTwitterX /> X</a></li>
    //         <li><a href="https://www.youtube.com/@Code99ITAcademy" target="_blank" rel="noreferrer"><FiYoutube /> YouTube</a></li>
    //         <li><a href="https://www.linkedin.com/company/code99itacademy/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></li>
    //       </ul>
    //     </div> */}

    //     {/* Contact */}
    //     {/* <div className="col-f col-getin-f">
    //       <h4>Get In Touch</h4>
    //       <ul className="contact-list-f">
    //         <li> No 16, 1st floor, Sarathy Nagar,<br />Opp To Vijaya Nagar Bus Stop, Velachery,<br />Chennai - 600 042.</li>
    //         <li><a href="mailto:info@code99itacademy.com">info@code99itacademy.com</a></li>
    //         <li><a href="tel:6374510754">+91 63 745 10 754</a></li>
    //       </ul>
    //     </div> */}
    //   </div>

    //   <div className="footer-bottom-f">
       
    //     <div className="divider-footer-f" />
        
    //     <div className="divider-footer-content">
    //       <div>
    //       <img src={Logo} alt="" />
    //       </div>

    //       <div>
    //         <ul className="divider-footer-ul">
    //           <li className="divider-footer-list">© 2026 C99X. All Rights Reserved</li>
    //           <li className="divider-footer-list">Best Digital Marketing  Agency in Chennai</li>
    //         </ul>
    //       </div>
    //     </div>
       
    //   </div>
    // </footer>
//   );
// }
// }



// footer/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import {
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";

import "./Footer.css";

// Logo
import Logo from "../../../../src/assets/Home_Page_Assets/c99x-logo.png";

gsap.registerPlugin(ScrollToPlugin);

export default function Footer() {
  // Scroll to top when clicking links
  const handleClickCourse = () => {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: 0 },
      ease: "power2.out",
    });
  };

  return (
    <footer className="site-footer-f">
      <div className="footer-inner-f">

        {/* LEFT SECTION */}
        <div className="footer-left-f">
          <div className="logo-stack-f">
            <img
              src={Logo}
              alt="Code99 Logo"
              className="site-logo-f"
            />
          </div>

          <p className="tagline-f">
            Subscribe for our newsletter
          </p>

          {/* Mailchimp Subscribe Form */}
          <form
            action="https://c99x.us10.list-manage.com/subscribe/post?u=a997c080e0d8a64958516de58&id=1a360c8745&f_id=008e5be4f0"
            method="post"
            target="_blank"
            rel="noreferrer"
            className="Subscribe"
          >
            <input
              type="email"
              name="EMAIL"
              placeholder="Your Email"
              required
              className="subs-input"
            />

            <button
              type="submit"
              className="subs-button"
            >
              Subscribe
            </button>
          </form>

          <p className="tagline-f">
            Your Information is never disclosed to third parties.
          </p>

          {/* Social Icons */}
          <div className="icon-list-subs">
            <a
              href="https://www.facebook.com/c99x.solution"
              target="_blank"
              rel="noreferrer"
            >
              <FiFacebook />
            </a>

            <a
              href="https://www.instagram.com/c99x_digital/"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram />
            </a>

            <a
              href="https://x.com/c99x_solution"
              target="_blank"
              rel="noreferrer"
            >
              <BsTwitterX />
            </a>

            <a
              href="https://www.youtube.com/@c99x-solution"
              target="_blank"
              rel="noreferrer"
            >
              <FiYoutube />
            </a>

            <a
              href="https://www.linkedin.com/in/sudhakar-c9-9x-agen-223b50427/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-course-nav-f">

          {/* Services */}
          <div className="col-f col-courses-f">
            <h4 className="col-head">Services</h4>

            <ul>
              <li>
                <Link
                  to="services/digital-marketing"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  Digital Marketing
                </Link>
              </li>

              <li>
                <Link
                  to="services/web-development"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  Web Development
                </Link>
              </li>

              <li>
                <Link
                  to="services/e-commerce"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  E-Commerce Website
                </Link>
              </li>

              <li>
                <Link
                  to="services/design-video-editing"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  Design & Video Editing
                </Link>
              </li>

              <li>
                <Link
                  to="services/ui-ux-designing"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  UI & UX Design
                </Link>
              </li>

              <li>
                <Link
                  to="services/web-application"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  Web Application
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-f col-navlink-f">
            <h4>Quick Links</h4>

            <ul>
              <li>
                <Link
                  to="/"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="about"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="contact"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="privacy-policy"
                  onClick={handleClickCourse}
                  className="content_font"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-f col-getin-f">
            <h4>Get In Touch</h4>

            <ul className="contact-list-f">
              <li className="content_font">
                No.5, Sai Durga Flats, 1st Cross St,
                <br />
                 Vijaya Nagar, Velachery, Chennai, Greater
                <br />
                Chennai, Tamil Nadu 600042
              </li>

              <li className="content_font">
                <a href="mailto:c99x.digital@gmail.com ">
                 c99x.digital@gmail.com 
                </a>
              </li>

              <li className="content_font">
                <a href="tel: 6384976628">
                  +91  63 849 76 628 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom-f">
        <div className="divider-footer-f" />

        <div className="divider-footer-content">
          <div>
            <img src={Logo} alt="footer logo" />
          </div>

          <div>
            <ul className="divider-footer-ul">
              <li className="divider-footer-list">
                © 2026 C99X. All Rights Reserved
              </li>

              <li className="divider-footer-list">
                Best Digital Marketing Agency in Chennai
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}