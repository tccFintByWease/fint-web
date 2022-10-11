/* libraries */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
/* store */
import { LIST_CURRENCIES_URL } from './api-urls';

function ListCurrencies() {

    const [data, setData] = useState();

    useEffect(() => {
        genCurrenciesList((dataResults) => setData(dataResults));
    }, []);

    const listCurrencies = async () => {
        try {
            const response = await axios.get(LIST_CURRENCIES_URL);
            const currencies = response.data.result;

            return currencies;
        } catch (error) {
            return 'error';
        }
    }

    const compare = (currency1, currency2) => {
        if (currency1.descricaoMoeda < currency2.descricaoMoeda) {
            return -1;
        } else if (currency1.descricaoMoeda > currency2.descricaoMoeda) {
            return 1;
        }
        return 0;
    }

    const genCurrenciesList = async (callback) => {
        let promises = (await listCurrencies()).sort(compare).map(currency => (
            <option value={currency.idMoeda} key={currency.descricaoMoeda}>
                {currency.descricaoMoeda}
            </option>
        ))

        let dataResults = await Promise.all(promises);

        callback(dataResults);
    }
    
    const dataReturn = data ? data : 'Carregando dados...'

    return dataReturn;
}

export default ListCurrencies;
