/* libraries */
import React from 'react';
import PropTypes from 'prop-types';
/* stylesheets and assets */
import './styles.css';
/* components */
import Pagination from 'react-bootstrap/Pagination';

function ListPagination(props) {
    
    const genFirstItem = () => {
        return (
            <Pagination.First 
                key="pagFirst"
                onClick={() => props.changePage(1)}
                disabled={props.currentPage === 1}
            />
        );
    }

    const genPreviousItem = () => {
        return (
            <Pagination.Prev
                key="pagPrev"
                onClick={() => props.changePage(props.currentPage - 1)}
                disabled={props.currentPage === 1} />
        );
    }

    const genNumericItem = (page) => {
        return (
            <Pagination.Item
                key={page}
                active={page === props.currentPage}
                onClick={() => props.changePage(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    const genNextItem = (numberPages) => {
        return (
            <Pagination.Next
                key="pagNext"
                onClick={() => props.changePage(props.currentPage + 1)}
                disabled={props.currentPage === numberPages}
            />
        );
    }

    const genLastItem = (numberPages) => {
        return (
            <Pagination.Last
                key="pagLast"
                onClick={() => props.changePage(numberPages)}
                disabled={props.currentPage === numberPages}
            />
        );
    }

    const getPagination = () => {
        const numberPages = Math.ceil(props.totalItems / props.itemsPerPage);

        let items = [];

        items.push(genFirstItem());
        items.push(genPreviousItem());

        for (let page = 1; page <= numberPages; page++) {
            items.push(genNumericItem(page));
        }

        items.push(genNextItem(numberPages));
        items.push(genLastItem(numberPages));

        return items;
    }

    return (
        <Pagination>
            {getPagination()}
        </Pagination>
    );
}

ListPagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
}

export default ListPagination;