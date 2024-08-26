'use client';

import * as React from 'react';
import './Home.scss';
import Image from 'next/image';
import Home1 from '../../assests/home1.jpg';
import Img2 from '../../assests/home2.jpg';
import Img3 from '../../assests/home3.jpg';
import Img4 from '../../assests/home4.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Hero: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section>
      <div className="hero_container wrapper">
        <div className="hero_left" data-aos="zoom-in-up">
          <h1>Master The Art of Productivity Enhancement...</h1>
          <a href="#" className="hero_btn">Sign Up Now</a>
        </div>
        <div className="hero_right" data-aos="fade-left" >
          <Image src={Home1} alt="image1" />
        </div>
      </div>

      <div className="home2_container wrapper">
        <div className="home2_left" data-aos="fade-right">
          <Image src={Img2} alt="image2" />
        </div>

        <div className="home2_right" data-aos="zoom-in-up">
          <h3>Keep every task scheduled in your life.</h3>
          <p>Whether there are tasks in your to-do lists (Eg:- Google Tasks) or novel upcoming events, HIGHLIGHTS is there to organize and manage them all.</p>
        </div>
      </div>

      <div className="home3_container wrapper">
        <div className="home3_left" data-aos="zoom-in-up">
          <h3>Get reminded anytime.</h3>
          <p>We remind you of upcoming tasks at your preferred time (Eg:- On time, 5 minutes before, 15 minutes before, etc...)</p>
        </div>

        <div className="home3_right" data-aos="fade-left">
          <Image src={Img3} alt="image3" />
        </div>
      </div>

      <div className="home4_container wrapper">
        <div className="home4_left" data-aos="fade-right">
          <Image src={Img4} alt="image4" />
        </div>

        <div className="home4_right" data-aos="zoom-in-up">
          <h3>Get everything on your calendar.</h3>
          <p>We integrate with Google Calendar and turn every highlight you schedule into a calendar event for your convenience.</p>
        </div>
      </div> 
    </section>
  );
};

export default Hero;
