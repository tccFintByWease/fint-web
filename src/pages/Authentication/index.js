import React, { Fragment, useState, useEffect } from 'react';
import Cadastro from './Cadastro/index';
import NovaSenha from './NovaSenha/index';
import RecuperarSenha from './RecuperarSenha/index';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {

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

    useEffect(() => {
        
    }, [loginVisibility, signUpVisibility, newPasswordVisibility, recoverPasswordVisibility] );

    return (
        <Fragment>
            <section className="authentication">
                {/*ver como usar essas classes para alterar visibilidade (props ou className? - ja criei o props no cadastro)*/}
                <Login loginVisibility />
                <Cadastro signUpVisibility />
                <NovaSenha newPasswordVisibility />
                <RecuperarSenha recoverPasswordVisibility />
                {/*a caixa de download do app é igual em todas as telas portanto pode ficar aqui ao inves de nos componentes*/}
            </section>
        </Fragment>
    );
}

export default Login;