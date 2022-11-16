/* libraries */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
import logo from './../../../../assets/images/black-logo.png';
import faEye from './../../../../assets/images/eye-solid.png';
import faEyeSlash from './../../../../assets/images/eye-slash-solid.png';
import userPicture from './../../../../assets/images/user-picture.png';
/* components */
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
/* contexts */
import { useAuth } from './../../../../contexts/auth';
/* store*/
import { GET_BALANCE_VALUE_URL } from './../../../../store/api-urls';

function TopNavbar(props) {
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

        const revenuesValue = response.data.result[0].somaMovimentacao;
        const expensesValue = response.data.result[1].somaMovimentacao;

        setBalanceValue(revenuesValue + expensesValue);
    }

    const handleBalanceVisibility = () => {
        const balance = document.querySelector('.balance-value-text');

        const balanceVisibilityButton = document.querySelector('#balanceVisibilityButton');

        if (!balanceVisibility) {
            balance.innerHTML = `R$ ${balanceValue.toString().replace('.', ',')}`;
            balanceVisibilityButton.src = faEyeSlash;
            

            setBalanceVisibility(true);
        } else if (balanceVisibility === true) {
            balance.innerHTML = 'OCULTO';
            balanceVisibilityButton.src = faEye;
            setBalanceVisibility(false);
        }
    }
    
    return (
        <div id="dashboard__nav">
            <header className="dashboard-header flex fixed">
                <a href="/">
                    <img src={logo} alt="Fint" className="logo" />
                </a>
                <span className="hamburger" onClick={props.handleNavbarIsOpen}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <nav className="dashboard-header-nav flex">
                    <div className="balance">
                        <p className="balance-description">SALDO</p>
                        <div className="balance-value flex">
                            <p className="balance-value-text">{`R$ ${balanceValue.toString().replace('.', ',')}`}</p>
                            <img src={faEyeSlash} alt="Ícone de olho" id="balanceVisibilityButton" onClick={handleBalanceVisibility} />
                        </div>
                    </div>
                    <Dropdown as={ButtonGroup} className="user-options">
                        <div className="user-dropdown-label">
                            <img src={userPicture} alt="Foto do usuário" />
                            <p className="username-dropdown-label">{user?.nomeUsuario}</p>
                        </div>
                        <Dropdown.Toggle split id="user-dropdown" />
                        <Dropdown.Menu>
                            <Dropdown.Item href="/profile-and-settings">
                                <FontAwesomeIcon icon={faUser} />
                                Perfil e Configurações
                            </Dropdown.Item>
                            <Dropdown.Item href="/login" className="sign-out-dropdown-item" onClick={handleSignOut}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                Desconectar-se
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </nav>
            </header>
        </div>
    );
}

TopNavbar.propTypes = {
    handleNavbarIsOpen: PropTypes.func.isRequired
}  

export default TopNavbar;