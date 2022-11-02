import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import './mediaQueries.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from './../../assets/images/black-logo.png';

function Footer(props) {
    return (
        <Fragment>
            <footer className={props.className ? props.className : ''}>
                <div className="footer-text flex">
                    <a href="#">
                        <img src={logo} alt="Fint" className="logo" />
                    </a>
                    <div className="footer-links">
                        <a href="#">Contato</a>
                        <a href="/documentation">Termos de Uso</a>
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

Footer.propTypes = {
    className: PropTypes.string
}  

export default Footer;