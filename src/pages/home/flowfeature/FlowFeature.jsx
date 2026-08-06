import LaserFlow from "./leaserflow/LeaserFlow"
import {useRef} from "react"
import './FlowFeature.css'
//icons
 import { IoMdPerson } from "react-icons/io";
import { TiMessageTyping } from "react-icons/ti";
import { CiLock } from "react-icons/ci";

function FlowFeature(){

const revealImgRef = useRef(null)

return(

<div
// style={{
// height:"800px",
// position:"relative",
// overflow:"hidden",
// background:"#060010"
// }}
className="home-flowfeature"

onMouseMove={(e)=>{

const rect = e.currentTarget.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const el = revealImgRef.current

if(el){

el.style.setProperty("--mx",`${x}px`)
el.style.setProperty("--my",`${y+rect.height*0.5}px`)

}

}}

onMouseLeave={()=>{

const el = revealImgRef.current

if(el){

el.style.setProperty("--mx","-9999px")
el.style.setProperty("--my","-9999px")

}

}}

>

<LaserFlow
color="#affe04"
horizontalSizing={0.89}
verticalSizing={3.5}
wispDensity={1}
wispSpeed={15}
wispIntensity={5}
flowSpeed={0.35}
flowStrength={0.25}
fogIntensity={0.45}
fogScale={0.3}
fogFallSpeed={0.6}
decay={1.1}
falloffStart={1.2}
/>

    <div
    // style={{
    //     position:"absolute",
    //     top:"72%",
    //     left:"50%",
    //     transform:"translate(-50%,-50%)",
    //     width:"86%",
    //     height:"45%",
    //     background:"#060010",
    //     borderRadius:"20px",
    //     display:"flex",
    //     justifyContent:"center",
    //     color:"#fff",
    //     zIndex:6
    // }}
    className="home-flow "
    >

    {/* ------------------------ */}

    {/* ------------------------ */}
    {/* Your Content */}
        <section style={{background:"#000202"}}>
            
              <div className="home-flow_card ">
                <div className="home-flow_card-1">
                   <i><IoMdPerson/></i>
                   <h5 className="flowFeature_head">Future-Ready Marketing Trends</h5>
                   <p className="content_font">Empowering your brand with AI search optimization, automated lead funnels, predictive ads, and zero-click search visibility.</p>
                </div>
                <div className="home-flow_card-2">
                    <i><TiMessageTyping/></i>
                    <h5 className="flowFeature_head">Digital Authority Foundation</h5>
                    <p className="content_font" style={{color:"black"}}>Engineering fast, mobile-first, enterprise-grade websites that instantly build trust and maximize audience conversion power.</p>
                </div>
                <div className="home-flow_card-3">
                    <i><CiLock/></i>
                    <h5 className="flowFeature_head">Influence & Engagement Engine</h5>
                    <p className="content_font">Executing data-driven social media and video campaigns that amplify brand presence, drive organic reach, and cultivate customer loyalty.</p>
                </div>
            </div>
        </section>
    </div>

    <img
        ref={revealImgRef}
        src="/hero.png"
        alt=""

        style={{

        position:"absolute",
        width:"100%",
        top:"-50%",
        zIndex:5,
        mixBlendMode:"lighten",
        opacity:0.3,
        pointerEvents:"none",

        "--mx":"-9999px",
        "--my":"-9999px",

        WebkitMaskImage:"radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",

        maskImage:"radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",

    }}

    />

</div>

)

}

export default FlowFeature


// import React from "react";
// import './FlowFeature.css'
//  import { IoMdPerson } from "react-icons/io";
// import { TiMessageTyping } from "react-icons/ti";
// import { CiLock } from "react-icons/ci";
// const FlowFeature = () => {
//     return(
//         <>
        // <section>
        //     <section></section>
        //       <div className="home-flow_card">
        //         <div className="home-flow_card-1">
        //            <i><IoMdPerson/></i>
        //            <h5>Future-Ready Market Trends</h5>
        //            <p>AI search Optimization, automation, predictive ads, Zero-Click Visibility.</p>
        //         </div>
        //         <div className="home-flow_card-2">
        //             <i><TiMessageTyping/></i>
        //             <h5>Digital Authority Foundation</h5>
        //             <p>Professional Website Build credibility. visiblity and conversion power.</p>
        //         </div>
        //         <div className="home-flow_card-3">
        //             <i><CiLock/></i>
        //             <h5>Influence & Engagement Engine</h5>
        //             <p>Social Media amplifies brand trust  and audience growth</p>
        //         </div>
        //     </div>
        // </section>

//         </>
//     )
// }
// export default FlowFeature;