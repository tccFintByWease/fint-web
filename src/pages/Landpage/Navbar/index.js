import React, { Fragment, useState } from 'react';
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
            document.querySelector('.header-nav').classList.add('fixed');
        } else {
            document.querySelector('.header-nav').classList.remove('fixed');
        }
    }

    window.onscroll = function() { scrollFunction() };

    const handleNavbarisOpen = () => {

        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.navLinks');
        const navActions = document.querySelector('.navActions');
        const navBackground = document.querySelector('.nav-background');
        
        if (!navbarIsOpen) {
            navLinks.classList.add('flex');
            navActions.classList.add('flex');

            nav.style.visibility = 'visible';
            navBackground.style.visibility = 'visible';

            setNavbarIsOpen(true);
        } else {
            navLinks.classList.remove('flex');
            navActions.classList.remove('flex');

            nav.style.visibility = 'hidden';
            navBackground.style.visibility = 'hidden';

            setNavbarIsOpen(false);
        }
    }

    return (
        <Fragment>
            <header className="header-nav flex">
                <a href="#hero">
                    <img src={logo} alt="Fint" className="logo" />
                </a>
                <span className="hamburger" onClick={handleNavbarisOpen}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <nav className="header-nav flex">
                    <span className="navLinks">
                        <a href="#hero">Início</a>
                        <a href="#explore">Explorar</a>
                        <a href="#subscriptions">Planos</a>
                        <a href="#about-us">Sobre</a>
                    </span>
                    <span className="navActions">
                        <a href="/login">Conectar-se</a>
                        <a href="/cadastro" className="linkButton">Cadastrar-se</a>
                    </span>
                </nav>
            </header>
            <div class="nav-background"></div>
        </Fragment>
    );
}

export default Navbar;