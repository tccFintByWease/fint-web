/* libraries */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import axios from 'axios';
/* stylesheets and assets */
import './styles.css';
// import './media-queries.css';
import logo from './../../../assets/images/black-logo.png';
/* components */
import { A, navigate } from 'hookrouter';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import TopNavbar from './../components/TopNavbar/index';
import SideNavbar from './../components/SideNavbar/index';
import Charts from './Charts/index';
import AlertMessage from './../../../components/AlertMessage/index';
import Button from './../../../components/Button/index';
import Footer from './../../../components/Footer/index';
/* contexts */
import { useAuth } from './../../../contexts/auth';
/* store */
import { getChartType } from './../../../store/charts';
import { GET_CHARTS_URL, GET_USER_CHARTS_URL, INSERT_USER_CHART_URL, DELETE_USER_CHART_URL, CHECK_USER_TYPE_URL } from './../../../store/api-urls';

// TODO: arrumar o remover gráfico favorito

function Home() {
    const {user} = useAuth();
    const [userType, setUserType] = useState(1);

    const [alertMessage, setAlertMessage] = useState(false);

    const [chartsList, setChartsList] = useState()
    const [freeCharts, setFreeCharts] = useState();
    const [premiumCharts, setPremiumCharts] = useState();
    const [userCharts, setUserCharts] = useState();

    const [slide, setSlide] = useState(0);
    const [slideNumbers, setSlidesNumber] = useState(0);
    const [chart, setChart] = useState();

    const [isPreviewAddBtnDisabled, setIsPreviewAddBtnDisabled] = useState(false);
    const [isPreviewRemoveBtnDisabled, setIsPreviewRemoveBtnDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [updateChartsAfterChange, setUpdateChartsAfterChange] = useState(false);
    const isChartsUpdatedRef = useRef(true);
    const isUserChartsUpdatedRef = useRef(true);

    useEffect(() => {
        const getUserType = async () => {
            const response = await axios.post(CHECK_USER_TYPE_URL, { idUsuario: user.idUsuario });
            setUserType(response.data.result.idAssinatura);
        }

        getUserType();
    }, []);

    useEffect(() => {
        const chartsUpdate = async () => {
            await getChartsList();
            setChartsList(freeCharts ? [...freeCharts.charts, ...premiumCharts.charts] : []);
            const success = await getUserCharts();

            if (!success) {
                const defaultUserCharts = freeCharts ? { charts: [freeCharts.charts[0], freeCharts.charts[1], freeCharts.charts[2], freeCharts.charts[3], freeCharts.charts[4]] } : { charts: [{}]};

                setChart(defaultUserCharts ? defaultUserCharts.charts[0] : {});
                setUserCharts(defaultUserCharts ? defaultUserCharts : {});
                setSlidesNumber(defaultUserCharts ? defaultUserCharts.charts.length : 0);
            } else {
                setChart(userCharts ? userCharts.charts[0] : {});
            }
        }
        
        if (isChartsUpdatedRef.current) {
            isChartsUpdatedRef.current = false;
        } else {
            chartsUpdate();
        }

        if (updateChartsAfterChange) {
            chartsUpdate();
            setUpdateChartsAfterChange(false);
        }
        
    }, [isChartsUpdatedRef.current, updateChartsAfterChange]);

    useEffect(() => {
        if (isUserChartsUpdatedRef.current) {
            isUserChartsUpdatedRef.current = false;
        } else {
            getUserCharts();
        }
        
    }, [isUserChartsUpdatedRef.current]);

    const handleIsPreviewAddBtnDisabled = (value) => {
        const addButtons = document.querySelectorAll('.chart-preview-add-btn');

        if (value) {
            for (let i = 0; i < addButtons.length; i++) {
                addButtons[i].disabled = true;
            }

            setIsPreviewAddBtnDisabled(true);
        } else {
            for (let i = 0; i < addButtons.length; i++) {
                addButtons[i].disabled = false;
            }

            setIsPreviewAddBtnDisabled(false);
        }
    }

    const handleIsPreviewRemoveBtnDisabled = (value) => {
        const removeButtons = document.querySelectorAll('.chart-preview-remove-btn');

        if (value) {
            for (let i = 0; i < removeButtons.length; i++) {
                removeButtons[i].disabled = true;
            }

            setIsPreviewRemoveBtnDisabled(true);
        } else {
            for (let i = 0; i < removeButtons.length; i++) {
                removeButtons[i].disabled = false;
            }

            setIsPreviewRemoveBtnDisabled(false);
        }
    }

    const getChartsList = async () => {
        const response = await axios.get(GET_CHARTS_URL);
    
        const freeChartsArr = response.data.result.filter(chart => chart.exclusivo === 0);
        const premiumChartsArr = response.data.result.filter(chart => chart.exclusivo === 1);
        
        await genCharts('free', freeChartsArr, getChartsObject);
        await genCharts('premium', premiumChartsArr, getChartsObject);
    }

    const genCharts = async (type, charts, callback) => {
        let promises = charts.map(chart => {
            return {
                id: chart.idGrafico,
                isPremium: chart.exclusivo, // 0 false 1 true
                name: chart.descricaoGrafico,
                chartType: getChartType(chart.tipoGrafico),
                data: Math.random() * 10 > 4 ? [
                    ['Tempo', 'Despesas'],
                    [1, 113],
                    [2, 250],
                    [3, 500],
                    [4, 400]
                ] : [
                    ['Tempo', 'Receitas'],
                    [6, 115],
                    [12, 10000],
                    [8, 2800],
                    [7, 1500]
                ],
                options: {
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
                }
            }
        });

        let promisesResults = await Promise.all(promises);

        callback(type, promisesResults);
    }
    
    const getChartsObject = (type, chartsArr) => {
        if (type === 'free') {
            const freeCharts = {
                version: 1.0,
                totalCharts: chartsArr.length,
                charts: chartsArr
            }

            setFreeCharts(freeCharts);
        } else if (type === 'premium') {
            const premiumCharts = {
                version: 1.0,
                totalCharts: chartsArr.length,
                charts: chartsArr
            }

            setPremiumCharts(premiumCharts);
        } else if (type === 'user') {
            const userCharts = {
                version: 1.0,
                totalCharts: chartsArr.length,
                charts: chartsArr
            }

            setUserCharts(userCharts);
        }
    }

    const backSlide = () => {
        if (slide === 0) {
            setSlide(slideNumbers - 1);
            setChart(userCharts.charts[slideNumbers - 1]);
        } else {
            setSlide(slide - 1);
            setChart(userCharts.charts[slide - 1]);
        }
    }

    const passSlide = () => {
        if (slideNumbers > 1) {
            if (slide === slideNumbers - 1) {
                setSlide(0);
                setChart(userCharts.charts[0]);
            } else {
                setSlide(slide + 1);
                setChart(userCharts.charts[slide + 1]);
            }
        }
    }

    const selectSlide = (index) => {
        if (slideNumbers > 1) {
            const slideSelectors = document.querySelectorAll('.slide-selector');
            for (let i = 0; i < slideSelectors.length; i++) {
                slideSelectors[i].classList.remove('selected');
            }
            slideSelectors[index].classList.add('selected');
            setSlide(index);
            setChart(userCharts.charts[index]);
        }
    }

    const getUserCharts = async () => {
        const response = await axios.post(GET_USER_CHARTS_URL, { idUsuario: user.idUsuario });

        if (response.data.result.length !== 0) {
            await genCharts('user', response.data.result, getChartsObject);
            setSlidesNumber(response.data.result.length);

            return true;
        }

        return false;
    }

    const updateUserCharts = async (type, chartSelected) => {
        if (type === 'add') {
            if (slideNumbers === 5) {
                const alertMessage = document.querySelector('.alert-message');
                alertMessage.innerText = 'Você atingiu o limite de 5 gráficos na tela inicial. Para adicionar um novo, remova um atual';
                setAlertMessage(true);

                handleIsPreviewAddBtnDisabled(true);
            } else {
                const response = await axios.post(INSERT_USER_CHART_URL, { idUsuario: user.idUsuario, idGrafico: chartSelected });

                setUpdateChartsAfterChange(true);

                if (isPreviewRemoveBtnDisabled) { handleIsPreviewRemoveBtnDisabled(false); }

                setAlertMessage(false);
            }
        } else if (type === 'remove') {
            if (slideNumbers === 1) {
                const alertMessage = document.querySelector('.alert-message');
                alertMessage.innerText = 'Ao menos um gráfico deve permanecer ativo';
                setAlertMessage(true);

                handleIsPreviewRemoveBtnDisabled(true);
            } else {
                const response = await axios.delete(DELETE_USER_CHART_URL, { idUsuario: user.idUsuario, idGrafico: chartSelected });
                console.log(response);
                console.log({ idUsuario: user.idUsuario, idGrafico: chartSelected });

                setUpdateChartsAfterChange(true);

                if (isPreviewAddBtnDisabled) { handleIsPreviewAddBtnDisabled(false); }

                setAlertMessage(false);
            }
        }
    }

    const createSlideSelectors = () => {
        if (slideNumbers > 1) {
            return userCharts.charts.map((chart, index) => {
                if (slide === index) {
                    return (
                        <div className="slide-selector selected" onClick={() => selectSlide(index)} key={`slide-${index}`}></div>
                    );
                } else {
                    return (
                        <div className="slide-selector" onClick={() => selectSlide(index)} key={`slide-${index}`}></div>
                    );
                }
                
            }); 
        }
    }

    const openChartsSelector = () => {
        setShowModal(true);
    }

    const closeChartsSelector = () => {
        setShowModal(false);
        setAlertMessage(false);
    }

    const checkSelectedCharts = (type, chart) => {
        if (type === 'selector') {
            if (chart.isPremium && userType === 1) {
                return (
                    <FontAwesomeIcon icon={faLock} className='chart-premium' />
                );
            } else {
                for (let i = 0; i < userCharts.charts.length; i++) {
                    if (userCharts.charts[i].name === chart.name) {
                        return (
                            <FontAwesomeIcon icon={faCheckCircle} className='chart-selected' />
                        );
                    }
                }
            }
            
            return (
                <span className='chart-preview-selection'></span>
            );
        } else if (type === 'button') {
            if (chart.isPremium && userType === 1) {
                return (
                    <button className="btn-action btn-remove chart-preview-remove-btn" onClick={() => updateUserCharts('remove', chart.id)} disabled>
                        Gráfico premium
                    </button>
                );
            } else {
                for (let i = 0; i < userCharts.charts.length; i++) {
                    if (userCharts.charts[i].name === chart.name) {
                        return (
                            <button className="btn-action btn-remove chart-preview-remove-btn" onClick={() => updateUserCharts('remove', chart.id)}>
                                Desativar
                            </button>
                        );
                    }
                }
            }
                
            return (
                <button className="btn-action chart-preview-add-btn" onClick={() => updateUserCharts('add', chart.id)}>
                    Ativar
                </button>
            )
        }

        
    }

    const createChartsPreviews = () => {
        return chartsList ? chartsList.map((chart) => {
            return (
                <div className="chart-preview" key={`${chart.name}`}>
                    <div className="chart-preview-header flex" style={{
                        width: '100%',
                        padding: '10px 20px',
                        borderBottom: 'solid 1px #E1E1E1'
                    }}>
                        <p className="chart-preview-name" style={{
                            margin: '0px',

                            fontSize: '20px',
                            fontWeight: '500',
                            letterSpacing: '0.1'
                        }}>{chart.name}</p>
                        {checkSelectedCharts('selector', chart)}
                    </div>
                    <Charts chart={chart} preview={true} />
                    <div className="chart-preview-footer">
                        {checkSelectedCharts('button', chart)}
                    </div>
                </div>
            );
        }) : 'Carregando...';
        
    }

    return (
        <Fragment>
            <TopNavbar />
            <section className="dashboard">
                <SideNavbar active={'home'} />
                <section className="home">
                    <h1>Bem-vindo de volta, <span className="username-title">{user?.nomeUsuario}</span></h1>
                    <div className="charts flex">
                        <FontAwesomeIcon icon={faAngleLeft} className={slideNumbers > 1 ? 'slide-button' : 'none'} id="previousChartButton" onClick={backSlide} />
                        {chart ? (<Charts chart={chart} preview={false} />) : 'Carregando gráfico...'}
                        <FontAwesomeIcon icon={faAngleRight} className={slideNumbers > 1 ? 'slide-button' : 'none'} id="nextChartButton" onClick={passSlide} />
                        <button className='set-charts-button' onClick={openChartsSelector}>+</button>
                    </div>
                        <div className="chart-description flex">
                            <p className="chart-title">{chart?.name}</p>
                        </div>
                        <div className="slide-selectors flex">
                            {userCharts ? createSlideSelectors() : ''}
                        </div>
                </section>
                <Modal dialogClassName="charts-selector" show={showModal} onHide={closeChartsSelector} animation={false} scrollable={true} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Selecionar Gráficos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="flex">
                        <AlertMessage alertMessage={alertMessage} />
                        {userCharts ? createChartsPreviews() : 'ERRO - Gráfico dos usuários não definidos'}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button text="Concluir" transparent={false} onClick={closeChartsSelector} />
                    </Modal.Footer>
                </Modal>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Home;