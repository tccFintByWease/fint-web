import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { A } from 'hookrouter';
import DownloadBox from './../components/DownloadBox/index';
import './styles.css';
import './../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Login() {
    
    const AUTHENTICATE_URL = '';

    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().min(10).max(20)
    })

    const authenticateUser = (data) => {
        try {
            // ADICIONAR ASYNC NA FUNÇÃO (async (data) => {})
            // await axios.post(AUTHENTICATE_URL, data);
        } catch(error) {

        }

    }

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
                        values,
                        touched,
                        errors
                    }) => (
                        <Form className="authentication-form" noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="email">
                                <Col>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email" name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={touched.email && !!errors.email}
                                        data-testid="txt-email"
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Insira um email válido
                                </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="password">
                                <Col className="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Senha"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        data-testid="txt-password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Senha incorreta
                                    </Form.Control.Feedback>
                                    <FontAwesomeIcon icon={faEye} />
                                </Col>
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