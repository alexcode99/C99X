import React from "react";
import AboutSection from "../home/aboutsection/AboutSection";
import Cta from "../../components/layout/cta/Cta";
// import ScalableSuccess from "./scalablesuccess/ScalableSuccess";
import AboutHero from "./abouthero/AboutHero";
import { Feature } from "framer-motion";
// import FeatureSection from "../home/featuresection/FeatureSection";
import AboutScalableSuccess from "./aboutScalableSuccess/AboutScalableSuccess";
import ExpertTeam from "./expertteam/ExpertTeam";
import CreativePerformance from "./creativityperformance/CreativityPerformance";
import Seo from "../../components/layout/seo/Seo";

const About = () => {

    return(
        <>
            
            <Seo
                title="About C99X | Leading IT Services & Digital Growth Company"
                description="Discover C99X—Chennai's premier IT services agency specializing in custom web applications, enterprise backend engineering, AI digital marketing, and UI/UX design."
            />
            <AboutHero/>
            <AboutSection/>
            <CreativePerformance/>
            <AboutScalableSuccess/>
            <ExpertTeam/>
            <Cta/>

        </>
    );
};
export default About;