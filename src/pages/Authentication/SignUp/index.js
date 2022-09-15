import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import logo from './../../../assets/images/black-logo.png';
import { Formik } from 'formik';
import { schemaStepOne, schemaStepTwo, schemaStepThree } from '../../../store/schemas/sign-up-schemas';
import faEye from './../../../assets/images/eye-solid.png';
import { A } from 'hookrouter';
import './styles.css';
import './../styles.css';
import Button from './../../../components/Button/index';
import DownloadBox from './../components/DownloadBox/index'
import ListCurrencies from './../../../store/currencies';
import { formatCPF } from './../../../utils/cpf-utils'
import { formatPhone } from './../../../utils/phone-utils';
import { handlePasswordVisibility } from './../../../utils/password-utils';
import axios from 'axios';

function SignUp() {

    const [achievedStep, setAchievedStep] = useState(1); // the steps reached by the user
    const [currentStep, setCurrentStep] = useState(1); // the step in which the user is
    const [stepOneValues, OneValues] = useState('');
    const [stepTwoValues, TwoValues] = useState('');

    const SIGN_UP_URL = '';

    const handleFormVisibility = (step) => {
        const stepDescription = document.querySelector('.step-description');

        const stepOne = document.querySelector('.sign-up-step-one');
        const stepTwo = document.querySelector('.sign-up-step-two');
        const stepThree = document.querySelector('.sign-up-step-three');

        if (step === 1) {
            stepOne.classList.remove('none');
            stepTwo.classList.add('none');
            stepThree.classList.add('none');

            stepDescription.innerText = '1. Email e senha';
        } else if (step === 2) {
            stepOne.classList.add('none');
            stepTwo.classList.remove('none');
            stepThree.classList.add('none');

            stepDescription.innerText = '2. Dados pessoais';
        } else if (step === 3) {
            stepOne.classList.add('none');
            stepTwo.classList.add('none');
            stepThree.classList.remove('none');

            stepDescription.innerText = '3. Moeda padrão';
        }
    }

    // ARRUMAR ISSO
    const handleStep = (values, step, completeStep) => {
        const stepProgress = document.querySelectorAll('.step-progress');
        const steps = document.querySelectorAll('.step');

        if (completeStep) {
            if (achievedStep === 1) {
                localStorage.setItem('stepOneValues', JSON.stringify(values));
    
                stepProgress[0].style.width = "50%";
                stepProgress[1].style.width = "50%";
    
                if (currentStep === achievedStep) setAchievedStep(2);
    
                handleFormVisibility(2);
                
            } else if (achievedStep === 2) {
                localStorage.setItem('stepTwoValues', JSON.stringify(values));
    
                stepProgress[0].style.width = "95%";
                stepProgress[1].style.width = "5%";
    
                if (currentStep === achievedStep) setAchievedStep(3);
                
                handleFormVisibility(3);
            }
        } else {
            if (step === 1) {
                steps[0].classList.add('current-step');
                steps[1].classList.remove('current-step');
                steps[2].classList.remove('current-step');
    
                handleFormVisibility(1);
                setCurrentStep(1);
            } else if (step === 2 && achievedStep >= 2) {
                steps[0].classList.remove('current-step');
                steps[1].classList.add('current-step');
                steps[2].classList.remove('current-step');
    
                handleFormVisibility(2);
                setCurrentStep(2);
            } else if (step === 3 && achievedStep === 3) {
                steps[0].classList.remove('current-step');
                steps[1].classList.remove('current-step');
                steps[2].classList.add('current-step');
    
                handleFormVisibility(3);
                setCurrentStep(3);
            }
        }
    }

    const signUp = (values) => {
        OneValues(JSON.parse(localStorage.getItem('stepOneValues')));
        TwoValues(JSON.parse(localStorage.getItem('stepTwoValues')));

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
        <section className="authentication">
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <div className="sign-up-step">
                    <p className="step-description">1. Email e senha</p>
                    <div className="steps-bar flex">
                        <span className={achievedStep >= 1 ? 'step flex current-step achieved-step' : 'step flex current-step'} onClick={() => handleStep('', 1, false)}>1</span>
                        <div className="step-progress"></div>
                        <span className={achievedStep >= 2 ? 'step flex achieved-step' : 'step flex'} onClick={() => handleStep('', 2, false)}>2</span>
                        <div className="step-progress"></div>
                        <span className={achievedStep === 3 ? 'step flex achieved-step' : 'step flex'} onClick={() => handleStep('', 3, false)}>3</span>
                    </div>
                </div>
                <Formik
                    onSubmit={(values) => handleStep(values, 2, true)}
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
                            <Form.Group as={Row} controlId="handleStepOne">
                                <Col>
                                    <Button type="submit" text="Avançar" transparent={false} />
                                </Col>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
                <Formik
                    onSubmit={(values) => handleStep(values, 3, true)}
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
                            <Form.Group as={Row} controlId="handleStepTwo">
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
                <p>Já possui uma conta? <A href="/login">Conecte-se</A></p>
            </div>
            <DownloadBox />
        </section>
    );
}

export default SignUp;