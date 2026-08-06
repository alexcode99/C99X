import Navbar from "../../components/layout/navbar/Navbar";
import Hero from "../home/hero/Hero";
import HomeCarousel from '../home/hero/slider/HomeCarousel'
import AboutSection from "./aboutsection/AboutSection";
import ChooseUs from "./chooseus/ChooseUs";
import FeatureSection from "./featuresection/FeatureSection";
import FlowFeature from "./flowfeature/FlowFeature";
import Comparision from './comparison/Comparison'
import Cta from "../../components/layout/cta/Cta";
import StepScollAnimation from '../../components/animations/stepscrollanimation/StepScrollAnimation'
import CircleParticles from '../../components/animations/circleparticles/CircleParticles'
import CircleParticlesScroll from "./particleaniation/CircleParticlesScroll";
import ParticleSphere from "../../components/animations/circleparticles/ParticleSphere";
import ScootyScroll from "../../components/animations/scooty/ScootyScroll";
import FAQ from "../services/faq/Faq";
import Seo from "../../components/layout/seo/Seo";
// import CosmicParticles from "./particleaniation/CosmicParticles";
// import CircleParticlesScroll from
export default function(){
    return(
        <>
        
        <Seo
        title="Best Digital Marketing Agency & Web Development Company in Chennai | C99X"
        description="C99X is Chennai's top digital marketing agency & IT solutions firm. We deliver AI-powered SEO, high-converting web development, UI/UX design, and web applications"
        />
        {/* <Navbar/> */}
        {/* <h1 style={{height:"100px", width:"100%", background:"blue"}}>Hii</h1> */}
         <Hero/>
         {/* <HomeCarousel/> */}
         <AboutSection/>
        <FlowFeature/>  
        <CircleParticles/> 
        <StepScollAnimation/> 
        <Comparision/>
        <FeatureSection/>
        <FAQ/>
        <Cta/>
        </>
    )
}
