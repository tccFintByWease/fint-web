/* libraries */
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import TopNavbar from '../components/TopNavbar/index';
import SideNavbar from '../components/SideNavbar/index';
import Footer from '../../../components/Footer/index';
import ListPagination from '../../../components/ListPagination/index';
import Ordination from '../../../components/Ordination/index';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
/* contexts */
import { useAuth } from '../../../contexts/auth';
/* store */
import { GET_SIMULATIONS_URL } from '../../../store/api-urls';

function TransitionList() {

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO: ARRUMAR O DATA INICIAL E FINAL EM OUTRAS COISAS DE MOVIMENTAÇÃO !!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const { user } = useAuth();

    const [showModal, setShowModal] = useState(false);

    const [simulationList, setSimulationList] = useState([]);
    const [filteredSimulationList, setFilteredSimulationList] = useState([]);
    const [reloadSimulationList, setReloadSimulationList] = useState(true);

    const [searchBarText, setSearchBarText] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [valueAscOrder, setValueAscOrder] = useState(true);
    const [valueDescOrder, setValueDescOrder] = useState(false);

    const [valueFilter, setValueFilter] = useState(true);

    const ITEMS_PER_PAGE = 5; // TODO: change to 10

    useEffect(() => {
        const getSimulationList = async () => {
            genSimulationList(() => listSimulation(), (dataResults) => setFilteredSimulationList(dataResults));
        }

        if (reloadSimulationList) {
            getSimulationList();
            setReloadSimulationList(false);
        }
    }, [reloadSimulationList]);

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

    const filterList = (list) => {
        let orderValue = valueFilter ? valueAscOrder ? 'ASC' : valueDescOrder ? 'DESC' : '' : '';

        if (searchBarText !== '') {
            list = list.filter((transition) => 
                transition.descricaoSimulacao.toLowerCase().indexOf(searchBarText.toLowerCase()) >= 0);
        }

        if (orderValue === 'ASC') {
            list.sort((s1, s2) => (s1.valorInicialSimulacao > s2.valorInicialSimulacao) ? 1 : -1);
        } else if (orderValue === 'DESC') {
            list.sort((s1, s2) => (s1.valorInicialSimulacao < s2.valorInicialSimulacao) ? 1 : -1);
        }

        return list;
    }

    const listSimulation = async () => {
        try {
            const response = await axios.post(GET_SIMULATIONS_URL, { idUsuario: user.idUsuario });
            console.log('LIST TRANSITION RESPONSE: \n', response.data);

            setSimulationList(response.data.result);

            let filteredList = filterList(response.data.result.slice(0));
            
            setTotalItems(filteredList.length);
            setFilteredSimulationList(filteredList);

            return filteredList;
        } catch (error) {
            setSimulationList([]);
            setFilteredSimulationList([]);
            console.log(error);
        }
    }

    const genSimulationList = async (getList, callback) => {
        let promises = (await getList()).slice(0, ITEMS_PER_PAGE).map(simulation => (
            <a href={`${simulation.idSimulacao}`} className="list-item flex" key={simulation.idSimulacao}>
                <div className="list-item-text">
                    <p className="list-item-title">
                        {simulation.descricaoSimulacao}
                    </p>
                    <p className="list-item-value">
                        {`Valor: R$ ${simulation.valorInicialSimulacao}`}
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

        setReloadSimulationList(true);
    }

    const handleChangePage = (page) => {
        setCurrentPage(page);
        
        genSimulationList(() => listPage(page), (dataResults) => setFilteredSimulationList(dataResults));
    }

    const listPage = (page) => {
        const pageList = simulationList.slice(0).splice((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);

        return pageList;
    }

    const handleValueFilterChange = () => {
        setValueFilter(!valueFilter);

        setReloadSimulationList(true);
    }

    const handleValueOrder = () => {
        if (valueAscOrder) {
            setValueAscOrder(false);
            setValueDescOrder(true);
        } else if (valueDescOrder) {
            setValueAscOrder(true);
            setValueDescOrder(false);
        }

        setReloadSimulationList(true);
    }

    return (
        <Fragment>
            <TopNavbar handleNavbarIsOpen={handleNavbarIsOpen} />
            <section className="dashboard">
                <SideNavbar active={'simulations'} handleNavbarIsOpen={handleNavbarIsOpen} />
                <section className="simulations">
                    <h1>Simulações salvas</h1>
                    <div className="simulation-list flex">
                        <div className="search-bar flex">
                            <Form.Control
                                type="text"
                                value={searchBarText}
                                placeholder="Pesquise uma simulação"
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
                        </div>
                        <div className="list">
                            {filteredSimulationList}
                        </div>
                        <ListPagination 
                            totalItems={totalItems !== 0 ? totalItems : ITEMS_PER_PAGE}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            changePage={handleChangePage}
                        />
                    </div>
                </section>
            </section>
            <div className="nav-background" onClick={handleNavbarIsOpen}></div>
            <Footer />
        </Fragment>
    );
}

export default TransitionList;