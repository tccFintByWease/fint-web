import React, { Fragment, useState } from 'react';
import Login from './Login/index';
import Cadastro from './Cadastro/index';
import NovaSenha from './NovaSenha/index';
import RecuperarSenha from './RecuperarSenha/index';
import googlePlayBadge from './../../assets/images/google-play-badge.png';
import appStoreBadge from './../../assets/images/app-store-badge.png';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Authentication() {

    const [loginVisibility, setLoginVisilibity] = useState(true);
    const [signUpVisibility, setSignUpVisilibity] = useState(false);
    const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
    const [recoverPasswordVisibility, setRecoverPasswordVisibility] = useState(false);

    const handleFormVisibility = (form) => {
        setLoginVisilibity(false);
        setSignUpVisilibity(false);
        setNewPasswordVisibility(false);
        setRecoverPasswordVisibility(false);

        if (form === 'login') {
            setLoginVisilibity(true);
        } else if (form === 'signUp') {
            setSignUpVisilibity(true);
        } else if (form === 'newPassword') {
            newPasswordVisibility(true);
        } else if (form === 'recoverPassword') {
            setRecoverPasswordVisibility(true);
        }
    }

    return (
        <Fragment>
            <section className="authentication">
                <Login visibility={loginVisibility} handleFormVisibility={handleFormVisibility} />
                <Cadastro visibility={signUpVisibility} handleFormVisibility={handleFormVisibility} />
                <NovaSenha visibility={newPasswordVisibility} handleFormVisibility={handleFormVisibility} />
                <RecuperarSenha visibility={recoverPasswordVisibility} handleFormVisibility={handleFormVisibility} />
                <div className="download-box">
                    <p>Baixe o aplicativo</p>
                    <div className="download-buttons">
                        <a href="#">
                            <img src={googlePlayBadge} alt="Fint" />
                        </a>
                        <a href="#">
                            <img src={appStoreBadge} alt="Fint" />
                        </a>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Authentication;