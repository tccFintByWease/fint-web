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

function NovaSenha() {
    return (
        <Fragment>
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <Form>
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
                                Alterar senha
                            </button>
                        </Col>
                    </Form.Group>
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

export default NovaSenha;