import "./Hero.scss"
import Home1 from "../../assets/home1.jpg"
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Hero = () => {

    useEffect(() => {
        Aos.init({duration: 1000});
    });

    return (
        <section>
            <div className="hero_container wrapper">
                <div className="hero_left" data-aos="zoom-in-up">
                    <h1>Master The Art of Productivity Enhancement...</h1>
                    <a href="#" className="hero_btn">Sign Up Now</a>
                </div>
                <div className="hero_right" data-aos="fade-left">
                    <img src={Home1} alt="image1" />
                </div>
            </div>
        </section>

    );
};

export default Hero;