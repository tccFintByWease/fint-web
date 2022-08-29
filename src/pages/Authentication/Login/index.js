import React, { Fragment } from 'react';
import { Form, Row, Col, Modal } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { A } from 'hookrouter';
import PropTypes from 'prop-types';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login(props) {
    return (
        <Fragment>
            <div className={props.visibility ? 'authentication-box' : 'authentication-box none'}>
                <img src={logo} alt="Fint" className="logo" />
                <Form>
                    <Form.Group as={Row} controlId="usuario">
                        <Col>
                            <Form.Control type="text" placeholder="Usuário" name="usuario" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="senha">
                        <Col className="password">
                            <Form.Control type="password" placeholder="Senha" name="senha" />
                            <FontAwesomeIcon icon={faEye} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="login">
                        <Col sm={12}>
                            <button type="submit">
                                Entrar
                            </button>
                        </Col>
                    </Form.Group>
                    <A href="#" onClick={() => props.handleFormVisibility('recoverPassword')}>Esqueceu sua senha?</A>
                    <hr />
                    <Form.Group as={Row} controlId="loginFacebook">
                        <Col sm={12}>
                            <button type="submit" className="btn-facebook">
                                <FontAwesomeIcon icon={faFacebook} />
                                Entrar com o Facebook
                            </button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="loginGoogle">
                        <Col sm={12}>
                            <button type="submit" className="btn-google">
                                <FontAwesomeIcon icon={faGoogle} />
                                Entrar com o Google
                            </button>
                        </Col>
                    </Form.Group>
                    <A href="#" onClick={() => props.handleFormVisibility('signUp')}>Crie uma nova conta</A>
                </Form>
            </div>
        </Fragment>
    );
}

Login.propTypes = {
    visibility: PropTypes.bool.isRequired,
    handleFormVisibility: PropTypes.func.isRequired
}

export default Login;