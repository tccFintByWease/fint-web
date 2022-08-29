import React, { Fragment } from 'react';
import { Form, Row, Col, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { A } from 'hookrouter';
import PropTypes from 'prop-types';
import logo from './../../../assets/images/black-logo.png';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecuperarSenha(props) {
    return (
        <Fragment>
            <div className={props.visibility ? 'authentication-box' : 'authentication-box none'}>
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
                    <p><A href="#" onClick={() => props.handleFormVisibility('signUp')}>Criar uma nova conta</A> ou <A href="#" onClick={() => props.handleFormVisibility('login')}>Conectar-se</A></p>
                </Form>
            </div>
        </Fragment>
    );
}

RecuperarSenha.propTypes = {
    visibility: PropTypes.bool.isRequired,
    handleFormVisibility: PropTypes.func.isRequired
}

export default RecuperarSenha;