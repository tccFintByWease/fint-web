import React, { Fragment } from 'react';
import './styles.css';
import logo from './../../../assets/images/black-logo.png';

function Navbar() {
    return (
        <Fragment>
            <header>
                <a href="#">
                    <img src={logo} alt="Fint" class="logo" />
                </a>
                <nav>
                    <span class="navLinks">
                        <a href="#">Início</a>
                        <a href="#">Explorar</a>
                        <a href="#">Planos</a>
                        <a href="#">Sobre</a>
                    </span>
                    <span class="navActions">
                        <a href="#">Conectar-se</a>
                        <a href="#" class="linkButton">Cadastrar-se</a>
                    </span>
                </nav>
            </header>
        </Fragment>
    );
}

export default Navbar;