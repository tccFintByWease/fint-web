/* libraries */
import React, { Fragment, useState } from 'react';
import axios from 'axios';
/* stylesheets and assets */
import './styles.css';
// import './media-queries.css';
import logo from './../../assets/images/black-logo.png';
/* components */
import { A, navigate } from 'hookrouter';
import Button from './../../components/Button/index';
/* contexts */
import { useAuth } from './../../contexts/auth';

function Dashboard() {
    const {user, signOut} = useAuth();

    function handleSignOut() {
        signOut();
        navigate('/login');
    }

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <p>{user?.nomeUsuario}</p>
            <p>{user?.emailUsuario}</p>
            <button onClick={handleSignOut}>Sair</button>
        </Fragment>
    );
}

export default Dashboard;