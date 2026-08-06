// *GetInTouch.jsx*

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import phoneImg from '../../../assets/contact/Phone.png'
import glowImg from '../../../assets/contact/Glow.png'
import instagramLogo from '../../../assets/contact/instagram.avif'
import { PiClock } from "react-icons/pi";
import { LiaPhoneSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import ShootingStars from "../../../components/animations/Shootingstar/ShootingStars.jsx";
import emailjs from "emailjs-com";
import { error } from "three";


gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(SplitText);



export default function GetInTouch() {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            emailjs.sendForm(
                "service_icjk6ij",
                "template_gzq7m7k",
                form,
                "7KNgkOy42QirCM1Lr"
            )
                .then(() => {
                    console.log("Email sent successfully");
                    form.reset();
                    setEmail('');
                    setIsValid(true);
                    setValidated(false);
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }
        setValidated(true);
    };


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            ".getInTouch_h1",
            { scale: "1", y: 0 },   // starting size
            {
                scale: "0.3",           // ending size
                y: 300,
                scrollTrigger: {
                    trigger: ".getInTouch_container",
                    start: "top center",
                    end: "+=1000",
                    scrub: 1
                }
            }
        );

        gsap.fromTo(
            ".GetInTouch_glowImg",
            { y: 0 },   // starting state
            {
                // ending state
                y: 200,
                scrollTrigger: {
                    trigger: ".GetInTouch_glowImg",
                    start: "bottom bottom",
                    end: "top top",
                    scrub: 8
                }
            }
        );

        gsap.fromTo(".getInTouch_leftDiv",
            { x: 100 },
            {
                x: 0,
                scrollTrigger: {
                    trigger: ".getInTouch_container",
                    start: "top center",
                    end: "+=1000",
                    scrub: true
                }
            });

        gsap.fromTo(".getInTouch_rightDiv",
            { x: -100 },
            {
                x: 0,
                scrollTrigger: {
                    trigger: ".getInTouch_container",
                    start: "top center",
                    end: "+=1000",
                    scrub: true
                }
            });
    }, []);

    return (
        <>
            <div className="getInTouch_container">
                <ShootingStars />
                <h1 className='getInTouch_h1'>Connect With <span>C99X</span></h1>
                <div className='getInTouch_overallDiv'>
                    <div className="getInTouch_leftDiv">
                        <div className='getIntouch_leftInput1 getInTouch_email'>
                            <AiOutlineMail className='getIntouch_leftInputImg' />
                            <div className='getIntouch_leftInputDiv'>
                                <p>Email</p>
                                <p>c99x.digital@gmail.com </p>
                            </div>
                        </div>
                        <div className='getIntouch_leftInput1 getInTouch_phone'>
                            <LiaPhoneSolid className='getIntouch_leftInputImg' />
                            <div className='getIntouch_leftInputDiv'>
                                <p>Phone</p>
                                <p>+91  6384976628 </p>
                            </div>
                        </div>
                        <div className='getIntouch_leftInput1 getInTouch_location'>
                            <IoLocationOutline className='getIntouch_leftInputImg ' />
                            <div className='getIntouch_leftInputDiv'>
                                <p>Location</p>
                                <p>No.5, Sai Durga Flats, </p>
                                <p> 1st Cross St,</p>
                                <p> Vijaya Nagar, Velachery, Chennai, Greater</p>
                                <p>Chennai, Tamil Nadu 600042</p>
                            </div>
                        </div>
                        <div className='getIntouch_leftInput1 getInTouch_hours'>
                            <PiClock className='getIntouch_leftInputImg ' />
                            <div className='getIntouch_leftInputDiv'>
                                <p>Working Hours</p>
                                <p>Mon - Sat: 9AM - 7PM</p>
                            </div>
                        </div>
                    </div>
                    <div className='getInTouch_centerDiv'>
                        <img src={glowImg} alt="glow image" className='GetInTouch_glowImg' />
                        <img src={phoneImg} alt="phone image" className='GetInTouch_phoneImg' />
                        <Form noValidate validated={validated} className="getIntouch_form" onSubmit={handleSubmit}>
                            <h1>Send us a message</h1>
                            <p>We typically respond within 1–2 business days.</p>
                            <Row className="getInTouch_inputRow">
                                <Col>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" name="user_name" placeholder="Enter your name" className='getIntouch_formInput' required />
                                        <Form.Control.Feedback type="invalid" className="getInTouch_errormsg">
                                            Name is required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="getInTouch_inputRow">
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        name="user_email" 
                                        value={email}
                                        onChange={handleEmailChange}
                                        isInvalid={validated && !isValid}
                                        placeholder="samir@code99.com" 
                                        className='getIntouch_formInput' 
                                        required 
                                        />
                                        <Form.Control.Feedback type="invalid" className="getInTouch_errormsg">
                                            Invalid email format
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                                                   
                            <Row className="getInTouch_inputRow" >
                                <Col>
                                    <Form.Group className="mb-3"  controlId="formSubject">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Select className='getIntouch_formInput' defaultValue="" required name="subject">
                                            <option value="">Select</option>
                                            <option>General Inquiry</option>
                                            <option>Support</option>
                                            <option>Feedback</option>
                                            <option>Other</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid" className="getInTouch_errormsg">
                                            Please select a subject
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="getInTouch_inputRow">
                                <Col>
                                    <Form.Group className="mb-3" controlId="formMessage">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="message"
                                            rows={4}
                                            placeholder="Let us know about your inquiry..."
                                            className='getIntouch_formInput'
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid" className="getInTouch_errormsg">
                                            Message is required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <Button variant="outline-light" type="submit" className="w-100 getInTouchButton">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </Form>
                    </div>
                    <div className='getInTouch_rightDiv'>
                        <div className='getIntouch_leftInput1 getIntouch_rightInput getInTouch_facebook'>

                            <div className='getIntouch_leftInputDiv getIntouch_rightInputDiv'>
                                <p>Facebook</p>
                                <p>	C99X Digital</p>
                            </div>
                            <FaFacebook className='getIntouch_leftInputImg getInTouch_fb_color' />
                        </div>
                        <div className='getIntouch_leftInput1 getIntouch_rightInput getInTouch_instagram'>

                            <div className='getIntouch_leftInputDiv getIntouch_rightInputDiv'>
                                <p>Instagram</p>
                                <p>c99x_digital</p>
                            </div>
                            <img src={instagramLogo} alt="instagram logo" className='getIntouch_leftInputImg ' />
                        </div>
                        <div className='getIntouch_leftInput1 getIntouch_rightInput getInTouch_x'>

                            <div className='getIntouch_leftInputDiv getIntouch_rightInputDiv'>
                                <p>X</p>
                                <p>C99X - Digital</p>
                            </div>
                            <FaXTwitter className='getIntouch_leftInputImg getInTouch_twitter' />
                        </div>
                        <div className='getIntouch_leftInput1 getIntouch_rightInput getInTouch_youtube'>

                            <div className='getIntouch_leftInputDiv getIntouch_rightInputDiv'>
                                <p>Youtube</p>
                                <p>C99X - Digital</p>
                            </div>
                            <FaYoutube className='getIntouch_leftInputImg getInTouch_youTube' />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}