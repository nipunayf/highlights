import "./Home4.scss"
import Img4 from "../../assets/home4.jpg"
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home4 = () => {

    useEffect(() => {
        Aos.init({duration: 1000});
    });

    return (
        <section>
            <div className="home4_container wrapper">
                <div className="home4_left" data-aos="fade-right">
                    <img src={Img4} alt="image1" />    
                </div>

                <div className="home4_right" data-aos="zoom-in-up">
                    <h3>Get everything on your calendar.</h3>
                    <p>We integrate with Google Calendar and make every highlight you scheduled, a calendar event for your convenience.</p>
                </div>
            </div>
        </section>

    );
};

export default Home4;