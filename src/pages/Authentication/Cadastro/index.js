import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import faEye from './../../../assets/images/eye-solid.png';
import faEyeSlash from './../../../assets/images/eye-slash-solid.png';
import { A } from 'hookrouter';
import PropTypes from 'prop-types';
import './styles.css';
import './../styles.css';
import Button from './../../../components/Button/index';
import ListCurrencies from './Currencies/index';
import { validateCPF, formatCPF } from './../../../utils/cpf-utils';
import { formatPhone } from './../../../utils/phone-utils';
import axios from 'axios';

// LISTA:

/*
    - CRIAR OS BOTÕES PRA VOLTAR NOS PASSOS (COM AUTO PREENCHIMENTO DOS FORMS USANDO O LOCAL STORAGE)
    - CRIAR UMA PÁGINA PRA CADA COMPONENTE DE AUTENTICAÇÃO
    - MUDAR OS NOMES PRA INGLÊS
    - CRIAR A PASSWORD UTILS
*/

function Cadastro(props) {

    const [step, setStep] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);
    const [stepOneValues, setStepOneValues] = useState('');
    const [stepTwoValues, setStepTwoValues] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const SIGN_UP_URL = '';

    const schemaStepOne = yup.object({

        email: yup.string()
            .email('Insira um email válido')
            .required('Insira seu email')
            .max(320, 'O email deve ter no máximo 320 caracteres'),

        password: yup.string()
            .required('Insira sua senha')
            .min(10, 'A senha deve ter no mínimo 10 caracteres')
            .max(20, 'A senha deve ter entre 10 e 20 caracteres'),

        passwordConfirmation: yup.string()
            .required('Confirme sua senha')
            .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
    });

    const schemaStepTwo = yup.object({
        name: yup.string()
            .required('Insira seu nome completo'),

        cpf: yup.string()
            .required('Insira seu CPF')
            .min(14, 'Insira um CPF válido').max(14)
            .test('validated-cpf', 'Insira um CPF válido', (cpf) => validateCPF(cpf)),

        phone: yup.string()
            .required('Insira seu telefone')
            .min(15, 'Insira um telefone válido').max(15),

        birthDate: yup.date()
            .required('Insira sua data de nascimento')
    });

    const schemaStepThree = yup.object({
        initialValue: yup.number()
            .required(),

        currentCurrency: yup.string()
            .required()
    });

    const selectStep = (step) => {
        const root = document.querySelector(':root');
        const variables = getComputedStyle(root);
        const stepDescription = document.querySelector('.step-description');

        const stepOne = document.querySelector('.sign-up-step-one');
        const stepTwo = document.querySelector('.sign-up-step-two');
        const stepThree = document.querySelector('.sign-up-step-three');

        const stepProgress = document.querySelectorAll('.step-progress');

        const steps = document.querySelectorAll('.step');

        // Arrumar o step e o CurrentStep: quando estiver em um passo, poder voltar pros que já avançou tanto no botão quanto nos botões de passo, e não pular passos
        // Arrumar o CSS disso (passo selecionado, passo alcançado, hover etc)
        if (step === 1) {
            stepOne.classList.remove('none');
            stepTwo.classList.add('none');
            stepThree.classList.add('none');

            stepProgress[0].style.width = "5%";
            stepProgress[1].style.width = "95%";
            
            steps[0].style.backgroundColor = variables.getPropertyValue('--primaryGreen');
            steps[1].style.backgroundColor = variables.getPropertyValue('--detailsGray');
            steps[2].style.backgroundColor = variables.getPropertyValue('--detailsGray');

            stepDescription.innerText = '2. Dados pessoais';
        } else if (step === 2 && currentStep >= 2) {
            stepOne.classList.add('none');
            stepTwo.classList.remove('none');
            stepThree.classList.add('none');

            stepProgress[0].style.width = "50%";
            stepProgress[1].style.width = "50%";
            
            steps[0].style.backgroundColor = variables.getPropertyValue('--primaryGreen');
            steps[1].style.backgroundColor = variables.getPropertyValue('--primaryGreen');
            steps[2].style.backgroundColor = variables.getPropertyValue('--detailsGray');

            stepDescription.innerText = '2. Dados pessoais';

            setStep(step);
        } else if (step === 3 && currentStep === 3) {
            stepOne.classList.add('none');
            stepTwo.classList.add('none');
            stepThree.classList.remove('none');

            stepProgress[0].style.width = "95%";
            stepProgress[1].style.width = "5%";

            steps[0].style.backgroundColor = variables.getPropertyValue('--primaryGreen');
            steps[1].style.backgroundColor = variables.getPropertyValue('--primaryGreen');
            steps[2].style.backgroundColor = variables.getPropertyValue('--primaryGreen');

            stepDescription.innerText = '3. Moeda padrão';

            setStep(step);
        }
    }

    const passStep = (values) => {
        if (step === 1) {
            localStorage.setItem('stepOneValues', JSON.stringify(values));

            selectStep(2);
            setCurrentStep(2);
        } else if (step === 2) {
            localStorage.setItem('stepTwoValues', JSON.stringify(values));

            selectStep(3);
            setCurrentStep(3);
        }
    }

    function handlePasswordVisibility(event) {
        const password = document.querySelector('#password');
        const passwordConfirmation = document.querySelector('#passwordConfirmation');

        const passwordButton = document.querySelector('#passwordButton');
        const passwordConfirmationButton = document.querySelector('#passwordConfirmationButton');
        const button = event.target;

        if (!passwordVisibility) {
            if (button === passwordButton) {
                password.type = 'text';
            } else if (button === passwordConfirmationButton) {
                passwordConfirmation.type = 'text';
            }

            button.src = faEyeSlash;
            setPasswordVisibility(true);
        } else {
            if (button === passwordButton) {
                password.type = 'password';
            } else if (button === passwordConfirmationButton) {
                passwordConfirmation.type = 'password';
            }

            button.src = faEye;
            setPasswordVisibility(false);
        }
    }

    const signUp = (values) => {
        setStepOneValues(JSON.parse(localStorage.getItem('stepOneValues')));
        setStepTwoValues(JSON.parse(localStorage.getItem('stepTwoValues')));

        const userData = {...stepOneValues, ...stepTwoValues, ...values}
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);

        try {
            // ADICIONAR ASYNC NA FUNÇÃO (async (data) => {})
            // await axios.post(SIGN_UP_URL, data);
        } catch(error) {

        }

        console.log(values);
    }

    return (
        <div className={props.visibility ? 'authentication-box' : 'authentication-box none'}>
            <img src={logo} alt="Fint" className="logo" />
            <div className="sign-up-step">
                <p className="step-description">1. Email e senha</p>
                <div className="steps-bar flex">
                    <span className="step flex" onClick={() => selectStep(1)}>1</span>
                    <div className="step-progress"></div>
                    <span className="step flex" onClick={() => selectStep(2)}>2</span>
                    <div className="step-progress"></div>
                    <span className="step flex" onClick={() => selectStep(3)}>3</span>
                </div>
            </div>
            <Formik
                onSubmit={(values) => passStep(values)}
                initialValues={{
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                }}
                validationSchema={schemaStepOne}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors
                }) => (
                    <Form className="authentication-form sign-up-step-one" noValidate onSubmit={handleSubmit}>
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
                            <Col className="password">
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
                                {errors.password && touched.password && (
                                    <p className="error-message">{errors.password}</p>
                                )}
                                <img src={faEye} alt="Ícone de olho" id="passwordButton" onClick={(event) => handlePasswordVisibility(event)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="passwordConfirmation">
                            <Col className="password">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirme sua senha"
                                    minLength={10}
                                    maxLength={20}
                                    name="passwordConfirmation"
                                    value={values.passwordConfirmation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.passwordConfirmation && touched.passwordConfirmation ? "input-error" : ""}
                                    data-testid="txt-password-confirmation"
                                />
                                {errors.passwordConfirmation && touched.passwordConfirmation && (
                                    <p className="error-message">{errors.passwordConfirmation}</p>
                                )}
                                <img src={faEye} alt="Ícone de olho" id="passwordConfirmationButton" onClick={(event) => handlePasswordVisibility(event)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="passStepOne">
                            <Col>
                                <Button type="submit" text="Avançar" transparent={false} />
                            </Col>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
            <Formik
                onSubmit={(values) => passStep(values)}
                initialValues={{
                    name: '',
                    cpf: '',
                    phone: '',
                    birthDate: ''
                }}
                validationSchema={schemaStepTwo}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors
                }) => (
                    <Form className="authentication-form sign-up-step-two none" noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="name">
                        <Col>
                            <Form.Control
                                type="name"
                                placeholder="Nome completo"
                                maxLength={255}
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.name && touched.name ? "input-error" : ""}
                                data-testid="txt-name"
                            />
                            {errors.name && touched.name && (
                                <p className="error-message">{errors.name}</p>
                            )}
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="cpf">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="CPF"
                                    minLength={15}
                                    maxLength={15}
                                    name="cpf"
                                    value={values.cpf}
                                    onChange={e => {
                                        e.currentTarget.value = formatCPF(e.currentTarget.value);
                                        handleChange(e);
                                    }}
                                    onBlur={handleBlur}
                                    className={errors.cpf && touched.cpf ? "input-error" : ""}
                                    data-testid="txt-cpf"
                                />
                                {errors.cpf && touched.cpf && (
                                    <p className="error-message">{errors.cpf}</p>
                                )}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="phone">
                            <Col>
                                <Form.Control
                                    type="tel"
                                    placeholder="Número de telefone"
                                    minLength={15}
                                    maxLength={15}
                                    name="phone"
                                    value={values.passwordConfirmation}
                                    onChange={e => {
                                        e.currentTarget.value = formatPhone(e.currentTarget.value);
                                        handleChange(e);
                                    }}
                                    onBlur={handleBlur}
                                    className={errors.phone && touched.phone ? "input-error" : ""}
                                    data-testid="txt-phone"
                                />
                                {errors.phone && touched.phone && (
                                    <p className="error-message">{errors.phone}</p>
                                )}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="birthDate">
                            <Col>
                                <Form.Control
                                    type="date"
                                    name="birthDate"
                                    value={values.birthDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.birthDate && touched.birthDate ? "input-error" : ""}
                                    data-testid="txt-birth-date"
                                />
                                {errors.birthDate && touched.birthDate && (
                                    <p className="error-message">{errors.birthDate}</p>
                                )}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="passStepTwo">
                            <Col>
                                <Button type="submit" text="Avançar" transparent={false} />
                            </Col>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
            <Formik
                onSubmit={(values) => signUp(values)}
                initialValues={{
                    initialValue: '',
                    currentCurrency: ''
                }}
                validationSchema={schemaStepThree}>
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values
                }) => (
                    <Form className="authentication-form sign-up-step-three none" noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="initialValue">
                            <Col className="flex">
                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                    name="initialValue"
                                    value={values.initialValue}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    data-testid="txt-initial-value"
                                />
                                <select
                                    name="currentCurrency"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    data-testid="select-current-currency"
                                >
                                    <ListCurrencies />
                                </select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="signUpButton">
                            <Col>
                                <Button type="submit" text="Cadastrar-se" transparent={false} />
                            </Col>
                        </Form.Group>
                        <p>Ao cadastrar-se, você concorda com nossos <A href="/documentacao" onClick={() => window.location.reload()}>Termos de Uso e Política de Privacidade</A></p>
                        <hr />
                    </Form>
                )}
            </Formik>
            <p>Já possui uma conta? <A href="#" onClick={() => props.handleFormVisibility('login')}>Conecte-se</A></p>
        </div>
    );
}

Cadastro.propTypes = {
    visibility: PropTypes.bool.isRequired,
    handleFormVisibility: PropTypes.func.isRequired
}

export default Cadastro;