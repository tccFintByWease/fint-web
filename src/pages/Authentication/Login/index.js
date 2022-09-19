/* libraries */
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
/* stylesheets and assets */
import './styles.css';
import './../styles.css';
import logo from './../../../assets/images/black-logo.png';
import faEye from './../../../assets/images/eye-solid.png';
/* components */
import { Form, Row, Col } from 'react-bootstrap';
import DownloadBox from './../components/DownloadBox/index';
import { A } from 'hookrouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
/* utils */
import { handlePasswordVisibility } from './../../../utils/password-utils';

function Login() {

    const AUTHENTICATE_URL = 'http://localhost:3001/api/login';

    // TODO - APÓS ACABAR ESSA PÁGINA:
    /*
        - Fazer o mesmo no Cadastro, Esqueci a senha (enviar link de recuperação), Código de Recuperação (inserir código), Trocar Senha (código de recuperação)
        - Arrumar todos os links de todas as páginas até então + criar a página de dashboard (início) e deixar linkada
    */

    const authenticateUser = async (userData) => {
        try {

            // returns true if login and password exist
            const apiData = await axios.post(AUTHENTICATE_URL, userData);
            
            // TODO [API] - O MÉTODO DE LOGIN DEVE:
            /*
                - Receber o email e senha do campos do formulário;
                - Verificar se o email existe;
                    - Se sim, retornar o email
                    - Se não, retornar uma mensagem de erro
                - Verificar se a senha existe;
                    - Se sim, retornar a senha
                    - Se não, retornar uma mensagem de erro
            */

            // TODO: validar se o email existe no banco e exibir mensagem de erro
            // TODO: validar se a senha existe no banco e exibir mensagem de erro
            if (apiData.data.result.emailUsuario !== userData.emailUsuario) {
                // exibir mensagem de erro quando o email é incorreto
                document.querySelectorAll('error-message')[0].innerHTML = 'teste';
            } else if (apiData.data.result.senhaUsuario !== userData.senhaUsuario) {
                // exibir mensagem de erro quando a senha é incorreta
                document.querySelectorAll('error-message')[1].innerHTML = 'teste';
            } else {
                console.log('Realizar o login');
            }
        } catch(error) {
            console.log(error);
        }

    }

    // TODO: se possível, transferir esse schema para um arquivo separado
    const schema = yup.object({
        emailUsuario: yup.string()
            .email('Insira um email válido')
            .required('Insira seu email')
            .max(100, 'O email deve conter um máximo de 100 caracteres'),
    
        senhaUsuario: yup.string()
            .required('Insira sua senha')
            .min(8, 'A senha deve conter um mínimo de 8 caracteres')
            .max(50, 'A senha deve conter entre 8 e 50 caracteres')
            
    });

    return (
        <section className="authentication">
            <div className="authentication-box">
                <img src={logo} alt="Fint" className="logo" />
                <Formik
                    onSubmit={(values) => authenticateUser(values)}
                    initialValues={{
                        emailUsuario: '',
                        senhaUsuario: '',
                    }}
                    validationSchema={schema}>
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
                                        autoComplete="current-password"
                                    />
                                    <img src={faEye} alt="Ícone de olho" id="passwordButton" onClick={(event) => handlePasswordVisibility(event)} />
                                </Col>
                                {errors.senhaUsuario && touched.senhaUsuario && (
                                    <p className="error-message">{errors.senhaUsuario}</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Row} controlId="login">
                                <Col sm={12}>
                                    <button type="submit"
                                    data-testid="btn-authenticate-user">
                                        Entrar
                                    </button>
                                </Col>
                            </Form.Group>
                            <A href="/reset-password">
                                Esqueceu sua senha?
                            </A>
                            <hr />
                            <Form.Group as={Row} controlId="loginFacebook">
                                <Col sm={12}>
                                    <button className="btn-facebook">
                                        <FontAwesomeIcon icon={faFacebook} />
                                        Entrar com o Facebook
                                    </button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="loginGoogle">
                                <Col>
                                    <button className="btn-google">
                                        <FontAwesomeIcon icon={faGoogle} />
                                        Entrar com o Google
                                    </button>
                                </Col>
                            </Form.Group>
                            <A href="/sign-up">Crie uma nova conta</A>
                        </Form>
                    )}
                </Formik>
            </div>
            <DownloadBox />
        </section>
    );
}

export default Login;