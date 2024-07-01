import "./Home2.scss"
import Img2 from "../../assets/home2.jpg"
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home2 = () => {

    useEffect(() => {
        Aos.init({duration: 1000});
    });

    return (
        <section>
            <div className="home2_container wrapper">
                <div className="home2_left" data-aos="fade-right">
                    <img src={Img2} alt="image1" />    
                </div>

                <div className="home2_right" data-aos="zoom-in-up">
                    <h3>Keep every task  scheduled in your life.</h3>
                    <p>Whether there are tasks in your to-do lists (Eg:- Google Tasks) or novel upcoming events, HIGHLIGHTS is there to organize and manage them all.</p>
                </div>
            </div>
        </section>

    );
};

export default Home2;