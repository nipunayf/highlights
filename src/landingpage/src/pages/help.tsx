import Navbar from "../components/navbar/Navbar";
import Help from "../components/help/Help";
import Footer from "../components/footer/Footer";
import "../app/globals.scss";

export default function help() {
    return(
        <>
            <Navbar/>
            <Help/>
            <Footer/>
        </>
    );
    
}