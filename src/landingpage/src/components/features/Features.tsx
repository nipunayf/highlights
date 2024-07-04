'use client';

import * as React from 'react';
import './Features.scss';
import Image from 'next/image';
import Img1 from '../../assests/feature1.png';
import Img2 from '../../assests/feature2.png';
import Img3 from '../../assests/feature3.png';
import Img4 from '../../assests/home4.jpg';
import Img5 from '../../assests/feature5.png';
import Img6 from '../../assests/feature6.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Features: React.FC = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <section>
            <div className="feature1_container wrapper">
                <div className="feature1_left" data-aos="zoom-in-up">
                    <h3>1.Transform your tasks into Highlights</h3>
                    <p>Simplify your task management by converting your to-dos into focused highlights.</p>
                    <ul>
                        <li>Integrate with To-Do lists (Google Tasks)</li>
                        <li>Write down your highlights directly within the app</li>
                        <li>Alternate highlights to match your changing priorities</li>
                    </ul>
                </div>
                <div className="feature1_right" data-aos="fade-left" >
                    <Image src={Img1} alt="image1" />
                </div>
            </div>

            <div className="feature2_container wrapper">
                <div className="feature2_left" data-aos="fade-right">
                    <Image src={Img2} alt="image2" />
                </div>

                <div className="feature2_right" data-aos="zoom-in-up">
                    <h3>2.Never miss a highlight</h3>
                    <p>Effortlessly schedule your key tasks with seamless calendar integration.</p>
                    <ul>
                        <li>Integrate with Google calendar</li>
                        <li>Get reminders for scheduled highlights</li>
                    </ul>
                </div>
            </div>

            <div className="feature3_container wrapper">
                <div className="feature3_left" data-aos="zoom-in-up">
                    <h3>3.Stay focused and achieve productivity</h3>
                    <p>Manage your work sessions and minimize distractions with built-in tools.</p>
                    <ul>
                        <li>Pomodoro Technique</li>
                    </ul>
                </div>

                <div className="feature3_right" data-aos="fade-left">
                    <Image src={Img3} alt="image3" />
                </div>
            </div>

            <div className="feature4_container wrapper">
                <div className="feature4_left" data-aos="fade-right">
                    <Image src={Img4} alt="image4" />
                </div>

                <div className="feature4_right" data-aos="zoom-in-up">
                    <h3>4.Reflect and refine your workflow</h3>
                    <p>Improve your productivity with regular feedback and insights.</p>
                    <ul>
                        <li>Focused questionnaires after each highlight to gather feedback </li>
                    </ul>
                </div>
            </div>

            <div className="feature5_container wrapper">
                <div className="feature5_left" data-aos="zoom-in-up">
                    <h3>5.Visualize your progress</h3>
                    <p>Track your progress and gain insights into your productivity over time.</p>
                    <ul>
                        <li>View a visual representation of completed highlights</li>
                        <li>Have performance insights</li>
                    </ul>
                </div>

                <div className="feature5_right" data-aos="fade-left">
                    <Image src={Img5} alt="image5" />
                </div>
            </div>

            <div className="feature6_container wrapper">
                <div className="feature6_left" data-aos="fade-right">
                    <Image src={Img6} alt="image6" />
                </div>

                <div className="feature6_right" data-aos="zoom-in-up">
                    <h3>6.Daily productivity boosters</h3>
                    <p>Boost your productivity with daily tips and personalized recommendations.</p>
                    <ul>
                        <li>General daily productivity tips and best practices</li>
                        <li>Personalized recommendations</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Features;