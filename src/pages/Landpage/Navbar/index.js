import React, { Fragment } from 'react';
import './styles.css';
import logo from './../../../assets/images/black-logo.png';

function Navbar() {

    // fix the menu on the top of the page
    const scrollFunction = () => {
        if (document.body.scrollTop > 119 || document.documentElement.scrollTop > 119) {
            document.querySelector('.header-nav').classList.add('fixed');
        } else {
            document.querySelector('.header-nav').classList.remove('fixed');
        }
    }

    window.onscroll = function() { scrollFunction() };

    return (
        <Fragment>
            <header className="header-nav flex">
                <a href="#hero">
                    <img src={logo} alt="Fint" className="logo" />
                </a>
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
        </Fragment>
    );
}

export default Navbar;