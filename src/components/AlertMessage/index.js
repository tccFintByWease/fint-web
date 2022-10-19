import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

function AlertMessage(props) {
    return (
        <div className={props.alertMessage ? 'alert alert-warning flex' : 'none'}>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <p className="alert-message">
                {`Mensagem de alerta.`}
            </p>
        </div>
    );
}

AlertMessage.propTypes = {
    alertMessage: PropTypes.bool.isRequired
}  

export default AlertMessage;