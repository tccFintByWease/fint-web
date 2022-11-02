/* libraries */
import React from 'react';
import PropTypes from 'prop-types';
/* stylesheets and assets */
import './styles.css';
import './media-queries.css';
/* components */
import { Chart } from "react-google-charts";

function Charts(props) {
    if(!props.preview) {
        return (
            <Chart
                chartType={props.chart.chartType}
                data={props.chart.data}
                options={props.chart.options}
                width="100%"
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