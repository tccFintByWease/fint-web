import React, { Fragment } from 'react';
import './styles.css';
import Navbar from './Navbar/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


function Landpage() {
    return (
        <Fragment>
            <Navbar />
            <section className="hero">
                <div className="hero-text">
                    <h1>Facilitando sua vida financeira.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus neque ipsum, vel aliquam mi pellentesque vitae. Quisque laoreet, tortor quis tincidunt tristique, leo dolor cursus augue, vel euismod nulla mauris sit amet enim.</p>
                    <div className="buttons-cta">
                        <button className="">Baixar o Aplicativo</button>
                        <button>Criar uma Conta</button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="placeholder-image"></div>
                </div>
            </section>
            <section className="explore">
                <div className="explore-control">
                    <div className="explore-text">
                        <h2>Planeje e controle seus gastos</h2>
                        <p>Cuide de suas despesas e de suas receitas de um modo fácil e intuitivo.</p>
                        <ul className="fa-ul">
                            <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Gráficos interativos</li>
                            <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Cadastre receitas e despesas</li>
                            <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Identique e reduza seus gastos</li>
                        </ul>
                    </div>
                    <div className="explore-image">
                        <div className="placeholder-image"></div>
                    </div>
                </div>
                <div className="explore-simulation">
                    <div className="explore-text">
                        <h2>Simule seus investimentos</h2>
                        <p>Simule e salve investimentos de baixo risco.</p>
                        <ul className="fa-ul">
                            <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Simulação fácil e interativa</li>
                            <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Gráficos para os investimentos</li>
                            <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Personalize seus investimentos</li>
                            <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Salve suas simulações favoritas</li>
                        </ul>
                    </div>
                    <div className="explore-image">
                        <div className="placeholder-image"></div>
                    </div>
                </div>
            </section>
            <section className="subscriptions">
                <h2>Escolha um Plano</h2>
                <p>Adquira vantagens como recursos especiais na plataforma e acesso à trilhas de aprendizagem exclusivas!</p>
            </section>
        </Fragment>
    );
}

export default Landpage;