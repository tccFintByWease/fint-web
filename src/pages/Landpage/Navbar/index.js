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
                    <span className="navLinks">
                        <a href="#">Início</a>
                        <a href="#">Explorar</a>
                        <a href="#">Planos</a>
                        <a href="#">Sobre</a>
                    </span>
                    <span className="navActions">
                        <a href="#">Conectar-se</a>
                        <a href="#" className="linkButton">Cadastrar-se</a>
                    </span>
                </nav>
            </header>
        </Fragment>
    );
}

export default Navbar;