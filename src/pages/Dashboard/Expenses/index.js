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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
/* contexts */
import { useAuth } from './../../../contexts/auth';
/* store */
import { GET_REVENUES_URL, GET_EXPENSES_URL } from './../../../store/api-urls';
/* utils */
import { getTodayDate, getSpecificDate } from './../../../utils/date-utils';

function Expenses() {
    const { user } = useAuth();
    const [options, setOptions] = useState();
    const [data, setData] = useState();

    const [totalRevenue, setTotalRevenue] = useState(2500);
    const [totalExpense, setTotalExpense] = useState(1170);

    const [revenuesPreviewList, setRevenuesPreviewList] = useState();
    const [expensesPreviewList, setExpensesPreviewList] = useState();

    const [showCalendar, setShowCalendar] = useState(false);
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());

    useEffect(() => {
        createChart();

        genExpensesPreviewList((dataResults) => setExpensesPreviewList(dataResults));
        genRevenuesPreviewList((dataResults) => setRevenuesPreviewList(dataResults));
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
            const response = await axios.post(GET_EXPENSES_URL, { idUsuario: user.idUsuario });

            return response.data.result;
        } catch (error) {
            console.log(error);
        }
    }

    const listRevenues = async () => {
        try {
            const response = await axios.post(GET_REVENUES_URL, { idUsuario: user.idUsuario });

            return response.data.result;
        } catch (error) {
            console.log(error);
        }
    }

    const genExpensesPreviewList = async (callback) => {
        let promises = (await listExpenses()).slice(0, 5).map(expense => (
            <a href="#" className="expenses-control-list-item flex" key={expense.idMovimentacao}>
                <div className="list-item-text">
                    <p className="expenses-control-preview-title">
                        {expense.observacaoMovimentacao}
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
            <a href="#" className="expenses-control-list-item flex" key={revenue.idMovimentacao}>
                <div className="list-item-text">
                    <p className="expenses-control-preview-title">
                        {revenue.observacaoMovimentacao}
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

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar);
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
                    <div className="expenses-info flex" onClick={handleShowCalendar}>
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
                        <div className="period-selector flex">
                            <button className="period-selector-button" onClick={handleShowCalendar}><FontAwesomeIcon icon={faCalendar} /></button>
                            <div className="period-selector-date flex">
                                <p className="period-selector-date-label">Data Inicial</p>
                                <p>{initialDate.toLocaleDateString()}</p>
                            </div>
                            <FontAwesomeIcon icon={faArrowRight} />
                            <div className="period-selector-date flex">
                                <p className="period-selector-date-label">Data Final</p>
                                <p>{finalDate.toLocaleDateString()}</p>
                            </div>
                            <div className="datepickers flex">
                                <Calendar
                                    onChange={setInitialDate}
                                    value={initialDate}
                                    selectRange={true}
                                    minDate={new Date(user.dataCadastroUsuario)}
                                    maxDate={new Date(getSpecificDate(0, 0, 1))}
                                    defaultValue={new Date(getTodayDate())}
                                    minDetail="year"
                                />
                                <Calendar
                                    onChange={setFinalDate}
                                    value={finalDate}
                                    selectRange={true}
                                    minDate={new Date(user.dataCadastroUsuario)}
                                    maxDate={new Date(getSpecificDate(0, 0, 1))}
                                    defaultValue={new Date(getTodayDate())}
                                    minDetail="year"
                                />
                            </div>
                        </div>
                    </div>
                    <h2>Receitas e Despesas</h2>
                    <div className="expenses-list flex">
                        <div className="expenses-control-list-preview revenues-list-preview">
                            <h3>Receitas</h3>
                            {revenuesPreviewList}
                            <a href="/expenses/list?type=revenues" className="full-list-button">Ver mais</a>
                        </div>
                        <div className="expenses-control-list-preview expenses-list-preview">
                            <h3>Despesas</h3>
                            {expensesPreviewList}
                            <a href="/expenses/list?type=expenses" className="full-list-button">Ver mais</a>
                        </div>
                    </div>
                </section>
            </section>
            <div className="nav-background" onClick={handleNavbarIsOpen}></div>
            <Footer />
        </Fragment>
    );
}

export default Expenses;