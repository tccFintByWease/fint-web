import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

function AuthenticationErrorMessage(props) {
    return (
        <div className={props.authenticationError ? 'alert alert-danger flex' : 'none'}>
            <FontAwesomeIcon icon={faCircleExclamation} />
            <p className="authentication-error-message">
                {`Erro ao autenticar o usuário.\nTente novamente em instantes`}
            </p>
        </div>
    );
}

AuthenticationErrorMessage.propTypes = {
    authenticationError: PropTypes.bool.isRequired
}  

export default AuthenticationErrorMessage;