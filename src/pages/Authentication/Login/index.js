import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
// import { schema } from '../../../store/schemas/login-schemas';
import faEye from './../../../assets/images/eye-solid.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { A } from 'hookrouter';
import DownloadBox from './../components/DownloadBox/index';
import { handlePasswordVisibility } from './../../../utils/password-utils';
import './styles.css';
import './../styles.css';
import axios from 'axios';
import { jsx } from '@emotion/react';

function Login() {
    
    const AUTHENTICATE_URL = 'http://localhost:3001/api/login';

    const authenticateUser = async (data) => {
        try {
            const teste = {
                "emailUsuario": "felipperdz@gmail.com",
                "senhaUsuario": "1234567891"
            }

            const userData = await axios.post(AUTHENTICATE_URL, teste);
            console.log(userData);
            console.log(teste);
            
            if (userData.data.result.emailUsuario === teste.emailUsuario && userData.data.result.senhaUsuario === teste.senhaUsuario) {
                console.log('Realizar o login');
            } else {
                console.log('Exibir mensagem de login / senha incorretos');
            }
            
        } catch(error) {
            console.log(error);
        }

    }

    const schema = yup.object({
        email: yup.string()
            .email('Insira um email válido')
            .required('Insira seu email')
            .max(320, 'O email deve ter no máximo 320 caracteres'),

        password: yup.string()
            .required('Insira sua senha')
            .min(10, 'A senha deve ter no mínimo 10 caracteres')
            .max(20, 'A senha deve ter entre 10 e 20 caracteres')
    });

    return (
        <section className="authentication">
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <Formik
                    onSubmit={(values) => authenticateUser(values)}
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={schema}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form className="authentication-form" noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="email">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        maxLength={320}
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email && touched.email ? "input-error" : ""}
                                        data-testid="txt-email"
                                    />
                                    {errors.email && touched.email && (
                                        <p className="error-message">{errors.email}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="password">
                                <Col className="password flex">
                                    <Form.Control
                                        type="password"
                                        placeholder="Senha"
                                        minLength={10}
                                        maxLength={20}
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.password && touched.password ? "input-error" : ""}
                                        data-testid="txt-password"
                                    />
                                    <img src={faEye} alt="Ícone de olho" id="passwordButton" onClick={(event) => handlePasswordVisibility(event)} />
                                </Col>
                                {errors.password && touched.password && (
                                    <p className="error-message msg-password">{errors.password}</p>
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