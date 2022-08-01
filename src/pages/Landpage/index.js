import React, { Fragment } from 'react';
import './styles.css';
import Navbar from './Navbar/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from './../../assets/images/black-logo.png';

function Landpage() {
    return (
        <Fragment>
            <Navbar />
            <section className="hero">
                <div className="hero-text">
                    <h1>Facilitando sua vida financeira.</h1>
                    <p>Aprenda a gerenciar seu dinheiro e conheça mais sobre o mundo financeiro com a Fint, uma plataforma que te proporcionará maior controle financeiro e a possibilidade de começar a investir com segurança.</p>
                    <div className="buttons-cta">
                        <button>Baixar o Aplicativo</button>
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
                <div className="plans">
                    <div className="monthly">
                        <p className="promo">R$239,88 AO ANO</p>
                        <p>Plano Premium Mensal</p>
                        <p className="price">R$<span>19,99</span> / mês</p>
                        <span class="button-box">
                            <button className="buttons-cta">Assinar</button>
                        </span>
                    </div>
                    <div className="yearly">
                        <p className="promo">RECOMENDADO - CERCA DE 17% DE DESCONTO</p>
                        <p>Plano Premium Anual</p>
                        <p class="price">R$<span>199,99</span> / ano</p>
                        <div className="list">
                            <ul className="fa-ul">
                                <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Gráficos exclusivos</li>
                                <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Livre de anúncios</li>
                                <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Conteúdo exclusivo</li>
                                <li><span className="fa-li"><FontAwesomeIcon icon={faCircleCheck} /></span> Suporte prioritário</li>
                            </ul>
                            <p>...</p>
                        </div>
                        <button className="buttons-cta">Assinar</button>
                    </div>
                    <div className="quarterly">
                        <p className="promo">10% DE DESCONTO</p>
                        <p>Plano Premium Trimestral</p>
                        <p className="price">R$<span>53,99</span> / tri.</p>
                        <span class="button-box">
                            <button className="buttons-cta">Assinar</button>
                        </span>
                    </div>
                </div>
            </section>
            <section className="about-us">
                <div className="about-us-text">
                    <h2>Wease co.</h2>
                    <p>A Wease co. é uma empresa que visa facilitar tarefas cotidianas por meio da combinação de tecnologia e criatividade.</p>
                    <div className="buttons-cta">
                        <button>Sobre</button>
                        <button>Contato</button>
                    </div>
                </div>
                <div className="about-us-image">
                    <div className="placeholder-image"></div>
                </div>
            </section>
            <footer>
                <div className="footer-text">
                    <a href="#">
                        <img src={logo} alt="Fint" class="logo" />
                    </a>
                    <div className="footer-links">
                        <a href="#">Contato</a>
                        <a href="#">Termos de Uso</a>
                        <a href="#">FAQ</a>
                    </div>
                    <div className="footer-links">
                        <a href="#">
                            <FontAwesomeIcon icon={faSquareInstagram} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faSquareTwitter} />
                        </a>
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>Copyright © 2021 Wease Co.</p>
                </div>
            </footer>
        </Fragment>
    );
}

export default Landpage;