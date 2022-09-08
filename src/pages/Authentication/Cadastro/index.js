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
import Button from './../../../components/Button/index';
import axios from 'axios';

function Cadastro(props) {

    const SIGN_UP_URL = '';

    const schemaStepOne = yup.object({
        email: yup.string()
            .email('Insira um email válido').required('Insira seu email'),

        password: yup.string()
            .required('Insira sua senha')
            .min(10, 'A senha deve ter no mínimo 10 caracteres')
            .max(20, 'A senha deve ter entre 10 e 20 caracteres'),

        confirmPassword: yup.string().required()
            .min(10, 'A senha deve ter no mínimo 10 caracteres')
            .max(20, 'A senha deve ter entre 10 e 20 caracteres')
            .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
    })

    const schemaStepTwo = yup.object({
        // fazer
    })

    const passStep = () => {
        // criar a verificação do forms
        const stepOne = document.querySelector('.sign-up-step-one');
        const stepTwo = document.querySelector('.sign-up-step-two');

        stepOne.classList.add('none');
        stepTwo.classList.remove('none');
    }

    return (
        <div className={props.visibility ? 'authentication-box' : 'authentication-box none'}>
            <img src={logo} alt="Fint" className="logo" />
            <Form className="authentication-form sign-up-step-one">
                <div className="sign-up-step">
                    <p>Email e senha</p>
                    <div className="steps-bar flex">
                        <span className="flex">1</span>
                        <div className="step-progress"></div>
                        <div className="step-progress"></div>
                        <span className="flex">2</span>
                    </div>
                </div>
                <Form.Group as={Row} controlId="email">
                    <Col>
                        <Form.Control type="text" placeholder="Email" name="email" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password">
                    <Col className="password">
                        <Form.Control type="password" placeholder="Senha" name="password" />
                        <FontAwesomeIcon icon={faEye} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="confirmPassword">
                    <Col className="password">
                        <Form.Control type="password" placeholder="Confirme sua senha" name="confirmPassword" />
                        <FontAwesomeIcon icon={faEye} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="next-step">
                    <Col>
                        <Button text="Avançar" transparent={false} onClick={passStep} />
                    </Col>
                </Form.Group>
            </Form>
            <Form className="authentication-form sign-up-step-two none">
            <div className="sign-up-step">
                    <p>2. Dados pessoais</p>
                    <div className="steps-bar flex">
                        <span className="flex">1</span>
                        <div className="step-progress"></div>
                        <div className="step-progress"></div>
                        <span className="flex">2</span>
                    </div>
                </div>
                <Form.Group as={Row} controlId="name">
                <Col>
                    <Form.Control type="name" placeholder="Nome completo" name="name" />
                </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="cpf">
                    <Col>
                        <Form.Control type="text" placeholder="CPF" name="cpf" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="phone">
                    <Col>
                        <Form.Control type="tel" placeholder="Número de telefone" name="phone" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="birth-date">
                    <Col>
                        <Form.Control type="date" placeholder="Data de nascimento" name="date" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="sign-up">
                    <Col>
                        <Button type="submit" text="Cadastrar-se" transparent={false} />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

Cadastro.propTypes = {
    visibility: PropTypes.bool.isRequired,
    handleFormVisibility: PropTypes.func.isRequired
}

export default Cadastro;