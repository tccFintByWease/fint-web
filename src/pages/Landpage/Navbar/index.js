import React, { Fragment, useState } from 'react';
import './styles.css';
import './mediaQueries.css';
import logo from './../../../assets/images/black-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

    const [navbarIsOpen, setNavbarIsOpen] = useState(false);

    // quando tá aberto o menu e volta a tela:
    //              - não reseta a visibilidade do menu
    //              - o fundo não sai
    //              - tirar o mobile navbar do menu
    //              - ativar o menu fixado quando abrir ele direto (chamar o método de scroll)
    //              - OK mobile navbar não sai quando redimensiona a tela
    
    // fix the menu on the top of the page
    const scrollFunction = () => {
        if (document.body.scrollTop > 119 || document.documentElement.scrollTop > 119) {
            document.querySelector('.header').classList.add('fixed');
        } else {
            document.querySelector('.header').classList.remove('fixed');
        }
    }

    window.onscroll = function() { scrollFunction() }

    const handleNavbarisOpen = () => {
        if (window.innerWidth > 1299) {
            openNavbar(); /* TODO: ABRIR E FECHAR O MENU QUANDO REDIMENSIONA A TELA E PASSA DE 1299 */
        } else if (window.innerWidth <= 1299) {
            closeNavbar();
        }

        if (!navbarIsOpen) {
            openNavbar();
        } else {
            closeNavbar();
        }
    }

    const openNavbar = () => {
        const nav = document.querySelector('.header-nav');
        const navLinks = document.querySelector('.nav-links');
        const navActions = document.querySelector('.nav-actions');
        const navBackground = document.querySelector('.nav-background');

        nav.classList.add('mobile-navbar');

        navLinks.classList.add('flex');
        navActions.classList.add('flex');

        nav.style.visibility = 'visible';
        navBackground.style.visibility = 'visible';

        setNavbarIsOpen(true);
    }

    const closeNavbar = () => {
        const nav = document.querySelector('.header-nav');
        const navLinks = document.querySelector('.nav-links');
        const navActions = document.querySelector('.nav-actions');
        const navBackground = document.querySelector('.nav-background');

        nav.classList.remove('mobile-navbar');

        navLinks.classList.remove('flex');
        navActions.classList.remove('flex');

        nav.style.visibility = 'hidden';
        navBackground.style.visibility = 'hidden';

        setNavbarIsOpen(false);
    }

    return (
        <Fragment>
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
                        <a href="/cadastro" className="linkButton">Cadastrar-se</a>
                    </span>
                </nav>
            </header>
            <div className="nav-background"></div>
        </Fragment>
    );
}

export default Navbar;