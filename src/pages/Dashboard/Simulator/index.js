/* libraries */
import React, { Fragment, useEffect, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import PropTypes from 'prop-types';
import _, { set } from 'lodash';
/* libraries */
import { simulationSchema } from './../../../store/schemas/simulation-schema';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import TopNavbar from '../components/TopNavbar/index';
import SideNavbar from '../components/SideNavbar/index';
import Button from '../../../components/Button/index';
import Footer from '../../../components/Footer/index';
import AuthenticationErrorMessage from '../../../components/AuthenticationErrorMessage/index';
import { Chart } from "react-google-charts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { Form, Row, Col, Modal, Spinner } from 'react-bootstrap';
/* contexts */
import { useAuth } from '../../../contexts/auth';
/* store */
import { GET_SIMULATION_URL, INSERT_SIMULATION_URL } from '../../../store/api-urls';
/* utils */
import { removeTime } from '../../../utils/date-utils';
import { navigate } from 'hookrouter';
import { isEditableInput } from '@testing-library/user-event/dist/utils';

function Simulator(props) {
    const { user } = useAuth();
    const [isChartVisible, setIsChartVisible] = useState(false);
    const [options, setOptions] = useState();
    const [data, setData] = useState();

    const [showSpinner, setShowSpinner] = useState(false);
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);

    const [authenticationError, setAuthenticationError] = useState(false);

    const [simulationData, setSimulationData] = useState();

    const [simulationId, setSimulationId] = useState();

    const [simulationPeriod, setSimulationPeriod] = useState();
    const [simulationFinalValue, setSimulationFinalValue] = useState();
    const [simulationProfit, setSimulationProfit] = useState();

    const [showSimulationModal, setShowSimulationModal] = useState(false);
    const [showSaveSimulationModal, setShowSaveSimulationModal] = useState(false);

    // TODO: ARRUMAR ESSE ID PRA SELECIONAR OS BOTÕES QUE VÃO OU NÃO APARECER
    // TODO: FAZER UPDATE E EXCLUIR SIMULAÇÃO
    // TODO: CORRIGIR BUGS DE CONTROLE DE GASTOS
    // TODO: DADOS REAIS NOS GRÁFICOS DA HOME
    // TODO: MELHORAR DESIGN DOS GRÁFICOS SEM DADOS E DA LISTAGEM DE MOVIMENTAÇÕES (VALOR)
    // TODO: ARRUMAR OS FILTROS DA LISTAGEM DE SIMULAÇÃO

    // TODO: CRIAR A TRILHA DE APRENDIZAGEM (DESIGN)
    // TODO: CRIAR O JSON DA TRILHA DE APRENDIZAGEM

    useEffect(() => {
        const urlString = window.location.href;
        const paramString = urlString.split('-')[1];
        console.log(paramString);
            
        const getSimulation = async () => {
            const simulacao = await getSimulationProps();
            setSimulationId();
            if (!_.isEqual(simulacao.data.result, {})) {
                createChart(simulacao.data.result);
            }
        }

        getSimulation();
    }, []);

    useEffect(() => {
        const getSimulation = async () => {
            const simulacao = await getSimulationProps();
            if (!_.isEqual(simulacao.data.result, {})) {
                createChart(simulacao.data.result);
            }
        }

        getSimulation();
    }, []);

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

    const getSimulationPeriod = (initialDate, finalDate) => {
        const iD = new Date(initialDate);
        const fD = new Date(finalDate);

        const period = (fD.getFullYear() - iD.getFullYear()) * 12 + (fD.getMonth() - iD.getMonth());

        setSimulationPeriod(period);

        return period;
    }

    const getSimulationProps = async () => {
        try {
            const response = await axios.post(GET_SIMULATION_URL, { idSimulacao: props.simulationId });

            setSimulationData(response.data.result);

            const initialDate = response.data.result.dataInicialSimulacao;
            const finalDate = response.data.result.dataFinalSimulacao;

            response.data.result.dataInicialSimulacao = removeTime(initialDate);
            response.data.result.dataFinalSimulacao = removeTime(finalDate);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const createChart = (values) => {
        const chartOptions = {
            chartArea: {
                width: '85%',
                height: '75%'
            },
            colors: ['#2CE6A3', '#23B380', '#579C99'],
            fontName: 'Roboto',
            fontSize: 18,
            titleTextStyle: {
                marginBottom: 200,
                fontSize: 24,
                bold: true
            },
            legend: {
                position: 'right',
                alignment: 'center',
                textStyle: {
                    color: '#818181',
                    fontSize: 16,
                },
            },
            hAxis: {
                title: 'Tempo (em meses)',
                titleTextStyle: {
                    color: '#818181'
                }
            },
            vAxis: {
                title: 'Valor (em reais)',
                titleTextStyle: {
                    color: '#818181'
                }
            }
        }

        setOptions(chartOptions);

        const months = [
            'Jan',
            'Fev',
            'Mar',
            'Abril',
            'Maio',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez'
        ]

        const dataInicial = new Date(values?.dataInicialSimulacao);
        const dataFinal = new Date(values?.dataFinalSimulacao);

        const periodo = getSimulationPeriod(dataInicial, dataFinal);

        const investimentoInicial = Number(values?.investimentoInicialSimulacao);
        const investimentoMensal = Number(values?.investimentoMensalSimulacao);
        const taxaJurosSimulacao = (values?.taxaJurosSimulacao / periodo) / 100;

        let totalInvestido = investimentoInicial;
        let totalAcumulado = 0;

        const chartData = [
            ['Tempo', 'Valor']
        ];

        let mesInicial = dataInicial.getMonth();
        let mesFinal = dataFinal.getMonth();
        let mes = mesInicial;

        let c = 1;

        for (let i = 0; i <= periodo; i++) {
            if (i !== 0 && i !== 12) {
                let rendimento =  totalInvestido * taxaJurosSimulacao;
                totalInvestido = totalInvestido + investimentoMensal
                totalAcumulado = totalInvestido + rendimento;
                totalInvestido = totalAcumulado;

                const index = mesInicial + c;
                
                if (index === 12) {
                    c = 0;
                    mes = months[c];
                } else {
                    mes = months[index];
                }
                c++;

                chartData.push([mes, totalAcumulado]);
            } else if (i === 0) {
                mes = months[mesInicial] + ' - ' + dataInicial.getFullYear();

                chartData.push([mes, totalInvestido]);
            } else if (i === 12) {
                let rendimento =  totalInvestido * taxaJurosSimulacao;
                totalInvestido = totalInvestido + investimentoMensal
                totalAcumulado = totalInvestido + rendimento;
                totalInvestido = totalAcumulado;

                mes = months[mesFinal] + ' - ' + dataFinal.getFullYear();

                chartData.push([mes, Number(totalAcumulado)]);

                setIsChartVisible(true);
            }
        }

        const lucro = (totalAcumulado - investimentoInicial - investimentoMensal * periodo);

        setSimulationFinalValue(totalInvestido);
        setSimulationProfit(lucro);
        
        setData(chartData);
        setSimulationData(values);
        closeSimulationModal();
    }

    const saveSimulation = async (simulationData) => {
        try {
            simulationData.idUsuario = user.idUsuario;

            let iDate = new Date(simulationData?.dataInicialSimulacao);
            let yyyy = iDate.getFullYear();
            let mm = iDate.getMonth() + 1;
            let dd = iDate.getDate();

            if (dd < 10) {
                dd = '0' + dd;
            }
        
            if (mm < 10) {
                mm = '0' + mm;
            }

            const dataInicialSimulacao = yyyy + '-' + mm + '-' + dd;

            simulationData.dataInicialSimulacao = dataInicialSimulacao;

            let fDate = new Date(simulationData?.dataFinalSimulacao);
            yyyy = fDate.getFullYear();
            mm = fDate.getMonth() + 1;
            dd = fDate.getDate();

            if (dd < 10) {
                dd = '0' + dd;
            }
        
            if (mm < 10) {
                mm = '0' + mm;
            }

            const dataFinalSimulacao = yyyy + '-' + mm + '-' + dd;

            simulationData.dataFinalSimulacao = dataFinalSimulacao;

            const response = await axios.post(INSERT_SIMULATION_URL, simulationData);

            navigate(`/simulator-${response.data.result.idSimulacao}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        
    }

    const updateSimulation = async (simulationData) => {
        try {
            console.log('updateSimulation:', simulationData);
        } catch (error) {
            console.log(error);
        }
    }

    const removeSimulation = async (simulationData) => {
        try {
            console.log('removeSimulation:', simulationData);
        } catch (error) {
            console.log(error);
        }
    }

    const openSimulationModal = () => {
        setShowSimulationModal(true);
    }

    const closeSimulationModal = () => {
        setShowSimulationModal(false);
    }

    const openSaveSimulationModal = () => {
        setShowSaveSimulationModal(true);
    }

    const closeSaveSimulationModal = () => {
        saveSimulation(simulationData);
        setShowSaveSimulationModal(false);
    }

    return (
        <Fragment>
            <TopNavbar handleNavbarIsOpen={handleNavbarIsOpen} />
            <section className="dashboard">
                <SideNavbar active={'simulator'} handleNavbarIsOpen={handleNavbarIsOpen} />
                <section className="simulator">
                    <h1>Simulador</h1>
                    <div className={isChartVisible ? 'charts flex' : 'none'}>
                        <Chart
                            chartType="AreaChart"
                            data={data}
                            options={options}
                            width="100%"
                            height="420px"
                        />
                    </div>
                    <p className={!isChartVisible ? 'charts-message flex' : 'none'}>Insira os dados da simulação para visualizar o gráfico.</p>
                    <div className="simulator-button-box">
                        <button className="simulator-btn btn-action" onClick={openSimulationModal}>
                            Simular
                        </button>
                    </div>
                    <div className="simulation-data-box">
                        <h2>Dados</h2>
                        <div className="user-simulation-data flex">
                            <div className="simulation-data">
                                <p className="simulation-data-label">Investimento inicial</p>
                                <p className="simulation-data-value">
                                    {simulationData?.investimentoInicialSimulacao ? 'R$ ' + String(parseFloat(simulationData?.investimentoInicialSimulacao).toFixed(2)).replace('.', ',') : '•••'}
                                </p>
                            </div>
                            <div className="simulation-data">
                                <p className="simulation-data-label">Investimento mensal</p>
                                <p className="simulation-data-value">
                                    {simulationData?.investimentoMensalSimulacao ? 'R$ ' + String(parseFloat(simulationData?.investimentoMensalSimulacao).toFixed(2)).replace('.', ',') : '•••'}
                                </p>
                            </div>
                            <div className="simulation-data">
                                <p className="simulation-data-label">Período de tempo</p>
                                <p className="simulation-data-value">
                                    {simulationPeriod ? simulationPeriod + ' meses' : '•••'}
                                </p>
                            </div>
                            <div className="simulation-data">
                                <p className="simulation-data-label">Taxa de juros</p>
                                <p className="simulation-data-value">
                                    {simulationData?.taxaJurosSimulacao ? String(parseFloat(simulationData?.taxaJurosSimulacao).toFixed(2)).replace('.', ',') + '%' : '•••'}
                                </p>
                            </div>
                        </div>
                        <div className="returned-simulation-data flex">
                            <div className="simulation-data">
                                <p className="simulation-data-label">Valor final</p>
                                <p className="simulation-data-value">
                                    {simulationFinalValue ? 'R$ ' + String(parseFloat(simulationFinalValue).toFixed(2)).replace('.', ',') : '•••'}
                                </p>
                            </div>
                            <div className="simulation-data">
                                <p className="simulation-data-label">Lucro</p>
                                <p className="simulation-data-value">
                                    {simulationProfit ? 'R$ ' + String(parseFloat(simulationProfit).toFixed(2)).replace('.', ',') : '•••'}
                                    <FontAwesomeIcon icon={faAnglesUp} className={simulationProfit ? '' : 'none'} />
                                </p>
                            </div>
                        </div>
                        <div className="simulation-data-buttons">
                            <button className={props.simulationId === -1 ? 'btn-action' : 'none'} onClick={openSaveSimulationModal}>Salvar simulação</button>
                            <button className={props.simulationId !== -1 ? 'btn-action' : 'none'} onClick={updateSimulation}>Atualizar simulação</button>
                            <button className={props.simulationId !== -1 ? 'btn-action btn-remove' : 'none'} onClick={removeSimulation}>Excluir simulação</button>
                        </div>
                    </div>
                </section>
                <Modal dialogClassName="simulation-modal large-modal" show={showSimulationModal} onHide={closeSimulationModal} animation={true} scrollable={true} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Simulação
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="flex">
                        <Formik
                            onSubmit={(values) => createChart(values)}
                            initialValues={{
                                descricaoSimulacao: simulationData?.descricaoSimulacao ?? '',
                                investimentoInicialSimulacao: simulationData?.investimentoInicialSimulacao ?? '',
                                investimentoMensalSimulacao: simulationData?.investimentoMensalSimulacao ?? '',
                                dataInicialSimulacao: (simulationData?.dataInicialSimulacao && Number.isNaN(simulationData?.dataInicialSimulacao)) ? simulationData?.dataInicialSimulacao : '',
                                dataFinalSimulacao: (simulationData?.dataFinalSimulacao && Number.isNaN(simulationData?.dataFinalSimulacao)) ? simulationData?.dataFinalSimulacao : '',
                                taxaJurosSimulacao: simulationData?.taxaCorretagemSimulacao ?? '',
                            }}
                            validationSchema={simulationSchema}
                            enableReinitialize={true}>
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                errors
                            }) => (
                                <Form className="modal-form" id="simulationData" noValidate onSubmit={handleSubmit}>
                                    <AuthenticationErrorMessage authenticationError={authenticationError} />
                                    <Form.Group as={Row} controlId="simulationDescription">
                                        <Col>
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nome da simulação"
                                                maxLength={100}
                                                name="descricaoSimulacao"
                                                value={values.descricaoSimulacao}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.descricaoSimulacao && touched.descricaoSimulacao ? "input-error" : ""}
                                                autoComplete="off"
                                            />
                                            {errors.descricaoSimulacao && touched.descricaoSimulacao && (
                                                <p className="error-message">{errors.descricaoSimulacao}</p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="simulationInitialValue">
                                        <Col>
                                            <Form.Label>Investimento inicial</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Valor investido"
                                                name="investimentoInicialSimulacao"
                                                value={values.investimentoInicialSimulacao}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.investimentoInicialSimulacao && touched.investimentoInicialSimulacao ? "input-error" : ""}
                                                autoComplete="off"
                                            />
                                            {errors.investimentoInicialSimulacao && touched.investimentoInicialSimulacao && (
                                                <p className="error-message">{errors.investimentoInicialSimulacao}</p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="simulationMonthlyValue">
                                        <Col>
                                            <Form.Label>Investimento mensal</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Valor investido"
                                                name="investimentoMensalSimulacao"
                                                value={values.investimentoMensalSimulacao}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.investimentoMensalSimulacao && touched.investimentoMensalSimulacao ? "input-error" : ""}
                                                autoComplete="off"
                                            />
                                            {errors.investimentoMensalSimulacao && touched.investimentoMensalSimulacao && (
                                                <p className="error-message">{errors.investimentoMensalSimulacao}</p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="simulationInitialDate">
                                        <Col>
                                            <Form.Label>Data inicial</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Data inicial da simulação"
                                                name="dataInicialSimulacao"
                                                value={values.dataInicialSimulacao}
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
                                                className={errors.dataInicialSimulacao && touched.dataInicialSimulacao ? "input-error" : ""}
                                                autoComplete="off"
                                            />
                                            {errors.dataInicialSimulacao && touched.dataInicialSimulacao && (
                                                <p className="error-message">{errors.dataInicialSimulacao}</p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="simulationFinalDate">
                                        <Col>
                                            <Form.Label>Data final</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Data final da simulação"
                                                name="dataFinalSimulacao"
                                                value={values.dataFinalSimulacao}
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
                                                className={errors.dataFinalSimulacao && touched.dataFinalSimulacao ? "input-error" : ""}
                                                autoComplete="off"
                                            />
                                            {errors.dataFinalSimulacao && touched.dataFinalSimulacao && (
                                                <p className="error-message">{errors.dataFinalSimulacao}</p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="simulationInterestRate">
                                        <Col>
                                            <Form.Label>Taxa de juros (em %)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                name="taxaJurosSimulacao"
                                                value={values.taxaJurosSimulacao}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete="off"
                                            />
                                            {errors.taxaJurosSimulacao && touched.taxaJurosSimulacao && (
                                                <p className="error-message">{errors.taxaJurosSimulacao}</p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="cancel-button" onClick={closeSimulationModal}>
                            Cancelar
                        </button>
                        <button className="btn-action" type="submit" form="simulationData" disabled={isSubmitBtnDisabled}>
                            <div className={!showSpinner ? '' : 'none'}>Simular</div>
                            <Spinner className={showSpinner ? '' : 'none'} animation="border" role="status" size="sm">
                                <span className="visually-hidden">Carregando...</span>
                            </Spinner>
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal dialogClassName="save-simulation-modal" show={showSaveSimulationModal} onHide={closeSaveSimulationModal} animation={true} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{simulationData?.descricaoSimulacao}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>A simulação foi cadastrada com sucesso.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button text="Concluir" transparent={false} onClick={closeSaveSimulationModal} />
                    </Modal.Footer>
                </Modal>
            </section>
            <div className="nav-background" onClick={handleNavbarIsOpen}></div>
            <Footer />
        </Fragment>
    );
}

Simulator.propTypes = {
    simulationId: PropTypes.number.isRequired
}  

export default Simulator;