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
                    <Form.Group as={Row} controlId="email">
                        <Col>
                            <Form.Control type="email" placeholder="Email" name="email" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="recuperar-senha">
                        <Col sm={12}>
                            <button type="submit">
                                Enviar link de recuperação
                            </button>
                        </Col>
                    </Form.Group>
                    <p>Verifique seu email ou telefone e acesse o link enviado para recuperar sua conta</p>
                    <hr />
                    <p><A href="/cadastro">Criar uma nova conta</A> ou <A href="/login">Conectar-se</A></p>
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