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
import { faAngleLeft, faAngleRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import TopNavbar from './../components/TopNavbar/index';
import SideNavbar from './../components/SideNavbar/index';
import Charts from './Charts/index';
import Button from './../../../components/Button/index';
import Footer from './../../../components/Footer/index';
/* contexts */
import { useAuth } from './../../../contexts/auth';
/* store */
import { getChartType } from './../../../store/charts';
import { GET_CHARTS, GET_USER_CHARTS, INSERT_USER_CHART, DELETE_USER_CHART } from './../../../store/api-urls';

function Home() {
    const {user} = useAuth();

    const [chartsList, setChartsList] = useState()
    const [freeCharts, setFreeCharts] = useState();
    const [premiumCharts, setPremiumCharts] = useState();
    const [userCharts, setUserCharts] = useState();

    const [slide, setSlide] = useState(0);
    const [slideNumbers, setSlidesNumber] = useState(0);
    const [chart, setChart] = useState();

    const [showModal, setShowModal] = useState(false);

    const isChartsUpdatedRef = useRef(true);
    const isUserChartsUpdatedRef = useRef(true);

    useEffect(() => {
        const chartsUpdate = async () => {
            await getChartsList();
            setChartsList(freeCharts ? [...freeCharts.charts, ...premiumCharts.charts] : []);
            const success = await getUserCharts();

            if (!success) {
                setUserCharts(freeCharts ? freeCharts : {});
                setSlidesNumber(freeCharts ? freeCharts.charts.length : 0);
            }
            setChart(freeCharts ? freeCharts.charts[0] : {});
        }
        
        if (isChartsUpdatedRef.current) {
            isChartsUpdatedRef.current = false;
        } else {
            chartsUpdate();
        }
        
    }, [isChartsUpdatedRef.current]);

    useEffect(() => {
        if (isChartsUpdatedRef.current) {
            isUserChartsUpdatedRef.current = false;
        } else {
            getUserCharts();
        }
        
    }, [isUserChartsUpdatedRef.current]);

    const getChartsList = async () => {
        const response = await axios.get(GET_CHARTS);
    
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
        const response = await axios.post(GET_USER_CHARTS, { idUsuario: user.idUsuario });

        if (response.data.result.length !== 0) {
            await genCharts('user', response.data.result, getChartsObject);
            setSlidesNumber(response.data.result.length);

            return true;
        }

        return false;
    }

    const updateUserCharts = async (type, chartSelected) => {
        if (type === 'add') {
            if (slideNumbers >= 5) { // TODO: MUJDAR PARA 5 E LISTAR SÓ 5 SLIDES GRATUITOS
                // TODO: Exibir um erro: remover um slide para adicionar outro.
            } else {
                const response = await axios.post(INSERT_USER_CHART, user.idUsuario, chartSelected.id);
                console.log(response);
            }
        } else if (type === 'remove') {
            const response = await axios.delete(DELETE_USER_CHART, user.idUsuario, chartSelected.id);

            console.log(response);
        }

        isUserChartsUpdatedRef.current = true;
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
    }

    const checkSelectedCharts = (type, chartName) => {
        if (type === 'selector') {
            for (let i = 0; i < userCharts.charts.length; i++) {
                if (userCharts.charts[i].name === chartName) {
                    return (
                        <FontAwesomeIcon icon={faCheckCircle} className='chart-selected' />
                    );
                }
            }

            return (
                <span className='chart-preview-selection'></span>
            );
        } else if (type === 'button') {
            for (let i = 0; i < userCharts.charts.length; i++) {
                if (userCharts.charts[i].name === chartName) {
                    return (
                        <button className="btn-action btn-remove" onClick={() => updateUserCharts('remove', chart.id)}>
                            Desativar
                        </button>
                    );
                }
            }

            return (
                <button className="btn-action" onClick={() => updateUserCharts('add', chart.id)}>
                    Ativar
                </button>
            )
        }

        
    }

    const createChartsPreviews = () => {
        return chartsList ? chartsList.map((chart) => {
            // TODO: LISTAR SE O GRÁFICO É PREMIUM E SE O USUÁRIO É OU NÃO ASSINANTE
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
                        {checkSelectedCharts('selector', chart.name)}
                    </div>
                    <Charts chart={chart} preview={true} />
                    <div className="chart-preview-footer">
                        {checkSelectedCharts('button', chart.name)}
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
                    {userCharts ? createChartsPreviews() : ''}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button text="Salvar mudanças" transparent={false} onClick={closeChartsSelector} />
                    </Modal.Footer>
                </Modal>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Home;