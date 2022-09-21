import React from 'react';

function ListCurrencies() {

    const CURRENCIES = [
        { "code": "AUD", "description": "Dólar australiano" },
        { "code": "BGN", "description": "Lev búlgaro" },
        { "code": "BRL", "description": "Real brasileiro" },
        { "code": "CAD", "description": "Dólar canadense" },
        { "code": "CHF", "description": "Franco suíço" },
        { "code": "CNY", "description": "Yuan Chinês" },
        { "code": "CZK", "description": "Coroa República Tcheca" },
        { "code": "DKK", "description": "Coroa dinamarquesa" },
        { "code": "EUR", "description": "Euro" },
        { "code": "GBP", "description": "Libra Esterlina" },
        { "code": "HKD", "description": "Dólar de Hong Kong" },
        { "code": "HRK", "description": "Coroa Croácia" },
        { "code": "HUF", "description": "Florim húngaro" },
        { "code": "IDR", "description": "Rupia indonésia" },
        { "code": "ILS", "description": "Novo shekel israelense" },
        { "code": "INR", "description": "Rupia indiana" },
        { "code": "JPY", "description": "Iene japonês" },
        { "code": "KRW", "description": "Won sul-coreano" },
        { "code": "MXN", "description": "Peso mexicano" },
        { "code": "MYR", "description": "Malásia Ringgit" },
        { "code": "NOK", "description": "Coroa Noruega" },
        { "code": "NZD", "description": "Dólar da Nova Zelândia" },
        { "code": "PHP", "description": "Peso filipino" },
        { "code": "PLN", "description": "Złoty Polónia" },
        { "code": "RON", "description": "Leu romeno" },
        { "code": "RUB", "description": "Belarus Ruble" },
        { "code": "SEK", "description": "Coroa Suécia" },
        { "code": "SGD", "description": "Dólar de Singapura" },
        { "code": "THB", "description": "Baht Tailândia" },
        { "code": "TRY", "description": "Lira turca" },
        { "code": "USD", "description": "Dólar dos Estados Unidos" },
        { "code": "ZAR", "description": "Rand África do Sul" }
    ];

    const compare = (currency1, currency2) => {
        if (currency1.code < currency2.code) {
            return -1;
        } else if (currency1.code > currency2.code) {
            return 1;
        }
        return 0;
    }

    return CURRENCIES.sort(compare).map(currency => (
            <option value={currency.code} key={currency.code}>
                {currency.code}
            </option>
        )
    );

}

export default ListCurrencies;
