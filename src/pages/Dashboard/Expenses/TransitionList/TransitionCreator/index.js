/* libraries */
import React, { Fragment, useEffect, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import PropTypes from 'prop-types';
/* schemas */
import { insertTransitionSchema } from './../../../../../store/schemas/insert-transition-schema';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import AuthenticationErrorMessage from './../../../../../components/AuthenticationErrorMessage';
import { Form, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* store */
import { INSERT_TRANSITION_URL } from './../../../../../store/api-urls';
/* utils */
import { getTodayDate } from './../../../../../utils/date-utils';

function TransitionCreator(props) {
    const [showSpinner, setShowSpinner] = useState(false);
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);

    const [authenticationError, setAuthenticationError] = useState(false);

    const handleShowSpinner = (value) => {
        setShowSpinner(value);
    }

    const handleIsSubmitBtnDisabled = (value) => {
        setIsSubmitBtnDisabled(value);
    }

    const insertTransition = () => {
        console.log('oi');
    }

    return (
        <Modal dialogClassName="transition-creator large-modal" show={props.showModal} onHide={props.closeModal} animation={false} scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Cadastrar {props.transitionType === 'expenses' ? 'Despesa' : props.transitionType === 'revenues' ? 'Receita' : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="flex">
                <Formik
                    onSubmit={(values) => insertTransition(values)}
                    initialValues={{
                        categoria: '',
                        observacaoMovimentacao: '',
                        dataMovimentacao: '',
                        periodoMovimentacao: '',
                        valorMovimentacao: 0
                    }}
                    validationSchema={insertTransitionSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form className="modal-form" noValidate onSubmit={handleSubmit}>
                            <AuthenticationErrorMessage authenticationError={authenticationError} />
                            <Form.Group as={Row} controlId="observacaoMovimentacao">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Nome da ${props.transitionType === 'expenses' ? 'Despesa' : props.transitionType === 'revenues' ? 'Receita' : ''}`}
                                        maxLength={300}
                                        name="observacaoMovimentacao"
                                        value={values.observacaoMovimentacao}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.observacaoMovimentacao && touched.observacaoMovimentacao ? "input-error" : ""}
                                        data-testid="txt-observacao-movimentacao"
                                        autoComplete="none"
                                    />
                                    {errors.observacaoMovimentacao && touched.observacaoMovimentacao && (
                                        <p className="error-message">{errors.observacaoMovimentacao}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="dataMovimentacao">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Data da Movimentação"
                                        min={getTodayDate()}
                                        max={getTodayDate()}
                                        name="dataMovimentacao"
                                        value={values.dataMovimentacao}
                                        onChange={handleChange}
                                        onBlur={e => {
                                            e.currentTarget.type = 'text';
                                            if (e.currentTarget.value === '') {
                                                e.currentTarget.value = '';
                                                handleChange(e);
                                            } else {
                                                const date = e.currentTarget.value.replaceAll('-', '/');
                                                const day = date.split('/')[2];
                                                const month = date.split('/')[1];
                                                const year = date.split('/')[0];

                                                e.currentTarget.value = `${day}/${month}/${year}`;
                                                handleChange(e);
                                            }
                                            handleBlur(e);
                                        }}
                                        onFocus={e => {
                                            e.currentTarget.type = 'date';
                                            handleChange(e);
                                        }}
                                        className={errors.dataObservacao && touched.dataObservacao ? "input-error" : ""}
                                        data-testid="txt-data-observacao"
                                        autoComplete="bday"
                                    />
                                    {errors.dataObservacao && touched.dataObservacao && (
                                        <p className="error-message">{errors.dataObservacao}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            {/* TODO: PERÍODO */}
                            {/* TODO: VALOR MOVIMENTAÇÃO */}
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <button className="cancel-button" onClick={props.closeModal}>
                    Cancelar
                </button>
                <button type="submit" disabled={isSubmitBtnDisabled}>
                    <div className={!showSpinner ? '' : 'none'}>Cadastrar</div>
                    <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                        <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                </button>
            </Modal.Footer>
        </Modal>
    );
}

TransitionCreator.propTypes = {
    transitionType: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}  

export default TransitionCreator;