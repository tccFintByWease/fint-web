const getTodayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
        
    today = yyyy + '-' + mm + '-' + dd;

    return today.toString();
}

const getSpecificDate = (days, months, years) => {
    let today = new Date();
    let dd = today.getDate() + days;
    let mm = today.getMonth() + 1 + months;
    const yyyy = today.getFullYear() + years;

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
        
    today = yyyy + '-' + mm + '-' + dd;

    return today.toString();
}

const formatDatetime = (date) => {
    try {
        const formatedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

        return formatedDate;
    } catch (error) {
        console.log(error);
    }
}

const removeTime = (date) => {
    let formatedDate = new Date(date);
    const yyyy = formatedDate.getFullYear();
    let mm = formatedDate.getMonth() + 1;
    let dd = formatedDate.getDate();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    const newDate = dd + '/' + mm + '/' + yyyy;

    return newDate;
}

export {
    getTodayDate,
    getSpecificDate,
    formatDatetime,
    removeTime
}