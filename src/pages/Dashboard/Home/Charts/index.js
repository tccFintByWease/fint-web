/* libraries */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
/* stylesheets and assets */
import './styles.css';
// import './media-queries.css';
/* components */
import { Chart } from "react-google-charts";

function Charts(props) {
    if(!props.preview) {
        return (
            <Chart
                chartType={props.chart.chartType}
                data={props.chart.data}
                options={props.chart.options}
                width="96%"
                height="480px"
                legendToggle
            />
        );
    } else {
        return (
            <Chart
                chartType={props.chart.chartType}
                data={props.chart.data}
                options={props.chart.options}
                width="418px"
            />
        );
    }
}

Charts.propTypes = {
    chart: PropTypes.object.isRequired,
    preview: PropTypes.bool.isRequired
}  

export default Charts;