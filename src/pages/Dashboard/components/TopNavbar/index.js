/* libraries */
import React, { useState } from 'react';
/* stylesheets and assets */
import './styles.css';
// import './media-queries.css';
import logo from './../../../../assets/images/black-logo.png';
import faEye from './../../../../assets/images/eye-solid.png';
import faEyeSlash from './../../../../assets/images/eye-slash-solid.png';
import userPicture from './../../../../assets/images/user-picture.png';
/* components */
import { A, navigate } from 'hookrouter';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
/* contexts */
import { useAuth } from './../../../../contexts/auth';

function TopNavbar() {
    const {user, signOut} = useAuth();

    const [balanceValue, setBalanceValue] = useState(274.53);
    const [balanceVisibility, setBalanceVisibility] = useState(true);

    const handleSignOut = () => {
        signOut();
        navigate('/login');
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
            <header className="header flex fixed">
                <a href="/">
                    <img src={logo} alt="Fint" className="logo" />
                </a>
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
                        <p>{user?.nomeUsuario}</p>
                    </div>
                    <Dropdown.Toggle split id="user-dropdown" />
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/profile-and-settings">Perfil e Configurações</Dropdown.Item>
                        <Dropdown.Item href="#/sign-out">
                            <a href="/" onClick={handleSignOut}>Desconectar-se</a>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </header>
        </div>
    );
}

export default TopNavbar;