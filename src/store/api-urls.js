const API = 'http://localhost:1433/api';

const SIGN_UP_URL = `${API}/usuario/inserir`;
const UPDATE_USER_URL = `${API}/usuario/alterar`;
const LOGIN_URL = `${API}/login/buscarLogin`;

const LIST_CURRENCIES_URL = `${API}/moeda/buscarTodos`;

const INSERT_TRANSITION_URL = `${API}/movimentacao/inserir`;

const LOOK_FOR_EMAIL_URL = `${API}/usuario/buscarUmPorEmail`;
const LOOK_FOR_CPF_URL = `${API}/usuario/buscarUmPorCPF`;
const LOOK_FOR_PHONE_URL = `${API}/usuario/buscarUmPorFone`;
const FORGOT_PASSWORD_URL = `${API}/usuario/buscarUmPorFone`;

const GET_CHARTS_URL = `${API}/grafico/buscarTodos`;
const GET_USER_CHARTS_URL = `${API}/grafico/buscarGraficoUsuario`;
const INSERT_USER_CHART_URL = `${API}/grafico/inserirGraficoUsuario`;
const DELETE_USER_CHART_URL = `${API}/grafico/deletarGraficoUsuario`;

const CHECK_USER_TYPE_URL = `${API}/usuario/verificarTipoUsuario`;
const INSERT_USER_TYPE_URL = `${API}/usuario/inserirTipoUsuario`;
const UPDATE_USER_TYPE_URL = `${API}/usuario/alterarTipoUsuario`;

const UPDATE_TRANSITION_URL = `${API}/movimentacao/alterar`
const DELETE_TRANSITION_URL = `${API}/movimentacao/deletar`;
const GET_REVENUES_URL = `${API}/movimentacao/buscarTodasReceitas`;
const GET_EXPENSES_URL = `${API}/movimentacao/buscarTodasDespesas`;
const GET_TRANSITION_URL = `${API}/movimentacao/buscarUmPorId`;
const GET_BALANCE_VALUE_URL = `${API}/movimentacao/calcularDespesasReceitas`

const GET_CATEGORIES_URL = `${API}/categoria/buscarTodasCategorias`;
const GET_CATEGORY_URL = `${API}/categoria/buscarUmPorId`;
const INSERT_CATEGORY_URL = `${API}/categoria/inserir`;
const UPDATE_CATEGORY_URL = `${API}/categoria/alterar`;
const DELETE_CATEGORY_URL = `${API}/categoria/deletar`;
const GET_CATEGORY_RECURRENCE_URL = `${API}/categoria/buscarRecorrenciaCategoriaMovimentacao`;

export  {
    SIGN_UP_URL,
    UPDATE_USER_URL,
    LOGIN_URL,
    LIST_CURRENCIES_URL,
    INSERT_TRANSITION_URL,
    LOOK_FOR_EMAIL_URL,
    LOOK_FOR_CPF_URL,
    LOOK_FOR_PHONE_URL,
    FORGOT_PASSWORD_URL,
    GET_CHARTS_URL,
    GET_USER_CHARTS_URL,
    INSERT_USER_CHART_URL,
    DELETE_USER_CHART_URL,
    CHECK_USER_TYPE_URL,
    INSERT_USER_TYPE_URL,
    UPDATE_USER_TYPE_URL,
    UPDATE_TRANSITION_URL,
    DELETE_TRANSITION_URL,
    GET_REVENUES_URL,
    GET_EXPENSES_URL,
    GET_TRANSITION_URL,
    GET_CATEGORIES_URL,
    GET_CATEGORY_URL,
    INSERT_CATEGORY_URL,
    UPDATE_CATEGORY_URL,
    DELETE_CATEGORY_URL,
    GET_CATEGORY_RECURRENCE_URL,
    GET_BALANCE_VALUE_URL
}