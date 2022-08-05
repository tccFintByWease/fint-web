import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    return (
        <button className={props.transparent ? 'btn-action transparent' : 'btn-action normal'}>
            {props.text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.number.isRequired,
    transparent: PropTypes.bool.isRequired
}  

export default Button;