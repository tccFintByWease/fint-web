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
import { getSpecificDate } from './../../../../../utils/date-utils';

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

    const insertTransition = (data) => {
        console.log(data);
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
                        valorMovimentacao: ''
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
                        <Form className="modal-form" id="transitionCreator" noValidate onSubmit={handleSubmit}>
                            <AuthenticationErrorMessage authenticationError={authenticationError} />
                            <Form.Group as={Row} controlId="transitionCategories">
                                <Col>
                                    <Form.Label>Período</Form.Label>
                                    <select
                                        name="categoriasMovimentacao"
                                        id="transitionCategoriesSelect"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue=""
                                        data-testid="select-transition-categories"
                                    >
                                        {/* TODO: listar todas as categorias */}
                                    </select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="transitionObservation">
                                <Col>
                                    <Form.Label>Nome</Form.Label>
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
                                        autoComplete="off"
                                    />
                                    {errors.observacaoMovimentacao && touched.observacaoMovimentacao && (
                                        <p className="error-message">{errors.observacaoMovimentacao}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="transitionDate">
                                <Col>
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Data da ${props.transitionType === 'expenses' ? 'Despesa' : props.transitionType === 'revenues' ? 'Receita' : ''}`}
                                        min={getSpecificDate(0, 0, -1)}
                                        max={getSpecificDate(0, 0, 1)}
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
                                        className={errors.dataMovimentacao && touched.dataMovimentacao ? "input-error" : ""}
                                        data-testid="txt-data-movimentacao"
                                        autoComplete="off"
                                    />
                                    {errors.dataMovimentacao && touched.dataMovimentacao && (
                                        <p className="error-message">{errors.dataMovimentacao}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="transitionDate">
                                <Col>
                                    <Form.Label>Período</Form.Label>
                                    <select
                                        name="periodoMovimentacao"
                                        id="periodSelect"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue="Nenhum"
                                        data-testid="select-periodo"
                                    >
                                        <option value="Nenhum" key="1">
                                            Nenhum
                                        </option>
                                        <option value="Semanal" key="2">
                                            Semanal
                                        </option>
                                        <option value="Quinzenal" key="3">
                                            Quinzenal
                                        </option>
                                        <option value="Mensal" key="4">
                                            Mensal
                                        </option>
                                        <option value="Bimestral" key="5">
                                            Bimestral
                                        </option>
                                        <option value="Trimestral" key="6">
                                            Trimestral
                                        </option>
                                        <option value="Semestral" key="7">
                                            Semestral
                                        </option>
                                        <option value="Anual" key="8">
                                            Anual
                                        </option>
                                    </select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="transitionValue">
                                <Col>
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        name="valorMovimentacao"
                                        value={values.valorMovimentacao}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        data-testid="txt-valor-inicial"
                                        autoComplete="off"
                                    />
                                    {errors.valorMovimentacao && touched.valorMovimentacao && (
                                        <p className="error-message">{errors.valorMovimentacao}</p>
                                    )}
                                </Col>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <button className="cancel-button" onClick={props.closeModal}>
                    Cancelar
                </button>
                <button className="btn-action" type="submit" form="transitionCreator" disabled={isSubmitBtnDisabled}>
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