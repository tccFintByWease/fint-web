import React from 'react';
import googlePlayBadge from './../../../../assets/images/google-play-badge.png';
import appStoreBadge from './../../../../assets/images/app-store-badge.png';
import './styles.css';

function Authentication() {

    return (
        <div className="download-box">
            <p>Baixe o aplicativo</p>
            <div className="download-buttons">
                <a href="#">
                    <img src={googlePlayBadge} alt="Fint" />
                </a>
                <a href="#">
                    <img src={appStoreBadge} alt="Fint" />
                </a>
            </div>
        </div>
    );
}

export default Authentication;