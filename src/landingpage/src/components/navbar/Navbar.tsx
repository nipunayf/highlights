'use client';

import React from "react";
import './Navbar.scss';
import Link from "next/link";
import Image from 'next/image';
import { IoMenu } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import Logo from "../../assests/logo.png";

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <header className="navbar">
            <nav className="navbar_container wrapper">
                
                    <a href="#" className="navbar_logo" onClick={() => setShowNav(false)}>
                        <Image 
                            src={Logo} 
                            alt="logo" 
                            priority
                        />
                    </a>

                    <ul className={`${showNav ? "show" : ""}`}>
                        <li onClick={() => setShowNav(false)}>
                            <Link href="/home"> Home </Link>
                        </li>
                        <li onClick={() => setShowNav(false)}>
                            <Link href="/features"> Features </Link>
                        </li>
                        <li onClick={() => setShowNav(false)}>
                            <Link href="/help"> Help </Link>
                        </li>
                    </ul>

                    <div className="navbar_btns">
                        <a href="#" className="btn">Login</a>
                        <a href="#" className="btn">Sign Up</a>
                    </div>

                    <div className="navbar_menu" onClick={() => setShowNav(!showNav)}>
                        {showNav ? <IoMdClose /> : <IoMenu />}
                    </div>

                
            </nav>
        </header>
    );
};

export default Navbar;