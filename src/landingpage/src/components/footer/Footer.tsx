'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from "next/link";
import './Footer.scss';
import Logo from '../../assests/logo.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Footer: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer_container wrapper">
        <div className="footer_col">
          <div className='logo_container'>
            <Image src={Logo} alt="logo" />
            <h2>Highlights</h2>
          </div>
          <p>Master the art of productivity enhancement...</p>
        </div>

        <div className="footer_col">
          <h3>About</h3>
          <Link href="/home">About Us</Link><br />
          <Link href="/features">Features</Link>
        </div>

        <div className="footer_col">
          <h3>Product</h3>
          <a href="#">Get Started</a>
        </div>

        <div className="footer_col">
          <h3>Support</h3>
          <Link href="/help">Help Center</Link>
        </div>

        <div className="footer_col">
          <h3>Resources</h3>
          <a href="https://maketime.blog/">Make Time App</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
