/* libraries */
import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import _ from 'lodash';
/* schemas */
import { stepOneSchema, stepTwoSchema, stepThreeSchema } from '../../../store/schemas/sign-up-schemas';
/* stylesheets and assets */
import './styles.css';
import './../styles.css';
import logo from './../../../assets/images/black-logo.png';
import faEye from './../../../assets/images/eye-solid.png';
/* components */
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import { A, navigate } from 'hookrouter';
import Button from './../../../components/Button/index';
import DownloadBox from './../components/DownloadBox/index';
import AuthenticationErrorMessage from './../../../components/AuthenticationErrorMessage/index';
/* utils */
import { formatCPF } from './../../../utils/cpf-utils';
import { formatPhone } from './../../../utils/phone-utils';
import { handlePasswordVisibility } from './../../../utils/password-utils';
import { getTodayDate } from './../../../utils/date-utils';
/* store */
import ListCurrencies from './../../../store/currencies';

// TODO - APÓS ACABAR ESSA PÁGINA:
/*
    - Fazer o mesmo no Esqueci a senha (enviar link de recuperação), Código de Recuperação (inserir código), Trocar Senha (código de recuperação)
    - Arrumar todos os links de todas as páginas até então + criar a página de dashboard (início) e deixar linkada
*/

// TODO - Arrumar pro achieved step e current step se tornarem um só, assim evito problemas de não ter como atualizar os valores quando volto um passo
// TODO - Arrumar o valor padrão do select
// TODO - Implementar o firstMovement
// TODO - Arrumar a mensagem de erro + spinner
// TODO - Deixar mais claro o cadastro da primeira receita na última tela de cadastro

