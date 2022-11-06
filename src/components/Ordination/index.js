/* libraries */
import React from 'react';
import PropTypes from 'prop-types';
/* stylesheets and assets */
import './styles.css';
/* components */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Ordination(props) {
    const handleAsc = () => {
        return props.ascOrder ? 'sort-up' : 'sort-down';
    }

    return (
        <span className="ordination-icon" onClick={props.handleOrder}>
            <FontAwesomeIcon
                icon={faSortUp}
                className={handleAsc()}
                data-testid="faSortUp"
            />
        </span>
    );

}

Ordination.propTypes = {
    ascOrder: PropTypes.bool.isRequired,
    descOrder: PropTypes.bool.isRequired,
    handleOrder: PropTypes.func.isRequired
}

export default Ordination;