/* libraries */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
/* store */
import { GET_CATEGORIES_URL } from './../store/api-urls';

function ListCategories(props) {
    const [data, setData] = useState();

    useEffect(() => {
        genCategoriesList((dataResults) => setData(dataResults));
    }, []);

    const listCategories = async () => {
        try {
            const response = await axios.get(GET_CATEGORIES_URL, props.transitionTypeId);
            console.log(response);
            const categories = response.data.result;

            return categories;
        } catch (error) {
            return 'error';
        }
    }

    const compare = (category1, category2) => {
        if (category1.descricaoCategoria < category2.descricaoCategoria) {
            return -1;
        } else if (category1.descricaoCategoria > category2.descricaoCategoria) {
            return 1;
        }
        return 0;
    }

    const genCategoriesList = async (callback) => {
        let promises = (await listCategories()).sort(compare).map(category => (
            <option value={category.idCategoria} key={category.idCategoria}
                style={{
                    backgroundColor: `${category.corCategoria}`
                }
            }>
                {category.descricaoCategoria}
            </option>
        ))

        let dataResults = await Promise.all(promises);

        callback(dataResults);
    }
    
    const dataReturn = data ? data : 'Carregando dados...'

    return dataReturn;
}

export default ListCategories;
