import "./Home3.scss"
import Img2 from "../../assets/home3.jpg"
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home3 = () => {

    useEffect(() => {
        Aos.init({duration: 1000});
    });

    return (
        <section>
            <div className="home3_container wrapper">
                <div className="home3_left" data-aos="zoom-in-up">
                    <h3>Get reminded anytime.</h3>
                    <p>We remind you the upcoming tasks anytime on your preference. (Eg:- On time, 5 minutes before, 15 minutes before, etc...)</p>
                </div>

                <div className="home3_right" data-aos="fade-left">
                    <img src={Img2} alt="image1" /> 
                </div>
            </div>
        </section>

    );
};

export default Home3;