/* libraries */
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import TopNavbar from '../../components/TopNavbar/index';
import SideNavbar from '../../components/SideNavbar/index';
import Footer from '../../../../components/Footer/index';
import ListPagination from '../../../../components/ListPagination/index';
import Ordination from '../../../../components/Ordination/index';
import TransitionCreator from './TransitionCreator/index';
import { Chart } from 'react-google-charts';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faSearch, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
/* contexts */
import { useAuth } from '../../../../contexts/auth';
/* store */
import { GET_REVENUES_URL, GET_EXPENSES_URL, GET_CATEGORY_RECURRENCE_URL } from '../../../../store/api-urls';
import { getSpecificDate } from '../../../../utils/date-utils';

function TransitionList() {
    const { user } = useAuth();
    const [options, setOptions] = useState();
    const [data, setData] = useState();
    const [isDataVisible, setIsDataVisible] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [transitionType, setTransitionType] = useState('');
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date(getSpecificDate(1, 1, 0)));

    const [transitionList, setTransitionList] = useState([]);
    const [filteredTransitionList, setFilteredTransitionList] = useState([]);
    const [reloadTransitionList, setReloadTransitionList] = useState(true);

    const [searchBarText, setSearchBarText] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [valueAscOrder, setValueAscOrder] = useState(true);
    const [valueDescOrder, setValueDescOrder] = useState(false);

    const [valueFilter, setValueFilter] = useState(true);

    const ITEMS_PER_PAGE = 5; // TODO: change to 10

    useEffect(() => {
        const getTransitionList = async () => {
            const urlString = window.location.href;
            const paramString = urlString.split('?')[1];
            const queryString = new URLSearchParams(paramString);

            let transitionType = localStorage.getItem('transition-type') ? localStorage.getItem('transition-type') : '';
            let iDate = formatDates(new Date(localStorage.getItem('initialDate'))) ? formatDates(new Date(localStorage.getItem('initialDate'))) : '';
            let fDate = formatDates(new Date(localStorage.getItem('finalDate'))) ? formatDates(new Date(localStorage.getItem('finalDate'))) : '';
            let index = 0;

            for (const pair of queryString.entries()) {
                if (index === 0 && transitionType === '') {
                    transitionType = pair[1];
                    setTransitionType(pair[1]);
                } else if (index === 1 && iDate === '') {
                    let date = new Date(pair[1]);
                    iDate = formatDates(date);

                    setInitialDate(iDate);
                } else if (index === 2 && fDate === '') {
                    let date = new Date(pair[1]);
                    fDate = formatDates(date);

                    setFinalDate(fDate);
                }

                index++;
            }

            setTransitionType(transitionType);
            setInitialDate(iDate);
            setFinalDate(fDate);

            const chartData = await genChartData(transitionType, iDate, fDate);
            createChart(chartData);

            if (transitionType === 'expenses') {
                genTransitionList(() => listExpenses(iDate, fDate), (dataResults) => setFilteredTransitionList(dataResults));
            } else if (transitionType === 'revenues') {
                genTransitionList(() => listRevenues(iDate, fDate), (dataResults) => setFilteredTransitionList(dataResults));
            }

            setTotalItems(5);
        }
        if (reloadTransitionList) {
            getTransitionList();
            setReloadTransitionList(false);
        }
    }, [reloadTransitionList]);

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

    const formatDates = (date) => {
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

    const genChartData = async (type, iDate, fDate) => {
        try {
            const idUsuario = user.idUsuario;
            const idTipoMovimentacao = type === 'revenues' ? 1 : type === 'expenses' ? 2 : '';
            const response = await axios.post(GET_CATEGORY_RECURRENCE_URL, { idUsuario,  idTipoMovimentacao, dataInicial: iDate, dataFinal: fDate });

            return response.data.result;
        } catch (error) {
            console.log(error);
        }
    }

    const createChart = (data) => {
        const colors = [];
        let chartData = [['Categoria', 'Quantidade']];

        for (let i = 0; i < data.length; i++) {
            colors.push(data[i].corCategoria);
            chartData.push([data[i].descricaoCategoria, data[i].recorrenciaCategoria]);
        }

        const chartOptions = {
            chartArea: {
                width: '100%',
                height: '75%'
            },
            colors,
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
        setData(chartData);

        if (data !== []) {
            setIsDataVisible(true);
        } else {
            setIsDataVisible(false);
        }
    }

    const filterList = (list) => {
        let orderValue = valueFilter ? valueAscOrder ? 'ASC' : valueDescOrder ? 'DESC' : '' : '';

        if (searchBarText !== '') {
            list = list.filter((transition) => 
                transition.descricaoMovimentacao.toLowerCase().indexOf(searchBarText.toLowerCase()) >= 0);
        }

        if (orderValue === 'ASC') {
            list.sort((t1, t2) => (t1.valorMovimentacao > t2.valorMovimentacao) ? 1 : -1);
        } else if (orderValue === 'DESC') {
            list.sort((t1, t2) => (t1.valorMovimentacao < t2.valorMovimentacao) ? 1 : -1);
        }

        return list;
    }

    const listExpenses = async (iDate, fDate) => {
        try {
            const response = await axios.post(GET_EXPENSES_URL, { idUsuario: user.idUsuario, dataInicial: iDate, dataFinal: fDate });

            setTransitionList(response.data.result);

            let filteredList = filterList(response.data.result.slice(0));
            
            setTotalItems(filteredList.length);
            setFilteredTransitionList(filteredList);

            return filteredList;
        } catch (error) {
            setTransitionList([]);
            setFilteredTransitionList([]);
            console.log(error);
        }
    }

    const listRevenues = async (iDate, fDate) => {
        try {
            const response = await axios.post(GET_REVENUES_URL, { idUsuario: user.idUsuario, dataInicial: iDate, dataFinal: fDate });

            setTransitionList(response.data.result);

            let filteredList = filterList(response.data.result.slice(0));
            
            setTotalItems(filteredList.length);
            setFilteredTransitionList(filteredList);

            return filteredList;
        } catch (error) {
            setTransitionList([]);
            setFilteredTransitionList([]);
            console.log(error);
        }
    }

    const genTransitionList = async (listTransition, callback) => {
        let promises = (await listTransition()).slice(0, ITEMS_PER_PAGE).map(transition => (
            <a href="#" className="list-item flex" key={transition.idMovimentacao}>
                <div className="list-item-text">
                    <p className="list-item-title">
                        {transition.descricaoMovimentacao}
                    </p>
                    <p className="list-item-value">
                        {`Valor: R$ ${transition.valorMovimentacao}`}
                    </p>
                </div>
                <FontAwesomeIcon icon={faAngleRight} />
            </a>
        ));

        let dataResults = await Promise.all(promises);
        
        callback(dataResults);
    }

    const handleSearchBarText = (event) => {
        setSearchBarText(event.target.value);

        setReloadTransitionList(true);
    }

    const handleChangePage = (page) => {
        setCurrentPage(page);
        
        genTransitionList(() => listPage(page), (dataResults) => setFilteredTransitionList(dataResults));
    }

    const listPage = (page) => {
        const pageList = transitionList.slice(0).splice((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);

        return pageList;
    }

    const handleValueFilterChange = () => {
        setValueFilter(!valueFilter);

        setReloadTransitionList(true);
    }

    const handleValueOrder = () => {
        if (valueAscOrder) {
            setValueAscOrder(false);
            setValueDescOrder(true);
        } else if (valueDescOrder) {
            setValueAscOrder(true);
            setValueDescOrder(false);
        }

        setReloadTransitionList(true);
    }

    const openTransitionCreator = () => {
        setShowModal(true);
    }

    const closeTransitionCreator = (setAuthenticationError) => {
        setShowModal(false);
        setAuthenticationError(false);
        setReloadTransitionList(true);
    }

    return (
        <Fragment>
            <TopNavbar handleNavbarIsOpen={handleNavbarIsOpen} />
            <section className="dashboard">
                <SideNavbar active={'expenses'} handleNavbarIsOpen={handleNavbarIsOpen} />
                <section className="expenses">
                    <h1>{transitionType === 'expenses' ? 'Despesas' : transitionType === 'revenues' ? 'Receitas' : ''}</h1>
                    <div className={isDataVisible ? 'charts flex' : 'none'}>
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width="100%"
                            height="420px"
                        />
                    </div>
                    <p className={!isDataVisible ? 'insert-transitions-message' : 'none'}>
                        Cadastre {transitionType === 'expenses' ? 'despesas' : transitionType === 'revenues' ? 'receitas' : ''} para visualizar o gráfico.
                    </p>
                    <div className="transition-list flex">
                        <div className="search-bar flex">
                            <Form.Control
                                type="text"
                                value={searchBarText}
                                onChange={handleSearchBarText}
                                className="search-bar-input"
                            />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div className="search-filters flex">
                            <div className="search-filter flex">
                                <Form.Check 
                                    type="checkbox"
                                    name="filter-value"
                                    label="Valor"
                                    onChange={handleValueFilterChange}
                                    checked={valueFilter}
                                />
                                <Ordination
                                    ascOrder={valueAscOrder}
                                    descOrder={valueDescOrder}
                                    handleOrder={handleValueOrder}
                                />
                            </div>
                            <div className="new-transition-button flex" onClick={openTransitionCreator}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <p>Criar nova {transitionType === 'expenses' ? 'despesa' : transitionType === 'revenues' ? 'receita' : ''}</p>
                            </div>
                        </div>
                        <div className="list">
                            {filteredTransitionList}
                        </div>
                        <ListPagination 
                            totalItems={totalItems !== 0 ? totalItems : ITEMS_PER_PAGE}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            changePage={handleChangePage}
                        />
                    </div>
                </section>
                <TransitionCreator transitionType={transitionType} showModal={showModal} closeModal={closeTransitionCreator} />
            </section>
            <div className="nav-background" onClick={handleNavbarIsOpen}></div>
            <Footer />
        </Fragment>
    );
}

export default TransitionList;