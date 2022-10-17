/* libraries */
import React, { useEffect } from 'react';
/* stylesheets and assets */
import './styles.css';
// import './media-queries.css';
/* components */
import { A, navigate } from 'hookrouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faWallet, faMoneyBillWave, faChartLine } from '@fortawesome/free-solid-svg-icons';

function SideNavbar(props) {

    useEffect(() => {
        const setActiveLink = () => {
            const links = document.querySelector('.aside-nav').querySelectorAll('a');
            if (props.active === 'home') {
                links[0].classList.add('active');
            }
        }

        setActiveLink();
    }, []);

    

    return (
        <div id="dashboard__aside">
            <aside className="aside flex fixed">
                <nav className="aside-nav flex">
                    <p className="nav-label">menu</p>
                    <A href="/dashboard/home" id="home-link">
                        <FontAwesomeIcon icon={faHouse} />
                        início
                    </A>
                    <A href="/dashboard/expenses">
                        <FontAwesomeIcon icon={faWallet} />
                        gastos
                    </A>
                    <A href="/dashboard/expenses">
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                        simulador
                    </A>
                    <A href="#about-us">
                        <FontAwesomeIcon icon={faChartLine} />
                        investimentos
                    </A>
                </nav>
            </aside>
        </div>
    );
}

export default SideNavbar;