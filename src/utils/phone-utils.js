const formatPhone = (phone) => {
    switch (phone.length) {
        case 1:
            phone = phone.replace(/(\d{1})/, '($1');
            break;
        case 2:
        case 3:
            phone = phone.replace(/(\d{2})/, '$1) ');
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            phone = phone.replace(/(\d{5})/, '$1-');
            break;
        default:
            break;
    }
    
    return phone;
}

export {
    formatPhone
}