function SignUp() {

    const [showSpinner, setShowSpinner] = useState(false);
    const [isSignUpBtnDisabled, setIsSignUpBtnDisabled] = useState(false);

    const [authenticationError, setAuthenticationError] = useState(false);

    const [achievedStep, setAchievedStep] = useState(1); // the steps reached by the user
    const [currentStep, setCurrentStep] = useState(1); // the step in which the user is

    const SIGN_UP_URL = 'http://localhost:3001/api/usuario';

    const handleShowSpinner = (value) => {
        setShowSpinner(value);
    }

    const handleIsSignUpBtnDisabled = (value) => {
        setIsSignUpBtnDisabled(value);
    }

    const handleFormVisibility = (step) => {
        const stepDescription = document.querySelector('.step-description');

        const stepOne = document.querySelector('.sign-up-step-one');
        const stepTwo = document.querySelector('.sign-up-step-two');
        const stepThree = document.querySelector('.sign-up-step-three');

        if (step === 1) {
            stepOne.classList.remove('none');
            stepTwo.classList.add('none');
            stepThree.classList.add('none');

            stepDescription.innerText = '1. Email e Senha';
        } else if (step === 2) {
            stepOne.classList.add('none');
            stepTwo.classList.remove('none');
            stepThree.classList.add('none');

            stepDescription.innerText = '2. Dados Pessoais';
        } else if (step === 3) {
            stepOne.classList.add('none');
            stepTwo.classList.add('none');
            stepThree.classList.remove('none');

            stepDescription.innerText = '3. Moeda Padrão';
        }
    }

    const handleStep = (values, step, completeStep) => {
        const stepProgress = document.querySelectorAll('.step-progress');

        if (completeStep) {
            if (achievedStep === 1) {
                console.log('stepOneValues:');
                console.log(values);
                localStorage.setItem('stepOneValues', JSON.stringify(values));
                
                if (currentStep === achievedStep) {
                    stepProgress[0].style.width = "50%";
                    stepProgress[1].style.width = "50%";

                    handleStep('', currentStep + 1, false, achievedStep + 1);
                    setAchievedStep(2);
                }
                
            } else if (achievedStep === 2) {
                console.log('stepTwoValues:');
                console.log(values);
                localStorage.setItem('stepTwoValues', JSON.stringify(values));
                
                if (currentStep === achievedStep) {
                    stepProgress[0].style.width = "95%";
                    stepProgress[1].style.width = "5%";

                    setAchievedStep(3);
                }
            }

            handleStep('', currentStep + 1, false);
        } else {
            if (values === 'click') {
                if (step === 1) {
                    handleFormVisibility(1);
                    setCurrentStep(1);
                } else if (step === 2 && achievedStep >= 2) {
                    handleFormVisibility(2);
                    setCurrentStep(2);
                } else if (step === 3 && achievedStep >= 3) {
                    handleFormVisibility(3);
                    setCurrentStep(3);
                }
            } else {
                if (step === 1) {
                    handleFormVisibility(1);
                    setCurrentStep(1);
                } else if (step === 2 && achievedStep + 1 >= 2) {
                    handleFormVisibility(2);
                    setCurrentStep(2);
                } else if (step === 3 && achievedStep + 1 >= 3) {
                    handleFormVisibility(3);
                    setCurrentStep(3);
                }
            }
        }
    }

    const completeSignUp = async (values) => {
        const stepOneData = JSON.parse(localStorage.getItem('stepOneValues'));
        const stepTwoData = JSON.parse(localStorage.getItem('stepTwoValues'));

        const idMoeda = 1;
        const dataCadastroUsuario = getTodayDate();

        const userData = {...stepOneData, ...stepTwoData, idMoeda, dataCadastroUsuario};
        localStorage.setItem('userData', JSON.stringify(userData));
        delete userData.confirmarSenha;

        const authenticateErrorMessage = document.querySelector('.authentication-error-message');
        
        try {
            console.log('apiData:');
            // returns a user object
            const apiData = await axios.post(SIGN_UP_URL, userData);
            
            console.log(apiData);
            console.log('userData:');
            console.log(userData);

            // disable the button until the API returns
            handleShowSpinner(true);
            // handleIsSignUpBtnDisabled(true);

            setTimeout(() => {
                if (_.isEqual(apiData.data.result, userData)) {
                    // navigate('/dashboard');
                    console.log('Cadastro concluído com sucesso');
                }
            }, 2000)

            handleShowSpinner(false);
            // handleIsSignUpBtnDisabled(false);

        } catch(error) {
            authenticateErrorMessage.innerText = 'Erro ao autenticar o usuário.\nTente novamente em instantes';
            setAuthenticationError(true);
        }
    }

    return (
        <section className="authentication">
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <div className="sign-up-step">
                    <p className="step-description">1. Email e senha</p>
                    <div className="steps-bar flex">
                        <span className={`${achievedStep >= 1 ? 'step flex achieved-step' : 'step flex'} ${currentStep === 1 ? 'current-step' : ''}`} onClick={() => handleStep('click', 1, false)}>1</span>
                        <div className="step-progress"></div>
                        <span className={`${achievedStep >= 2 ? 'step flex achieved-step' : 'step flex'} ${currentStep === 2 ? 'current-step' : ''}`} onClick={() => handleStep('click', 2, false)}>2</span>
                        <div className="step-progress"></div>
                        <span className={`${achievedStep >= 3 ? 'step flex achieved-step' : 'step flex'} ${currentStep === 3 ? 'current-step' : ''}`} onClick={() => handleStep('click', 3, false)}>3</span>
                    </div>
                </div>
                <Formik
                    onSubmit={(values) => handleStep(values, 2, true)}
                    initialValues={{
                        emailUsuario: '',
                        senhaUsuario: '',
                        confirmarSenha: ''
                    }}
                    validationSchema={stepOneSchema}>
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
                                        type="email"
                                        placeholder="Email"
                                        maxLength={100}
                                        name="emailUsuario"
                                        value={values.emailUsuario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.emailUsuario && touched.emailUsuario ? "input-error" : ""}
                                        data-testid="txt-email-usuario"
                                        autoComplete="email"
                                    />
                                    {errors.emailUsuario && touched.emailUsuario && (
                                        <p className="error-message">{errors.emailUsuario}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="password">
                                <Col className="password flex">
                                    <Form.Control
                                        type="password"
                                        placeholder="Senha"
                                        minLength={8}
                                        maxLength={50}
                                        name="senhaUsuario"
                                        value={values.senhaUsuario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.senhaUsuario && touched.senhaUsuario ? "input-error" : ""}
                                        data-testid="txt-senha-usuario"
                                        autoComplete="new-password"
                                    />
                                    <img src={faEye} alt="Ícone de olho" id="passwordButton" onClick={(event) => handlePasswordVisibility(event)} />
                                </Col>
                                {errors.senhaUsuario && touched.senhaUsuario && (
                                    <p className="error-message">{errors.senhaUsuario}</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Row} controlId="passwordConfirmation">
                                <Col className="password flex">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        minLength={8}
                                        maxLength={50}
                                        name="confirmarSenha"
                                        value={values.confirmarSenha}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.confirmarSenha && touched.confirmarSenha ? "input-error" : ""}
                                        data-testid="txt-confirmar-senha"
                                        autoComplete="new-password"
                                    />
                                    <img src={faEye} alt="Ícone de olho" id="passwordConfirmationButton" onClick={(event) => handlePasswordVisibility(event)} />
                                </Col>
                                {errors.confirmarSenha && touched.confirmarSenha && (
                                    <p className="error-message">{errors.confirmarSenha}</p>
                                )}
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
                        nomeUsuario: '',
                        cpfUsuario: '',
                        foneUsuario: '',
                        dataNascUsuario: ''
                    }}
                    validationSchema={stepTwoSchema}>
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
                                    type="text"
                                    placeholder="Nome completo"
                                    maxLength={255}
                                    name="nomeUsuario"
                                    value={values.nomeUsuario}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.nomeUsuario && touched.nomeUsuario ? "input-error" : ""}
                                    data-testid="txt-nomeUsuario"
                                    autoComplete="name"
                                />
                                {errors.nomeUsuario && touched.nomeUsuario && (
                                    <p className="error-message">{errors.nomeUsuario}</p>
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
                                        name="cpfUsuario"
                                        value={values.cpfUsuario}
                                        onChange={e => {
                                            e.currentTarget.value = formatCPF(e.currentTarget.value);
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.cpfUsuario && touched.cpfUsuario ? "input-error" : ""}
                                        data-testid="txt-cpf-usuario"
                                        autoComplete="off"
                                    />
                                    {errors.cpfUsuario && touched.cpfUsuario && (
                                        <p className="error-message">{errors.cpfUsuario}</p>
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
                                        name="foneUsuario"
                                        value={values.passwordConfirmation}
                                        onChange={e => {
                                            e.currentTarget.value = formatPhone(e.currentTarget.value);
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        className={errors.foneUsuario && touched.foneUsuario ? "input-error" : ""}
                                        data-testid="txt-fone-usuario"
                                        autoComplete="tel-national"
                                    />
                                    {errors.foneUsuario && touched.foneUsuario && (
                                        <p className="error-message">{errors.foneUsuario}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="birthDate">
                                <Col>
                                    <Form.Control
                                        type="date"
                                        min='1922-01-01'
                                        max={getTodayDate()}
                                        name="dataNascUsuario"
                                        value={values.dataNascUsuario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.dataNascUsuario && touched.dataNascUsuario ? "input-error" : ""}
                                        data-testid="txt-data-nasc-usuario"
                                        autoComplete="bday"
                                    />
                                    {errors.dataNascUsuario && touched.dataNascUsuario && (
                                        <p className="error-message">{errors.dataNascUsuario}</p>
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
                    onSubmit={(values) => completeSignUp(values)}
                    initialValues={{
                        valorInicial: '',
                        moeda: 0
                    }}
                    validationSchema={stepThreeSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values
                    }) => (
                        <Form className="authentication-form sign-up-step-three none" noValidate onSubmit={handleSubmit}>
                            <AuthenticationErrorMessage authenticationError={authenticationError} />
                            <Form.Group as={Row} controlId="firstMovement">
                                <Col className="flex">
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        name="valorInicial"
                                        value={values.valorInicial}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        data-testid="txt-valor-inicial"
                                        autoComplete="off"
                                    />
                                    <select
                                        name="moeda"
                                        id="currenciesSelect"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue="BRL"
                                        data-testid="select-moeda"
                                    >
                                        <ListCurrencies />
                                    </select>
                                </Col>
                                <p>Cadastre uma renda inicial para começar a utilizar a plataforma</p>
                                <p>Caso deseje, isso poderá ser feito há qualquer momento após o cadastro</p>
                            </Form.Group>
                            <Form.Group as={Row} controlId="signUpButton">
                                <Col>
                                <button type="submit" disabled={isSignUpBtnDisabled}>
                                        <div className={!showSpinner ? '' : 'none'}>Cadastrar-se</div>
                                        <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner>
                                    </button>
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