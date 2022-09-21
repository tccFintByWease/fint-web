import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    return (
        <button type={props.type ? props.type : 'button'} className={props.transparent ? 'btn-action transparent' : 'btn-action normal'} onClick={props.onClick} id={props.id}>
            {props.text}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    transparent: PropTypes.bool.isRequired,
    id: PropTypes.string
}  

export default Button;