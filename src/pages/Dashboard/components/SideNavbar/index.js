/* libraries */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
/* stylesheets and assets */
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
import faEye from './../../../../assets/images/eye-solid.png';
import faEyeSlash from './../../../../assets/images/eye-slash-solid.png';
import userPicture from './../../../../assets/images/user-picture.png';
/* components */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket, faHouse, faWallet, faMoneyBillWave, faChartLine } from '@fortawesome/free-solid-svg-icons';
/* contexts */
import { useAuth } from './../../../../contexts/auth';
/* store*/
import { GET_BALANCE_VALUE_URL } from './../../../../store/api-urls';

function SideNavbar(props) {
    const {user, signOut} = useAuth();

    useEffect(() => {
        handleBalanceValue();
    }, []);

    const [balanceValue, setBalanceValue] = useState(274.53);
    const [balanceVisibility, setBalanceVisibility] = useState(true);

    const handleSignOut = () => {
        signOut();
    }

    const handleBalanceValue = async () => {
        const response = await axios.post(GET_BALANCE_VALUE_URL, { idUsuario: user.idUsuario });

        const revenuesValue = response.data.result[0]?.somaMovimentacao;
        const expensesValue = response.data.result[1]?.somaMovimentacao;

        setBalanceValue(revenuesValue - expensesValue);
    }

    const handleBalanceVisibility = () => {
        const balance = document.querySelector('.aside-balance-value-text');

        const balanceVisibilityButton = document.querySelector('#asideBalanceVisibilityButton');

        if (!balanceVisibility) {
            balance.innerHTML = `R$ ${balanceValue.toFixed(2).toString().replace('.', ',')}`;
            balanceVisibilityButton.src = faEyeSlash;
            

            setBalanceVisibility(true);
        } else if (balanceVisibility === true) {
            balance.innerHTML = 'OCULTO';
            balanceVisibilityButton.src = faEye;
            setBalanceVisibility(false);
        }
    }

    useEffect(() => {
        const removeActiveLink = () => {
            const links = document.querySelector('.aside-nav').querySelectorAll('a');

            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
            }
        }

        const setActiveLink = () => {
            removeActiveLink();

            const links = document.querySelector('.aside-nav').querySelectorAll('a');
            if (props.active === 'home') {
                links[0].classList.add('active');
            } else if (props.active === 'expenses') {
                links[1].classList.add('active');
            } else if (props.active === 'simulator') {
                links[2].classList.add('active');
            } else if (props.active === 'simulations') {
                links[3].classList.add('active');
            }
        }

        setActiveLink();
    }, []);

    return (
        <div id="dashboard__aside">
            <aside className="aside">
                <div className="top-navbar-content flex">
                    <div className="balance">
                        <p className="balance-description">SALDO</p>
                        <div className="balance-value flex">
                            <p className="aside-balance-value-text">{`R$ ${balanceValue.toString().replace('.', ',')}`}</p>
                            <img src={faEyeSlash} alt="Ícone de olho" id="asideBalanceVisibilityButton" onClick={handleBalanceVisibility} />
                        </div>
                    </div>
                    <hr />
                    <div className="user-profile flex">
                        <img src={userPicture} alt="Foto do usuário" />
                        <p className="user-profile-username">{user?.nomeUsuario}</p>
                        <nav className="user-profile-nav flex">
                            <a href="/profile-and-settings">
                                <FontAwesomeIcon icon={faUser} />
                                Perfil e Configurações
                            </a>
                            <a href="/login" onClick={handleSignOut} className="sign-out-button">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                Desconectar-se
                            </a>
                        </nav>
                    </div>
                    <hr />
                </div>
                <nav className="aside-nav flex">
                    <p className="nav-label">menu</p>
                    <a href="/" id="home-link">
                        <FontAwesomeIcon icon={faHouse} />
                        início
                    </a>
                    <a href="/expenses">
                        <FontAwesomeIcon icon={faWallet} />
                        gastos
                    </a>
                    <a href={`/simulator-${-1}`}>
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                        simulador
                    </a>
                    <a href="/simulations">
                        <FontAwesomeIcon icon={faChartLine} />
                        investimentos
                    </a>
                </nav>
            </aside>
        </div>
    );
}

SideNavbar.propTypes = {
    active: PropTypes.string.isRequired,
    handleNavbarIsOpen: PropTypes.func.isRequired
}  

export default SideNavbar;