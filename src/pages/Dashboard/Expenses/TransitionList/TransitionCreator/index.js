/* libraries */
import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import PropTypes from 'prop-types';
import _ from 'lodash';
/* schemas */
import { transitionSchema } from '../../../../../store/schemas/transition-schema';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import AuthenticationErrorMessage from './../../../../../components/AuthenticationErrorMessage';
import { Form, Row, Col, Spinner, Modal } from 'react-bootstrap';
/* contexts */
import { useAuth } from '../../../../../contexts/auth';
/* store */
import { INSERT_TRANSITION_URL } from './../../../../../store/api-urls';
/* utils */
import { getSpecificDate, getTodayDate } from './../../../../../utils/date-utils';
/* services */
import ListCategories from './../../../../../services/categories';

function TransitionCreator(props) {
    const { user } = useAuth();

    const [showSpinner, setShowSpinner] = useState(false);
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);

    const [authenticationError, setAuthenticationError] = useState(false);

    const [idCategoria, setIdCategoria] = useState();

    const handleShowSpinner = (value) => {
        setShowSpinner(value);
    }

    const handleIsSubmitBtnDisabled = (value) => {
        setIsSubmitBtnDisabled(value);
    }

    const insertTransition = async (userData) => {
        const authenticateErrorMessage = document.querySelector('.authentication-error-message');

        try {
            // disable the button until the API returns
            handleShowSpinner(true);
            handleIsSubmitBtnDisabled(true);

            const idUsuario = user.idUsuario;
            const idTipoMovimentacao = props.transitionType === 'revenues' ? 1 : props.transitionType === 'expenses' ? 2 : '';

            const transitionData = { ...userData, idTipoMovimentacao, idUsuario, idCategoria };

            const date = transitionData.dataMovimentacao.replaceAll('/', '-');
            const day = date.split('-')[2];
            const month = date.split('-')[1];
            const year = date.split('-')[0];

            const dataMovimentacao = `${day}-${month}-${year}`;
            const idDetalheMovimentacao = dataMovimentacao <= getTodayDate() ? 1 : 2;

            transitionData.idDetalheMovimentacao = idDetalheMovimentacao;
            transitionData.dataMovimentacao = dataMovimentacao;
            delete transitionData.periodoMovimentacao;

            const response = await axios.post(INSERT_TRANSITION_URL, transitionData);
            
            transitionData.idMovimentacao = response.data.result.idMovimentacao;

            handleShowSpinner(false);
            handleIsSubmitBtnDisabled(false);

            if (_.isEqual(response.data.result, transitionData)) {
                props.closeModal(setAuthenticationError);
            } else {
                authenticateErrorMessage.innerText = `Erro ao cadastrar movimentação. Tente novamente em instantes`;
                setAuthenticationError(true);
            }
            
        } catch(error) {
            authenticateErrorMessage.innerText = `Erro ao cadastrar movimentação. Tente novamente em instantes`;
            setAuthenticationError(true);
            handleShowSpinner(false);
        }
    }

    return (
        <Modal dialogClassName="transition-creator large-modal" show={props.showModal} onHide={() => props.closeModal(setAuthenticationError)} animation={true} scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Cadastrar {props.transitionType === 'expenses' ? 'Despesa' : props.transitionType === 'revenues' ? 'Receita' : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="flex">
                <Formik
                    onSubmit={(values) => insertTransition(values)}
                    initialValues={{
                        idCategoria: '',
                        descricaoMovimentacao: '',
                        observacaoMovimentacao: '',
                        dataMovimentacao: '',
                        periodoMovimentacao: '',
                        valorMovimentacao: ''
                    }}
                    validationSchema={transitionSchema}>
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
                            <Form.Group as={Row} controlId="categoryId">
                                <Col>
                                    <ListCategories transitionType={props.transitionType} setCategoryId={setIdCategoria} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="transitionDescription">
                                <Col>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Nome da ${props.transitionType === 'expenses' ? 'Despesa' : props.transitionType === 'revenues' ? 'Receita' : ''}`}
                                        maxLength={300}
                                        name="descricaoMovimentacao"
                                        value={values.descricaoMovimentacao}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.descricaoMovimentacao && touched.descricaoMovimentacao ? "input-error" : ""}
                                        data-testid="txt-descricao-movimentacao"
                                        autoComplete="off"
                                    />
                                    {errors.descricaoMovimentacao && touched.descricaoMovimentacao && (
                                        <p className="error-message">{errors.descricaoMovimentacao}</p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="transitionObservation">
                                <Col>
                                    <Form.Label>Observação</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Observação"
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
                <button className="cancel-button" onClick={() => props.closeModal(setAuthenticationError)}>
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