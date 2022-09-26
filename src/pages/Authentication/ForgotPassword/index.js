/* libraries */
import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
/* schemas */
import { forgotPasswordSchema } from './../../../store/schemas/forgot-password-schema';
/* stylesheets and assets */
import './../styles.css';
import logo from './../../../assets/images/black-logo.png';
import faEye from './../../../assets/images/eye-solid.png';
/* components */
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import DownloadBox from './../components/DownloadBox/index';
import AuthenticationErrorMessage from './../../../components/AuthenticationErrorMessage/index';
import { A, navigate } from 'hookrouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
/* utils */
import { handlePasswordVisibility } from './../../../utils/password-utils';

// TODO - APÓS ACABAR ESSA PÁGINA:
/*
    - Fazer o mesmo no Esqueci a senha (enviar link de recuperação), Código de Recuperação (inserir código), Trocar Senha (código de recuperação)
    - Arrumar todos os links de todas as páginas até então + criar a página de dashboard (início) e deixar linkada
*/

function ForgotPassword() {

    const [showSpinner, setShowSpinner] = useState(false);
    const [isRecoverBtnDisabled, setIsRecoverBtnDisabled] = useState(false);

    const [authenticationError, setAuthenticationError] = useState(false);
    const RECOVER_PASSWORD_URL = '';

    const handleShowSpinner = (value) => {
        setShowSpinner(value);
    }

    const handleIsRecoverBtnDisabled = (value) => {
        setIsRecoverBtnDisabled(value);
    }

    const handleFormVisibility = (form) => {

        const forgotPassword = document.querySelector('.forgot-password');
        const recoverPassword = document.querySelector('.recover-password');
        const resetPassword = document.querySelector('.reset-password');

        if (form === 1) {
            forgotPassword.classList.remove('none');
            recoverPassword.classList.add('none');
            resetPassword.classList.add('none');
        } else if (form === 2) {
            forgotPassword.classList.add('none');
            recoverPassword.classList.remove('none');
            resetPassword.classList.add('none');
        } else if (form === 3) {
            forgotPassword.classList.add('none');
            recoverPassword.classList.add('none');
            resetPassword.classList.remove('none');
        }
    }

    const sendVerificationCode = async (userData) => {
        const authenticateErrorMessage = document.querySelector('.authentication-error-message');

        // TODO: Implementar o NodeMail com a API
        console.log('Botão funcionando');

        try {
            // disable the button until the API returns
            handleShowSpinner(true);
            handleIsLoginBtnDisabled(true);

            // returns true if login and password exist
            const apiData = await axios.post(RECOVER_PASSWORD_URL, userData);

            // if (apiData.data.result) {
            if (apiData.data.result.emailUsuario === userData.emailUsuario) {
                console.log('Email encontrado');
                handleFormVisibility(2);
            } else {
                authenticateErrorMessage.innerText = 'O email inserido não foi encontrado';
                setAuthenticationError(true);

                document.querySelector('#email').classList.add('input-error');
            }

            // the button remains disabled until a field is changed
            handleShowSpinner(false);
            
        } catch(error) {
            authenticateErrorMessage.innerText = `Erro ao enviar o código de verificação.\nTente novamente em instantes`;
            setAuthenticationError(true);
            handleShowSpinner(false);
        }
    }

    return (
        <section className="authentication">
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <Formik
                    onSubmit={(values) => sendVerificationCode(values)}
                    initialValues={{
                        emailUsuario: ''
                    }}
                    validationSchema={forgotPasswordSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form className="authentication-form forgot-password" noValidate onSubmit={handleSubmit}>
                            <AuthenticationErrorMessage authenticationError={authenticationError} />
                            <Form.Group as={Row} controlId="email">
                                <Col>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        maxLength={100}
                                        name="emailUsuario"
                                        value={values.emailUsuario}
                                        onChange={e => {
                                            if (isRecoverBtnDisabled) {
                                                handleIsRecoverBtnDisabled(false);
                                                e.currentTarget.classList.remove('input-error');
                                                setAuthenticationError(false);
                                            }
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.emailUsuario && touched.emailUsuario ? "input-error" : ""}
                                        data-testid="txt-email-usuario"
                                        autoComplete="email"
                                    />
                                    {errors.emailUsuario && touched.emailUsuario && (
                                        <p className="error-message">{errors.emailUsuario}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="forgotPasswordButton">
                                <Col sm={12}>
                                    <button type="submit" disabled={isLoginBtnDisabled}>
                                        <div className={!showSpinner ? '' : 'none'}>Enviar link de recuperação</div>
                                        <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner>
                                    </button>
                                </Col>
                            </Form.Group>
                            <p>Verifique seu email ou telefone e acesse o link enviado para recuperar sua conta</p>
                            <hr />
                            <p><A href="/sign-up">Criar uma nova conta</A> ou <A href="/login">Conectar-se</A></p>
                        </Form>
                    )}
                </Formik>
                <Formik
                    onSubmit={(values) => sendVerificationCode(values)}
                    initialValues={{
                        primeiroDigito: '',
                        segundoDigito: '',
                        terceiroDigito: '',
                        quartoDigito: '',
                        quintoDigito: '',
                        sextoDigito: ''
                    }}
                    validationSchema={recoverPasswordSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form className="authentication-form recover-password" noValidate onSubmit={handleSubmit}>
                            <AuthenticationErrorMessage authenticationError={authenticationError} />
                            <Form.Group as={Row} controlId="firstDigit">
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        minLength="1"
                                        maxLength="1"
                                        name="primeiroDigito"
                                        value={values.primeiroDigito}
                                        onChange={e => {
                                            if (isRecoverBtnDisabled) {
                                                handleIsRecoverBtnDisabled(false);
                                                e.currentTarget.classList.remove('input-error');
                                                // TODO: método que seleciona todos os inputs de dígito e remove a classe de erro
                                                setAuthenticationError(false);
                                            }
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.primeiroDigito && touched.primeiroDigito ? "input-error" : ""}
                                        data-testid="txt-primeiro-digito"
                                        autoComplete="off"
                                    />
                                    {errors.primeiroDiito && touched.primeiroDiito && (
                                        <p className="error-message">{errors.primeiroDiito}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="forgotPasswordButton">
                                <Col sm={12}>
                                    <button type="submit" disabled={isLoginBtnDisabled}>
                                        <div className={!showSpinner ? '' : 'none'}>Enviar link de recuperação</div>
                                        <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner>
                                    </button>
                                </Col>
                            </Form.Group>
                            <p>Verifique seu email ou telefone e acesse o link enviado para recuperar sua conta</p>
                            <hr />
                            <p><A href="/sign-up">Criar uma nova conta</A> ou <A href="/login">Conectar-se</A></p>
                        </Form>
                    )}
                </Formik>
            </div>
            <DownloadBox />
        </section>
    );
}

export default ForgotPassword;