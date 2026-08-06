import React from "react";
import './CreativityPerformance.css'
import '../../../styles/Global.css'

//image
import Employee from '../../../assets/Home_Page_Assets/Features_Icon/best-employee.gif'
import Autism from '../../../assets/Home_Page_Assets/Features_Icon/autism.gif'
import Email from '../../../assets/Home_Page_Assets/Features_Icon/mail.gif'
import PriceUp from '../../../assets/Home_Page_Assets/Features_Icon/price-up.gif'
import Time from '../../../assets/Home_Page_Assets/Features_Icon/24-7.gif'
import Analystics from '../../../assets/Home_Page_Assets/Features_Icon/analytics.gif'

const CreativityPerformance = () => {
    return(
        <>
        <section className="about-home-feature section_gap">
            <div className="common-sect">
                <h2 className="common-sect-title aboutCreativity_title"> Creativity Meets Performance <span className="common-highlights">Performance</span> </h2>
                <p className="common-sect-des about-creative-para ">We blend striking, pixel-perfect design with data-driven engineering to turn brand visibility into predictable revenue. Every asset we craft is optimized for both visual impact and maximum conversion efficiency.</p>
            </div>
            {/* ----- */}
            <div className="about-home-feature-boxes">
                <div className="about-home-overal-box">

                    <div className="about-home-feature_sect">
                        <img src={Employee} alt="Employee picture" className="about-home-feat-img" />
                        <h5>Data-Driven Creative Design</h5>
                        <p className="content_font"> Eye-catching visuals and video content engineered to capture attention and boost user engagement.</p>
                        <div className="about-home-feature-overflow">
                            <span>3x Faster Transfers</span>
                            <span>24/7 Availability</span>
                        </div>
                    </div>

                    {/* box-2 */}
                    <div className="about-home-feature_sect">
                        <img src={Autism} alt="Employee picture" className="about-home-feat-img" />
                        <h5>High-Converting UI/UX Architecture</h5>
                        <p className="content_font">Intuitive interface design optimized to guide visitors seamlessly into high-value leads and sales.</p>
                        <div className="about-home-feature-overflow">
                            <span>99% Accuracy</span>
                            <span>10M+ Signals</span>
                        </div>
                    </div>

                    {/* box-3 */}
                    <div className="about-home-feature_sect">
                        <img src={Email} alt="Employee picture" className="about-home-feat-img" />
                        <h5>Brand Authority Amplification</h5>
                        <p className="content_font">Strategic storytelling and social media design that build long-term trust across digital platforms.</p>
                        <div className="about-home-feature-overflow">
                            <span>30% Savings</span>
                            <span>50+ Countries</span>
                        </div>
                      


                    </div>
                    {/* box-3 */}
                    <div className="about-home-feature_sect">
                        <img src={PriceUp} alt="Employee picture" className="about-home-feat-img" />
                        <h5> Conversion-Focused Asset Production</h5>
                        <p className="content_font">Performance ads and promotional media built specifically to reduce acquisition costs and scale ROI.</p>
                        <div className="about-home-feature-overflow">
                            <span>1-Click Setup</span>
                            <span>100+ Strategies</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default CreativityPerformance;