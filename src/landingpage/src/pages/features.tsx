import Navbar from "../components/navbar/Navbar";
import Features from "../components/features/Features";
import Footer from "../components/footer/Footer";
import "../app/globals.scss";

export default function features() {
    return(
        <>
            <Navbar/>
            <Features/>
            <Footer/>
        </>
    );
    
}