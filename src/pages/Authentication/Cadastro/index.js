import React from 'react';
import { Form, Row, Col, Modal } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { A } from 'hookrouter';
import PropTypes from 'prop-types';
import './styles.css';
import './../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cadastro(props) { {/*IMPORTAR TODOS OS BOTÕES DESSA PÁGINA DEPOIS*/}
    return (
        <div className={props.visibility ? 'authentication-box' : 'authentication-box none'}>
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
                <p>Já possui uma conta? <A href="#" onClick={() => props.handleFormVisibility('login')}>Conecte-se</A></p>
            </Form>
        </div>
    );
}

Cadastro.propTypes = {
    visibility: PropTypes.bool.isRequired,
    handleFormVisibility: PropTypes.func.isRequired
}

export default Cadastro;