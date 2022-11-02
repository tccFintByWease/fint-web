import React, { useState } from 'react';
import './styles.css';
import './mediaQueries.css';
import logo from './../../../assets/images/black-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

    const [navbarIsOpen, setNavbarIsOpen] = useState(false);
    
    // fix the menu on the top of the page
    const scrollFunction = () => {
        if (document.body.scrollTop > 119 || document.documentElement.scrollTop > 119) {
            document.querySelector('.header').classList.add('fixed');
        } else {
            document.querySelector('.header').classList.remove('fixed');
        }
    }

    // reset the menu settings when the window is resized
    const resizeFunction = () => {
        const nav = document.querySelector('.header-nav');
        const navBackground = document.querySelector('.nav-background');

        if (window.innerWidth >= 1300) {
            nav.classList.remove('mobile-navbar');
            nav.style.visibility = 'visible';
            navBackground.style.visibility = 'hidden';
            
            setNavbarIsOpen(false);
        } else if (window.innerWidth < 1300 && !navbarIsOpen) {
            nav.classList.add('mobile-navbar');
            nav.style.visibility = 'hidden';
        }
    }

    window.onscroll = function() { scrollFunction() }
    window.onresize = function() { resizeFunction() }

    const handleNavbarisOpen = () => {
        if (!navbarIsOpen) {
            openNavbar();
        } else {
            closeNavbar();
        }
    }

    const openNavbar = () => {
        const nav = document.querySelector('.header-nav');
        const navBackground = document.querySelector('.nav-background');

        nav.classList.add('mobile-navbar');

        nav.style.visibility = 'visible';
        navBackground.style.visibility = 'visible';

        setNavbarIsOpen(true);
    }

    const closeNavbar = () => {
        const nav = document.querySelector('.header-nav');
        const navBackground = document.querySelector('.nav-background');

        nav.classList.remove('mobile-navbar');

        nav.style.visibility = 'hidden';
        navBackground.style.visibility = 'hidden';

        setNavbarIsOpen(false);
    }

    return (
        <div id="landpage__nav">
            <header className="header flex">
                <a href="#hero">
                    <img src={logo} alt="Fint" className="logo" />
                </a>
                <span className="hamburger" onClick={handleNavbarisOpen}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <nav className="header-nav flex">
                    <span className="nav-links">
                        <a href="#hero">Início</a>
                        <a href="#explore">Explorar</a>
                        <a href="#subscriptions">Planos</a>
                        <a href="#about-us">Sobre</a>
                    </span>
                    <span className="nav-actions">
                        <a href="/login">Conectar-se</a>
                        <a href="/sign-up" className="linkButton">Cadastrar-se</a>
                    </span>
                </nav>
            </header>
            <div className="nav-background" onClick={handleNavbarisOpen}></div>
        </div>
    );
}

export default Navbar;