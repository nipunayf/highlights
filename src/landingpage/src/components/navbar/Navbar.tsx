'use client';

import React from "react";
import './Navbar.scss';
import Link from "next/link";
import Image from 'next/image';
import { IoMenu } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import Logo from "../../assests/logo.png";
import { webAppURL } from "@/config";

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <header className="navbar">
            <nav className="navbar_container wrapper">

                <div className="logo_container">
                    <a href="#" className="navbar_logo" onClick={() => setShowNav(false)}>
                        <Image
                            src={Logo}
                            alt="logo"
                            priority
                        />
                    </a>
                    <h3>Highlights</h3>
                </div>

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
                    <a href={webAppURL} className="btn">Login</a>
                    <a href={webAppURL} className="btn">Sign Up</a>
                </div>

                <div className="navbar_menu" onClick={() => setShowNav(!showNav)}>
                    {showNav ? <IoMdClose /> : <IoMenu />}
                </div>


            </nav>
        </header>
    );
};

export default Navbar;