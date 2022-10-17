const getChartType = (chartType) => {
    if (chartType === 'Coluna') {
        return 'ColumnChart';
    } else if (chartType === 'Barra') {
        return 'BarChart';
    } else if (chartType === 'Setor') {
        return 'PieChart';
    } else if (chartType === 'Linha') {
        return 'LineChart';
    } else { // default chartType
        return 'ColumnChart';
    }
}
    
export {
    getChartType
}