/* libraries */
import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
/* schemas */
import { loginSchema } from './../../../store/schemas/login-schema';
/* stylesheets and assets */
import './styles.css';
import './../styles.css';
import logo from './../../../assets/images/black-logo.png';
import faEye from './../../../assets/images/eye-solid.png';
/* components */
import { Form, Row, Col } from 'react-bootstrap';
import DownloadBox from './../components/DownloadBox/index';
import AuthenticationErrorMessage from './../../../components/AuthenticationErrorMessage/index';
import { A, navigate } from 'hookrouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

/* utils */
import { handlePasswordVisibility } from './../../../utils/password-utils';

function Login() {

    const [authenticationError, setAuthenticationError] = useState(false);
    const AUTHENTICATE_URL = 'http://localhost:3001/api/login';

    const authenticateUser = async (userData) => {
        try {

            // returns true if login and password exist
            const apiData = await axios.post(AUTHENTICATE_URL, userData);

            if (apiData.data.result) {
                navigate('/dashboard')
            } else {
                const authenticateErrorMessage = document.querySelector('.authentication-error-message');
                authenticateErrorMessage.innerText = 'Email ou senha incorretos';
                setAuthenticationError(true);
            }

        } catch(error) {
            setAuthenticationError(true);
        }

    }

    return (
        <section className="authentication">
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <Formik
                    onSubmit={(values) => authenticateUser(values)}
                    initialValues={{
                        emailUsuario: '',
                        senhaUsuario: ''
                    }}
                    validationSchema={loginSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form className="authentication-form" noValidate onSubmit={handleSubmit}>
                            <AuthenticationErrorMessage authenticationError={authenticationError} />
                            <Form.Group as={Row} controlId="email">
                                <Col>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        maxLength={100}
                                        name="emailUsuario"
                                        value={values.emailUsuario}
                                        onChange={handleChange}
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
                            <Form.Group as={Row} controlId="password">
                                <Col className="password flex">
                                    <Form.Control
                                        type="password"
                                        placeholder="Senha"
                                        minLength={8}
                                        maxLength={50}
                                        name="senhaUsuario"
                                        value={values.senhaUsuario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.senhaUsuario && touched.senhaUsuario ? "input-error" : ""}
                                        data-testid="txt-senha-usuario"
                                        autoComplete="current-password"
                                    />
                                    <img src={faEye} alt="Ícone de olho" id="passwordButton" onClick={(event) => handlePasswordVisibility(event)} />
                                </Col>
                                {errors.senhaUsuario && touched.senhaUsuario && (
                                    <p className="error-message">{errors.senhaUsuario}</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Row} controlId="login">
                                <Col sm={12}>
                                    <button type="submit"
                                    data-testid="btn-authenticate-user">
                                        Entrar
                                    </button>
                                </Col>
                            </Form.Group>
                            <A href="/reset-password">
                                Esqueceu sua senha?
                            </A>
                            <hr />
                            <Form.Group as={Row} controlId="loginFacebook">
                                <Col sm={12}>
                                    <button className="btn-facebook">
                                        <FontAwesomeIcon icon={faFacebook} />
                                        Entrar com o Facebook
                                    </button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="loginGoogle">
                                <Col>
                                    <button className="btn-google">
                                        <FontAwesomeIcon icon={faGoogle} />
                                        Entrar com o Google
                                    </button>
                                </Col>
                            </Form.Group>
                            <A href="/sign-up">Crie uma nova conta</A>
                        </Form>
                    )}
                </Formik>
            </div>
            <DownloadBox />
        </section>
    );
}

export default Login;