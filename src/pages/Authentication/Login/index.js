import React, { Fragment } from 'react';
import { Form, Row, Col, Modal } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import googlePlayBadge from './../../../assets/images/google-play-badge.png';
import appStoreBadge from './../../../assets/images/app-store-badge.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { A, Navigate } from 'hookrouter';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cadastro() {
    return (
        <Fragment>
            <div className="authentication-box">
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
                    <a href="/recuperar-senha">Esqueceu sua senha?</a>
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
                    <A href="/cadastro">Crie uma nova conta</A>
                </Form>
            </div>
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
        </Fragment>
    );
}

export default Cadastro;