/* libraries */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import axios from 'axios';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import TopNavbar from './../components/TopNavbar/index';
import SideNavbar from './../components/SideNavbar/index';
import AlertMessage from './../../../components/AlertMessage/index';
import Button from './../../../components/Button/index';
import Footer from './../../../components/Footer/index';
import { Chart } from "react-google-charts";
/* contexts */
import { useAuth } from './../../../contexts/auth';
/* utils */
import { getChartType } from '../../../utils/charts-utils';
/* store */
import { GET_CHARTS_URL, GET_USER_CHARTS_URL, INSERT_USER_CHART_URL, DELETE_USER_CHART_URL, CHECK_USER_TYPE_URL } from './../../../store/api-urls'

function Expenses() {
    const { user } = useAuth();
    const [userType, setUserType] = useState(1);
    const [chart, setChart] = useState();

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

    return (
        <Fragment>
            <TopNavbar handleNavbarIsOpen={handleNavbarIsOpen} />
            <section className="dashboard">
                <SideNavbar active={'expenses'} handleNavbarIsOpen={handleNavbarIsOpen} />
                <section className="expenses">
                    <h1>Controle de Gastos</h1>
                    <div className="charts flex">
                        {/* <Chart
                            chartType={chart.chartType}
                            data={chart.data}
                            options={chart.options}
                            width="100%"
                            height="480px"
                            legendToggle
                        /> */}
                    </div>
                    <div className="chart-description flex">
                        <p className="chart-title">{chart?.name}</p>
                    </div>
                    <h2>Receitas e Despesas</h2>
                    <div className="expenses-list flex">
                        <div className="revenues">
                            <p>Receitas</p>
                        </div>
                        <div className="expenses">
                            <p>Despesas</p>
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