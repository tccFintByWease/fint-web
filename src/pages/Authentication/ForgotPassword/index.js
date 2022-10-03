/* libraries */
import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
/* schemas */
import { forgotPasswordSchema, recoverPasswordSchema, resetPasswordSchema } from './../../../store/schemas/forgot-password-schema';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
import './../styles.css';
import './../media-queries.css';
import logo from './../../../assets/images/black-logo.png';
import faEye from './../../../assets/images/eye-solid.png';
/* components */
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import DownloadBox from './../components/DownloadBox/index';
import AuthenticationErrorMessage from './../../../components/AuthenticationErrorMessage/index';
import { A, navigate } from 'hookrouter';
/* utils */
import { handlePasswordVisibility } from './../../../utils/password-utils';

// TODO - APÓS ACABAR ESSA PÁGINA:
/*
    - Arrumar todos os links de todas as páginas até então + criar a página de dashboard (início) e deixar linkada
*/

function ForgotPassword() {

    // TODO: gerar um código aleatório com a API

    const [showSpinner, setShowSpinner] = useState(false);
    const [isRecoverBtnDisabled, setIsRecoverBtnDisabled] = useState(false);
    
    const [verificationCode, setVerificationCode] = useState(972348);
    const [user, setUser] = useState('');

    const [authenticationError, setAuthenticationError] = useState(false);
    const RECOVER_PASSWORD_URL = '';
    const RESET_PASSWORD_URL = '';

    const removeErrorClassFromInputs = () => {
        const digits = document.querySelectorAll('.digit');

        for (let i = 0; i < digits.length; i++) {
            digits[i].classList.remove('input-error');
        }
    }

    const addErrorClassInInputs = () => {
        const digits = document.querySelectorAll('.digit');

        for (let i = 0; i < digits.length; i++) {
            digits[i].classList.add('input-error');
        }
    }

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
            handleIsRecoverBtnDisabled(true);

            // returns true if email exist
            const apiData = await axios.post(RECOVER_PASSWORD_URL, userData);

            // if (apiData.data.result) {
            if (apiData.data.result.emailUsuario === userData.emailUsuario) {
                console.log('Email encontrado');

                setUser(apiData.data.result);

                // TODO: GERAR CÓDIGO E ENVIAR PARA O EMAIL
                setVerificationCode(972348);

                handleFormVisibility(2);
            } else {
                authenticateErrorMessage.innerText = 'O email inserido não foi encontrado';
                setAuthenticationError(true);

                document.querySelector('#email').classList.add('input-error');
            }

            // the button remains disabled until a field is changed
            handleShowSpinner(false);

        } catch(error) {
            authenticateErrorMessage.innerText = `Erro ao enviar o código.\nTente novamente em instantes`;
            setAuthenticationError(true);
            handleShowSpinner(false);
        }
    }

    const checkVerificationCode = (userData) => {
        const authenticateErrorMessage = document.querySelector('.authentication-error-message');
        
        const code = Number(userData.primeiroDigito + userData.segundoDigito + userData.terceiroDigito + userData.quartoDigito + userData.quintoDigito + userData.sextoDigito);

        if (code === verificationCode) {
            setAuthenticationError(false);
            handleFormVisibility(3);
        } else {
            authenticateErrorMessage.innerText = `Código de verificação incorreto.\nCaso necessário, solicite o reenvio`;
            setAuthenticationError(true);

            addErrorClassInInputs();
        }
    }

    const resetPassword = async (userData, user) => {
        const authenticateErrorMessage = document.querySelector('.authentication-error-message');

        try {
            // disable the button until the API returns
            handleShowSpinner(true);
            handleIsRecoverBtnDisabled(true);

            const data = userData.user = user;

            // returns true if login and password exist
            const apiData = await axios.post(RESET_PASSWORD_URL, data);
            
            console.log('Senha alterada');
            // navigate('/login');

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
                <AuthenticationErrorMessage authenticationError={authenticationError} />
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
                                    <button type="submit" disabled={isRecoverBtnDisabled}>
                                        <div className={!showSpinner ? '' : 'none'}>Enviar código</div>
                                        <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner>
                                    </button>
                                </Col>
                            </Form.Group>
                            <p>Insira o email da sua conta para receber o código de verificação</p>
                            <hr />
                            <p><A href="/sign-up">Criar uma nova conta</A> ou <A href="/login">Conectar-se</A></p>
                        </Form>
                    )}
                </Formik>
                <Formik
                    onSubmit={(values) => checkVerificationCode(values)}
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
                        <Form className="authentication-form recover-password none" noValidate onSubmit={handleSubmit}>
                            <div className="digits-box flex">
                                <Form.Group as={Row} controlId="firstDigit">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="0"
                                            minLength={1}
                                            maxLength={1}
                                            name="primeiroDigito"
                                            value={values.primeiroDigito}
                                            onChange={e => {
                                                if (isRecoverBtnDisabled) {
                                                    handleIsRecoverBtnDisabled(false);
                                                    setAuthenticationError(false);
                                                }

                                                if (e.currentTarget.value !== '')
                                                    document.querySelector('#secondDigit').focus();
                                                
                                                if (e.currentTarget.classList.contains('input-error'))
                                                    removeErrorClassFromInputs();

                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={errors.primeiroDigito && touched.primeiroDigito ? "digit input-error" : "digit"}
                                            data-testid="txt-primeiro-digito"
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="secondDigit">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="0"
                                            minLength={1}
                                            maxLength={1}
                                            name="segundoDigito"
                                            value={values.segundoDigito}
                                            onChange={e => {
                                                if (isRecoverBtnDisabled) {
                                                    handleIsRecoverBtnDisabled(false);
                                                    setAuthenticationError(false);
                                                }

                                                if (e.currentTarget.value !== '')
                                                    document.querySelector('#thirdDigit').focus();

                                                if (e.currentTarget.classList.contains('input-error'))
                                                    removeErrorClassFromInputs();

                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={errors.segundoDigito && touched.segundoDigito ? "digit input-error" : "digit"}
                                            data-testid="txt-segundo-digito"
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="thirdDigit">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="0"
                                            minLength={1}
                                            maxLength={1}
                                            name="terceiroDigito"
                                            value={values.terceiroDigito}
                                            onChange={e => {
                                                if (isRecoverBtnDisabled) {
                                                    handleIsRecoverBtnDisabled(false);
                                                    setAuthenticationError(false);
                                                }

                                                if (e.currentTarget.value !== '')
                                                    document.querySelector('#fourthDigit').focus();

                                                if (e.currentTarget.classList.contains('input-error'))
                                                    removeErrorClassFromInputs();
                                                    
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={errors.terceiroDigito && touched.terceiroDigito ? "digit input-error" : "digit"}
                                            data-testid="txt-terceiro-digito"
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="fourthDigit">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="0"
                                            minLength={1}
                                            maxLength={1}
                                            name="quartoDigito"
                                            value={values.quartoDigito}
                                            onChange={e => {
                                                if (isRecoverBtnDisabled) {
                                                    handleIsRecoverBtnDisabled(false);
                                                    setAuthenticationError(false);
                                                }

                                                if (e.currentTarget.value !== '')
                                                    document.querySelector('#fifthDigit').focus();

                                                if (e.currentTarget.classList.contains('input-error'))
                                                    removeErrorClassFromInputs();
                                                    
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={errors.quartoDigito && touched.quartoDigito ? "digit input-error" : "digit"}
                                            data-testid="txt-quarto-digito"
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="fifthDigit">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="0"
                                            minLength={1}
                                            maxLength={1}
                                            name="quintoDigito"
                                            value={values.quintoDigito}
                                            onChange={e => {
                                                if (isRecoverBtnDisabled) {
                                                    handleIsRecoverBtnDisabled(false);
                                                    setAuthenticationError(false);
                                                }

                                                if (e.currentTarget.value !== '')
                                                    document.querySelector('#sixthDigit').focus();

                                                if (e.currentTarget.classList.contains('input-error'))
                                                    removeErrorClassFromInputs();

                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={errors.quintoDigito && touched.quintoDigito ? "digit input-error" : "digit"}
                                            data-testid="txt-quinto-digito"
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="sixthDigit">
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="0"
                                            minLength={1}
                                            maxLength={1}
                                            name="sextoDigito"
                                            value={values.sextoDigito}
                                            onChange={e => {
                                                if (isRecoverBtnDisabled) {
                                                    handleIsRecoverBtnDisabled(false);
                                                    setAuthenticationError(false);
                                                }

                                                if (e.currentTarget.classList.contains('input-error'))
                                                    removeErrorClassFromInputs();

                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={errors.sextoDigito && touched.sextoDigito ? "digit input-error" : "digit"}
                                            data-testid="txt-sexto-digito"
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            {((errors.primeiroDigito && touched.primeiroDigito) ||
                                (errors.segundoDigito && touched.segundoDigito) ||
                                (errors.terceiroDigito && touched.terceiroDigito) ||
                                (errors.quartoDigito && touched.quartoDigito) ||
                                (errors.quintoDigito && touched.quintoDigito) ||
                                (errors.sextoDigito && touched.sextoDigito)) && (
                                    <p className="error-message">Insira o código completo</p>
                                )}
                            <Form.Group as={Row} controlId="forgotPasswordButton">
                                <Col sm={12}>
                                    <button type="submit" disabled={isRecoverBtnDisabled}>
                                        <div className={!showSpinner ? '' : 'none'}>Inserir código</div>
                                        <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner>
                                    </button>
                                </Col>
                                <p>Verifique seu email e utilize o código enviado para recuperar sua conta</p>
                            </Form.Group>
                            <hr />
                            <p><A href="#" onClick={() => sendVerificationCode(user)}>Reenviar código de verificação</A></p>
                        </Form>
                    )}
                </Formik>
                <Formik
                    onSubmit={(values) => resetPassword(values, user)}
                    initialValues={{
                        senhaUsuario: '',
                        confirmarSenha: ''
                    }}
                    validationSchema={resetPasswordSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form className="authentication-form reset-password none" noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="password">
                                <Col className="password flex">
                                    <Form.Control
                                        type="password"
                                        placeholder="Senha"
                                        minLength={8}
                                        maxLength={50}
                                        name="senhaUsuario"
                                        value={values.senhaUsuario}
                                        onChange={e => {
                                            if (isRecoverBtnDisabled) {
                                                handleIsRecoverBtnDisabled(false);
                                                e.currentTarget.classList.remove('input-error');
                                                setAuthenticationError(false);
                                            }
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.senhaUsuario && touched.senhaUsuario ? "input-error" : ""}
                                        data-testid="txt-senha-usuario"
                                        autoComplete="new-password"
                                    />
                                    <img src={faEye} alt="Ícone de olho" id="passwordButton" onClick={(event) => handlePasswordVisibility(event)} />
                                </Col>
                                {errors.senhaUsuario && touched.senhaUsuario && (
                                    <p className="error-message">{errors.senhaUsuario}</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Row} controlId="passwordConfirmation">
                                <Col className="password flex">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        minLength={8}
                                        maxLength={50}
                                        name="confirmarSenha"
                                        value={values.confirmarSenha}
                                        onChange={e => {
                                            if (isRecoverBtnDisabled) {
                                                handleIsRecoverBtnDisabled(false);
                                                e.currentTarget.classList.remove('input-error');
                                                setAuthenticationError(false);
                                            }
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.confirmarSenha && touched.confirmarSenha ? "input-error" : ""}
                                        data-testid="txt-confirmar-senha"
                                        autoComplete="new-password"
                                    />
                                    <img src={faEye} alt="Ícone de olho" id="passwordConfirmationButton" onClick={(event) => handlePasswordVisibility(event)} />
                                </Col>
                                {errors.confirmarSenha && touched.confirmarSenha && (
                                    <p className="error-message">{errors.confirmarSenha}</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Row} controlId="resetPasswordButton">
                                <Col>
                                    <button type="submit" disabled={isRecoverBtnDisabled}>
                                        <div className={!showSpinner ? '' : 'none'}>Alterar Senha</div>
                                        <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner>
                                    </button>
                                </Col>
                            </Form.Group>
                            <p>Cadastre uma nova senha</p>
                        </Form>
                    )}
                </Formik>
            </div>
            <DownloadBox />
        </section>
    );
}

export default ForgotPassword;