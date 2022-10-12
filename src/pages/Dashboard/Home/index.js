/* libraries */
import React, { Fragment, useState } from 'react';
import axios from 'axios';
/* stylesheets and assets */
import './styles.css';
// import './media-queries.css';
import logo from './../../../assets/images/black-logo.png';
/* components */
import { A, navigate } from 'hookrouter';
import TopNavbar from './../components/TopNavbar/index';
import Button from './../../../components/Button/index';
/* contexts */
import { useAuth } from './../../../contexts/auth';

function Home() {
    const {user} = useAuth();

    return (
        <Fragment>
            <TopNavbar />
            <section className="dashboard">
                {/* Menu lateral */}
                <section className="home">
                    <h1>Bem-vindo de volta, <span className="username-title">{user?.nomeUsuario}</span></h1>
                </section>
            </section>
        </Fragment>
    );
}

export default Home;