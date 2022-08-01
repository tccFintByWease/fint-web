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
            <section className="login">
                <div className="login-box">
                    <img src={logo} alt="Fint" className="logo" />
                    <Form>
                        <Form.Group as={Row} controlId="email">
                            <Col>
                                <Form.Control type="email" placeholder="Email" name="email" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="nome">
                            <Col>
                                <Form.Control type="text" placeholder="Nome completo" name="nome" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="senha">
                            <Col className="password">
                                <Form.Control type="password" placeholder="Senha" name="senha" />
                                <FontAwesomeIcon icon={faEye} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="senha-confirmada">
                            <Col className="password">
                                <Form.Control type="password" placeholder="Confirme sua senha" name="senha-confirmada" />
                                <FontAwesomeIcon icon={faEye} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="cadastro">
                            <Col sm={12}>
                                <button type="submit">
                                    Cadastrar-se
                                </button>
                            </Col>
                        </Form.Group>
                        <p>Ao cadastrar-se, você concorda com nossos <A href="#">Termos de Uso e Política de Privacidade</A></p>
                        <hr />
                        <p>Já possui uma conta? <A href="/login">Conecte-se</A></p>
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
            </section>
        </Fragment>
    );
}

export default Cadastro;