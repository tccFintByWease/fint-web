/* libraries */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
/* components */
import CreatableSelect from 'react-select/creatable'
import { Form, Col } from 'react-bootstrap';
/* store */
import { GET_CATEGORIES_URL, INSERT_CATEGORY_URL } from './../store/api-urls';
/* context */
import { useAuth } from './../contexts/auth';

function ListCategories(props) {
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState();

    const [value, setValue] = useState(props.defaultValue ? { label: '', value: '', color: '' } : null);
    const [categoryColor, setCategoryColor] = useState(props.defaultValue ? (props?.defaultValue[2] ? props.defaultValue[2] : "#2CE6A3") : "#2CE6A3");

    useEffect(() => {
        genCategoriesList((dataResults) => setOptions(dataResults));
    }, []);

    const handleDefaultValue = () => {
        if (typeof props.defaultValue[1] === 'number') {
            return { label: props.defaultValue[0], value: props.defaultValue[1], color: props.defaultValue[2] };
        } else {
            return value;
        }
    }

    const listCategories = async () => {
        try {
            const idTipoMovimentacao = props.transitionType === 'revenues' ? 1 : props.transitionType === 'expenses' ? 2 : '';

            const response = await axios.post(GET_CATEGORIES_URL, { idUsuario: user.idUsuario, idTipoMovimentacao });
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
            {
                label: category.descricaoCategoria,
                value: category.idCategoria,
                color: category.corCategoria
            }
        ));

        let dataResults = await Promise.all(promises);
        callback(dataResults);
    }

    const handleChange = (selectedOption) => {
        setValue(selectedOption);
        props.setCategoryId(selectedOption.value);
    }

    const createCategory = async (label) => {
        try {
            const idTipoMovimentacao = props.transitionType === 'revenues' ? 1 : props.transitionType === 'expenses' ? 2 : '';

            const category = { idUsuario: user.idUsuario, idTipoMovimentacao, descricaoCategoria: label, corCategoria: categoryColor };

            const response = await axios.post(INSERT_CATEGORY_URL, category);

            return {
                label,
                value: response.data.result.idCategoria,
                color: response.data.result.corCategoria
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreate = async (inputValue) => {
        setIsLoading(true);
        const newCategory = await createCategory(inputValue);
        setIsLoading(false);
        setOptions((prev) => [...prev, newCategory]);
        setValue(newCategory);
    }

    const colorStyles = {
        control: (styles) => ({
            ...styles,

            '&:hover': { border: 'none' },
            border: 'none',
            boxShadow: 'none'
        }),

        option: (styles, { data }) => ({
            ...styles,
            backgroundColor: data.color,
            width: 'fill-content',
            margin: '5px 20px',
            padding: '5px 20px',
            borderRadius: '5px',
            color: '#FFF'
        })
    };

    return (
        <div className="categories flex">
            <div className="categories-select">
                <Form.Label>Categoria</Form.Label>
                <CreatableSelect
                    name="idCategoria"
                    id="transitionCategoriesSelect"
                    placeholder="Selecione uma categoria"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={handleChange}
                    onCreateOption={handleCreate}
                    options={options}
                    value={props.defaultValue ? (value !== { label: '', value: '', color: '' } ? handleDefaultValue() : value) : value}
                    styles={colorStyles}
                    noOptionsMessage={({inputValue}) => !inputValue ? "Nenhum resultado foi encontrado" : "Nenhum resultado foi encontrado"}
                    isClearable
                />
            </div>
            <div className="category-color">
                <Form.Label>Cor da categoria</Form.Label>
                <Form.Control
                    type="color"
                    name="corCategoria"
                    value={props.defaultValue ? (props?.defaultValue[2] ? props?.defaultValue[2] : categoryColor) : categoryColor}
                    onChange={e => {
                        setCategoryColor(e.target.value);
                    }}
                    data-testid="txt-descricao-movimentacao"
                    autoComplete="off"
                />
            </div>
        </div>
    );
}

ListCategories.propTypes = {
    transitionType: PropTypes.string.isRequired,
    setCategoryId: PropTypes.func.isRequired,
    defaultValue: PropTypes.array
}

export default ListCategories;
