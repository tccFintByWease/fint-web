import React from 'react';
import { Form, Row, Col, Modal } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import './styles.css';
import './../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { A, Navigate } from 'hookrouter';
import DownloadBox from './../components/DownloadBox/index';
import 'bootstrap/dist/css/bootstrap.min.css';

function NovaSenha() {
    return (
        <section className="authentication">
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <Form className="authentication-form">
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
            <DownloadBox />
        </section>
    );
}

export default NovaSenha;