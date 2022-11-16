/* libraries */
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import TopNavbar from './../components/TopNavbar/index';
import SideNavbar from './../components/SideNavbar/index';
import Footer from './../../../components/Footer/index';
import { Chart } from "react-google-charts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
/* contexts */
import { useAuth } from './../../../contexts/auth';
/* store */
import { GET_REVENUES_URL, GET_EXPENSES_URL } from './../../../store/api-urls';
/* utils */
import { getSpecificDate, removeTime } from './../../../utils/date-utils';

function Expenses() {
    const { user } = useAuth();
    const [options, setOptions] = useState();
    const [data, setData] = useState();

    const [totalRevenue, setTotalRevenue] = useState(2500);
    const [totalExpense, setTotalExpense] = useState(1170);

    const [revenuesPreviewList, setRevenuesPreviewList] = useState();
    const [expensesPreviewList, setExpensesPreviewList] = useState();

    const getStoragedInitialDate = () => {
        const date = localStorage.getItem('initialDate');

        return date ? new Date(date) : new Date();
    }

    const getStoragedFinalDate = () => {
        const date = localStorage.getItem('finalDate');

        return date ? new Date(date) : new Date(getSpecificDate(1, 1, 0));
    }

    const setTransitionTypeStoraged = (type) => {
        localStorage.setItem('transition-type', type);
    }

    const [showModal, setShowModal] = useState(false);
    const [initialDate, setInitialDate] = useState(getStoragedInitialDate());
    const [finalDate, setFinalDate] = useState(getStoragedFinalDate());

    useEffect(() => {
        createChart();

        genExpensesPreviewList((dataResults) => setExpensesPreviewList(dataResults));
        genRevenuesPreviewList((dataResults) => setRevenuesPreviewList(dataResults));

        localStorage.setItem('initialDate', initialDate);
        localStorage.setItem('finalDate', finalDate);

    }, [initialDate, finalDate]);

    const getExpensesTotalValue = (expenses) => {
        let sum = 0;

        for (const expense of expenses) {
            sum += expense.valorMovimentacao;
        }

        setTotalExpense(sum);
    }

    const getRevenuesTotalValue = (revenues) => {
        let sum = 0;

        for (const revenue of revenues) {
            sum += revenue.valorMovimentacao;
        }

        setTotalRevenue(sum);
    }

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

    const formatDates = (pDate) => {
        let date = new Date(pDate);
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) {
            dd = '0' + dd;
        }
    
        if (mm < 10) {
            mm = '0' + mm;
        }

        date = yyyy + '-' + mm + '-' + dd;

        return date;
    }

    const createChart = () => {
        const chartOptions = {
            chartArea: {
                width: '100%',
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
                position: 'bottom',
                alignment: 'center',
                top: '200px',
                textStyle: {
                    color: '#818181',
                    fontSize: 16,
                },
            },
        }

        setOptions(chartOptions);

        const chartData = [
            ['Tipo', 'Total'],
            ['Receita', totalRevenue],
            ['Despesas', totalExpense],
        ];
        
        setData(chartData);
    }

    const listExpenses = async () => {
        try {
            const iDate = formatDates(initialDate);
            const fDate = formatDates(finalDate);

            const response = await axios.post(GET_EXPENSES_URL, { idUsuario: user.idUsuario, dataInicial: iDate, dataFinal: fDate });

            getExpensesTotalValue(response.data.result);

            return response.data.result;
        } catch (error) {
            console.log(error);
        }
    }

    const listRevenues = async () => {
        try {
            const iDate = formatDates(initialDate);
            const fDate = formatDates(finalDate);

            const response = await axios.post(GET_REVENUES_URL, { idUsuario: user.idUsuario, dataInicial: iDate, dataFinal: fDate });

            getRevenuesTotalValue(response.data.result);

            return response.data.result;
        } catch (error) {
            console.log(error);
        }
    }

    const genExpensesPreviewList = async (callback) => {
        let promises = (await listExpenses()).slice(0, 5).map(expense => (
            <a href={`expenses/expenses-${expense.idMovimentacao}`} className="expenses-control-list-item flex" key={expense.idMovimentacao}>
                <div className="list-item-text">
                    <p className="expenses-control-preview-title">
                        {expense.descricaoMovimentacao}
                    </p>
                    <p className="expenses-control-preview-value">
                        {`Valor: R$ ${expense.valorMovimentacao}`}
                    </p>
                </div>
                <FontAwesomeIcon icon={faAngleRight} />
            </a>
        ));

        let dataResults = await Promise.all(promises);
        
        callback(dataResults);
    }

    const genRevenuesPreviewList = async (callback) => {
        let promises = (await listRevenues()).slice(0, 5).map(revenue => (
            <a href={`expenses/revenues-${revenue.idMovimentacao}`} className="expenses-control-list-item flex" key={revenue.idMovimentacao}>
                <div className="list-item-text">
                    <p className="expenses-control-preview-title">
                        {revenue.descricaoMovimentacao}
                    </p>
                    <p className="expenses-control-preview-value">
                        {`Valor: R$ ${revenue.valorMovimentacao}`}
                    </p>
                </div>
                <FontAwesomeIcon icon={faAngleRight} />
            </a>
        ));

        let dataResults = await Promise.all(promises);
        
        callback(dataResults);
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <Fragment>
            <TopNavbar handleNavbarIsOpen={handleNavbarIsOpen} />
            <section className="dashboard">
                <SideNavbar active={'expenses'} handleNavbarIsOpen={handleNavbarIsOpen} />
                <section className="expenses">
                    <h1>Controle de Gastos</h1>
                    <div className="charts flex">
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width="100%"
                            height="420px"
                        />
                    </div>
                    <div className="expenses-info flex">
                        <div className="expenses-control-review flex">
                            <div className="revenues-review">
                                <p className="expenses-control-review-label">Receita Mensal</p>
                                <p className="expenses-control-review-value">
                                    {`R$ ${totalRevenue}`}
                                </p>
                            </div>
                            <div className="expenses-review">
                                <p className="expenses-control-review-label">Despesa Mensal</p>
                                <p className="expenses-control-review-value">
                                    {`R$ ${totalExpense}`}
                                </p>
                            </div>
                        </div>
                        <div className="period-selector flex" onClick={openModal}>
                            <button className="period-selector-button"><FontAwesomeIcon icon={faCalendar} /></button>
                            <div className="period-selector-date flex">
                                <p className="period-selector-date-label">Data Inicial</p>
                                <p>{removeTime(initialDate)}</p>
                            </div>
                            <FontAwesomeIcon icon={faArrowRight} />
                            <div className="period-selector-date flex">
                                <p className="period-selector-date-label">Data Final</p>
                                <p>{removeTime(finalDate)}</p>
                            </div>
                        </div>
                    </div>
                    <h2>Receitas e Despesas</h2>
                    <div className="expenses-list flex">
                        <div className="expenses-control-list-preview revenues-list-preview">
                            <h3>Receitas</h3>
                            {revenuesPreviewList}
                            <a href={`/expenses/list?type=revenues&initial-date=${initialDate}&final-date=${finalDate}`} className="full-list-button" onClick={() => setTransitionTypeStoraged('revenues')}>Ver mais</a>
                        </div>
                        <div className="expenses-control-list-preview expenses-list-preview">
                            <h3>Despesas</h3>
                            {expensesPreviewList}
                            <a href={`/expenses/list?type=expenses&initial-date=${initialDate}&final-date=${finalDate}`} className="full-list-button" onClick={() => setTransitionTypeStoraged('expenses')}>Ver mais</a>
                        </div>
                    </div>
                </section>
                <Modal dialogClassName="period-selector-modal large-modal" show={showModal} onHide={closeModal} animation={true} scrollable={true} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Defina o período do controle de gastos
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="flex">
                        <div className="calendar-box flex">
                            <Calendar
                                onChange={setInitialDate}
                                value={initialDate}
                                minDate={new Date(getSpecificDate(0, 0, -1))}
                                maxDate={new Date(getSpecificDate(0, 0, 1))}
                                defaultValue={initialDate}
                                minDetail="year"
                                locale='pt'
                            />
                            <Calendar
                                onChange={setFinalDate}
                                value={finalDate}
                                minDate={new Date(getSpecificDate(0, 0, -1))}
                                maxDate={new Date(getSpecificDate(0, 0, 1))}
                                defaultValue={finalDate}
                                minDetail="year"
                                locale='pt'
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn-action" onClick={closeModal}>
                            Selecionar data
                        </button>
                    </Modal.Footer>
                </Modal>
            </section>
            <div className="nav-background" onClick={handleNavbarIsOpen}></div>
            <Footer />
        </Fragment>
    );
}

export default Expenses;