/* libraries */
import React, { Fragment, useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import PropTypes from 'prop-types';
import _ from 'lodash';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* schemas */
import { transitionSchema } from '../../../../store/schemas/transition-schema';
/* components */
import TopNavbar from '../../components/TopNavbar/index';
import SideNavbar from '../../components/SideNavbar/index';
import Footer from '../../../../components/Footer/index';
import Button from './../../../../components/Button';
import AuthenticationErrorMessage from './../../../../components/AuthenticationErrorMessage';
import { Form, Row, Col, Spinner, Modal } from 'react-bootstrap';
/* contexts */
import { useAuth } from '../../../../contexts/auth';
/* utils */
import { getSpecificDate, getTodayDate, removeTime } from './../../../../utils/date-utils';
/* store */
import { GET_CATEGORY_URL, GET_TRANSITION_URL, UPDATE_TRANSITION_URL } from '../../../../store/api-urls';
/* services */
import ListCategories from './../../../../services/categories';

function TransitionItem(props) {
    const { user } = useAuth();

    useEffect(() => {
        getTransitionData();
    }, [])
    
    const [showSpinner, setShowSpinner] = useState(false);
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
    
    const [authenticationError, setAuthenticationError] = useState(false);
    
    const [transitionData, setTransitionData] = useState();
    const [descricaoMovimentacao, setDescricaoMovimentacao] = useState();
    const [idCategoria, setIdCategoria] = useState();
    const [descricaoCategoria, setDescricaoCategoria] = useState('');
    const [corCategoria, setCorCategoria] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [navbarIsOpen, setNavbarIsOpen] = useState(false);

    // reset the menu settings when the window is resized
    const resizeFunction = () => {
        const nav = document.querySelector('.dashboard-header-nav');
        const aside = document.querySelector('.aside');
        const navBackground = document.querySelector('.nav-background');
        const topNavbarContent = document.querySelector('.top-navbar-content');

        if (window.innerWidth >= 960) {
            document.body.style.position = 'initial';
            nav.style.visibility = 'visible';
            navBackground.style.visibility = 'hidden';
            topNavbarContent.classList.add('none');

            aside.classList.remove('mobile-side-nav');
            topNavbarContent.classList.remove('none');

            setNavbarIsOpen(false);
        } else if (window.innerWidth < 960 && !navbarIsOpen) {
            nav.style.visibility = 'hidden';
            
            aside.classList.remove('mobile-side-nav');
            topNavbarContent.classList.remove('none');
        }
    }

    window.onresize = function() { resizeFunction(); }

    const openNavbar = () => {
        const nav = document.querySelector('.dashboard-header-nav');
        const aside = document.querySelector('.aside');
        const navBackground = document.querySelector('.nav-background');

        document.body.style.position = 'fixed';
        nav.style.visibility = 'visible';
        navBackground.style.visibility = 'visible';
        aside.classList.add('mobile-side-nav');

        setNavbarIsOpen(true);
    }

    const closeNavbar = () => {
        const nav = document.querySelector('.dashboard-header-nav');
        const aside = document.querySelector('.aside');
        const navBackground = document.querySelector('.nav-background');

        document.body.style.position = 'initial';
        nav.style.visibility = 'hidden';
        navBackground.style.visibility = 'hidden';
        aside.classList.remove('mobile-side-nav');

        setNavbarIsOpen(false);
    }

    const handleNavbarIsOpen = () => {
        if (!navbarIsOpen) {
            openNavbar();
        } else {
            closeNavbar();
        }
    }

    const handleShowSpinner = (value) => {
        setShowSpinner(value);
    }

    const handleIsSubmitBtnDisabled = (value) => {
        setIsSubmitBtnDisabled(value);
    }

    const getTransitionData = async () => {
        try {
            const response = await axios.post(GET_TRANSITION_URL, { idMovimentacao: props.transitionId });
    
            const data = {
                descricaoMovimentacao: response.data.result?.descricaoMovimentacao,
                idCategoria: response.data.result?.idCategoria,
                observacaoMovimentacao: response.data.result?.observacaoMovimentacao,
                dataMovimentacao: removeTime(response.data.result?.dataMovimentacao),
                valorMovimentacao: response.data.result?.valorMovimentacao
            }

            const responseCategory = await axios.post(GET_CATEGORY_URL, { idCategoria: data.idCategoria });

            setIdCategoria(responseCategory.data.result.idCategoria);
            setDescricaoCategoria(responseCategory.data.result.descricaoCategoria);
            setCorCategoria(responseCategory.data.result.corCategoria);
            setTransitionData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateTransition = async (userData) => {
        const authenticateErrorMessage = document.querySelector('.authentication-error-message');

        try {
            // disable the button until the API returns
            handleShowSpinner(true);
            handleIsSubmitBtnDisabled(true);
            setAuthenticationError(false);

            setDescricaoMovimentacao(userData.descricaoMovimentacao);

            const idUsuario = user.idUsuario;
            const idMovimentacao = props.transitionId;
            const idTipoMovimentacao = props.transitionType === 'revenues' ? 1 : props.transitionType === 'expenses' ? 2 : '';
        
            userData.idMovimentacao = idMovimentacao;
            userData.idTipoMovimentacao = idTipoMovimentacao;
            userData.idCategoria = idCategoria;
            userData.idUsuario = idUsuario;
            userData.statusMovimentacao = "ativo";

            const date = userData.dataMovimentacao.replaceAll('/', '-');
            const day = date.split('-')[2];
            const month = date.split('-')[1];
            const year = date.split('-')[0];

            const dataMovimentacao = `${day}-${month}-${year}`;
            const idDetalheMovimentacao = dataMovimentacao <= getTodayDate() ? 1 : 2;

            userData.idDetalheMovimentacao = idDetalheMovimentacao;
            userData.dataMovimentacao = dataMovimentacao;

            const response = await axios.put(UPDATE_TRANSITION_URL, userData);
            console.log(response);
            
            userData.idMovimentacao = response.data.result.idMovimentacao;

            handleShowSpinner(false);
            handleIsSubmitBtnDisabled(false);

            if (_.isEqual(response.data.result, userData)) {
                openTransitionUpdateConfirmation();
            } else {
                authenticateErrorMessage.innerText = `Erro ao atualizar movimentação. Tente novamente em instantes`;
                setAuthenticationError(true);
            }
            
        } catch(error) {
            authenticateErrorMessage.innerText = `Erro ao atualizar movimentação. Tente novamente em instantes`;
            setAuthenticationError(true);
            handleShowSpinner(false);
        }
    }

    const openTransitionUpdateConfirmation = () => {
        setShowModal(true);
    }

    const closeTransitionUpdateConfirmation = () => {
        getTransitionData();
        setShowModal(false);
    }

    return (
        <Fragment>
            <TopNavbar handleNavbarIsOpen={handleNavbarIsOpen} />
            <section className="dashboard">
                <SideNavbar active={'expenses'} handleNavbarIsOpen={handleNavbarIsOpen} />
                <section className="expenses">
                    <h1>{props.transitionType === 'expenses' ? 'Despesas' : props.transitionType === 'revenues' ? 'Receitas' : ''}</h1>
                    <div className="transition-box">
                        <Formik
                            onSubmit={(values) => updateTransition(values)}
                            initialValues={{
                                descricaoMovimentacao: transitionData?.descricaoMovimentacao ?? '',
                                idCategoria: transitionData?.idCategoria ?? '',
                                observacaoMovimentacao: transitionData?.observacaoMovimentacao ?? '',
                                dataMovimentacao: transitionData?.dataMovimentacao ?? '',
                                valorMovimentacao: transitionData?.valorMovimentacao ?? ''
                            }}
                            validationSchema={transitionSchema}
                            enableReinitialize={true}>
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                errors
                            }) => (
                                <Form className="modal-form" id="transitionData" noValidate onSubmit={handleSubmit}>
                                    <AuthenticationErrorMessage authenticationError={authenticationError} />
                                    <Form.Group as={Row} controlId="transitionDescription">
                                        <Col>
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
                                    <Form.Group as={Row} controlId="categoryId">
                                        <Col>
                                            <ListCategories transitionType={props.transitionType} setCategoryId={setIdCategoria} defaultValue={[ descricaoCategoria, transitionData?.idCategoria, corCategoria ] || ''} />
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
                        <div className="transition-item-buttons">
                            <button className="btn-action" type="submit" form="transitionData" disabled={isSubmitBtnDisabled}>
                                <div className={!showSpinner ? '' : 'none'}>
                                    Salvar mudanças
                                </div>
                                <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Carregando...</span>
                                </Spinner>
                            </button>
                            <button className="btn-action btn-remove" type="submit" form="transitionData" disabled={isSubmitBtnDisabled}>
                                <div className={!showSpinner ? '' : 'none'}>
                                    Excluir {`${props.transitionType === 'revenues' ? 'receita' : props.transitionType === 'expenses' ? 'despesa' : ''}`}
                                </div>
                                <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Carregando...</span>
                                </Spinner>
                            </button>
                        </div>
                    </div>
                </section>
                <Modal dialogClassName="transition-update-confirmation" show={showModal} onHide={closeTransitionUpdateConfirmation} animation={true} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{descricaoMovimentacao}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>A {`${props.transitionType === 'revenues' ? 'receita' : props.transitionType === 'expenses' ? 'despesa' : ''}`} foi alterada com sucesso.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button text="Concluir" transparent={false} onClick={closeTransitionUpdateConfirmation} />
                    </Modal.Footer>
                </Modal>
            </section>
            <div className="nav-background" onClick={handleNavbarIsOpen}></div>
            <Footer />
        </Fragment>
    );
}

TransitionItem.propTypes = {
    transitionType: PropTypes.string.isRequired,
    transitionId: PropTypes.string.isRequired
}  

export default TransitionItem;