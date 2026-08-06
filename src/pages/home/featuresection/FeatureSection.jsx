import React from "react";
import './FeatureSection.css'
import '../../../styles/Global.css'

//image
import Employee from '../../../assets/Home_Page_Assets/Features_Icon/best-employee.gif'
import Autism from '../../../assets/Home_Page_Assets/Features_Icon/autism.gif'
import Email from '../../../assets/Home_Page_Assets/Features_Icon/mail.gif'
import PriceUp from '../../../assets/Home_Page_Assets/Features_Icon/price-up.gif'
import Time from '../../../assets/Home_Page_Assets/Features_Icon/24-7.gif'
import Analystics from '../../../assets/Home_Page_Assets/Features_Icon/analytics.gif'

const FeatureSection = () => {
    return(
        <>
        <section className="home-feature section_gap">
            <div className="common-sect">
                <h2 className="common-sect-title">Our <span className="common-highlights">Features</span> </h2>
                <p className="common-sect-des">Build for Speed & Privacy. Everything else that...isn't</p>
            </div>
            {/* ----- */}
            <div className="home-feature-boxes">
                <div className="home-overal-box">

                    <div className="home-feature_sect">
                        <img src={Employee} alt="Employee picture" className="home-feat-img" />
                        <h5>Strategic Growth Architects </h5>
                        <p className="content_font" style={{color:"#CCCCCC"}}>Our performance-focused engineers and marketers build interconnected digital ecosystems designed for continuous, scalable revenue growth. </p>
                        <div className="hone-feature-overflow">
                            <span>500+ Assist</span>
                            <span>24/7 Signals</span>
                        </div>
                    </div>
                    {/* box-2 */}
                    <div className="home-feature_sect">
                        <img src={Autism} alt="Employee picture" className="home-feat-img" />
                        <h5>Precision-Crafted Solutions </h5>
                        <p className="content_font" style={{color:"#CCCCCC"}}>Every web app, campaign, and UI design is custom-engineered to match your exact business goals and target market behavior. </p>
                        <div className="hone-feature-overflow">
                            <span>500+ Assist</span>
                            <span>24/7 Signals</span>
                        </div>
                    </div>
                    {/* box-3 */}
                    <div className="home-feature_sect">
                        <img src={Email} alt="Employee picture" className="home-feat-img" />
                        <h5>Accelerated Launch Framework </h5>
                        <p className="content_font" style={{color:"#CCCCCC"}}>Deploy high-converting websites and ad campaigns in record time without compromising security, speed, or code quality standards.</p>
                        <div className="hone-feature-overflow">
                            <span>500+ Assist</span>
                            <span>24/7 Signals</span>
                        </div>
                    </div>
                    {/* box-3 */}
                    <div className="home-feature_sect">
                        <img src={PriceUp} alt="Employee picture" className="home-feat-img" />
                        <h5>Smart ROI Growth Models </h5>
                        <p className="content_font" style={{color:"#CCCCCC"}}>We eliminate guesswork by combining predictive ad strategies with conversion rate optimization to maximize return on ad spend.</p>
                        <div className="hone-feature-overflow">
                            <span>500+ Assist</span>
                            <span>24/7 Signals</span>
                        </div>
                    </div>
                    {/* box-4 */}
                    <div className="home-feature_sect">
                        <img src={Time} alt="Employee picture" className="home-feat-img" />
                        <h5>Enterprise-Grade Tech Stack</h5>
                        <p className="content_font" style={{color:"#CCCCCC"}}>Built using secure microservices, Python AI backends, and lightning-fast frontend frameworks to keep your platforms running smoothly 24/7. </p>
                        <div className="hone-feature-overflow">
                            <span>500+ Assist</span>
                            <span>24/7 Signals</span>
                        </div>
                    </div>
                    {/* box-5 */}
                    <div className="home-feature_sect">
                        <img src={Analystics} alt="Employee picture" className="home-feat-img" />
                        <h5>Analytics-Backed Impact</h5>
                        <p className="content_font" style={{color:"#CCCCCC"}}>Access dedicated client portals with clear performance metrics, live conversion tracking, and monthly growth audits. </p>
                        <div className="hone-feature-overflow">
                            <span>500+ Assist</span>
                            <span>24/7 Signals</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default FeatureSection;