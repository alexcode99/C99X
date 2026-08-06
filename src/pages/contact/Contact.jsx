import ContactHero from "./contacthero/ContactHero";
import './contacthero/ContactHero.css'
import GetInTouch from "./getIntouch/GetInTouch";
import './getIntouch/GetInTouch.css'
import Map from "./map/Map";
import './map/Map.css'



function Contact(){
    return(
        <>
            <ContactHero/>
            <GetInTouch/>
            {/* <Map/> */}
        </>
    );
}

export default Contact;