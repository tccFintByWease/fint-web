import * as yup from 'yup';

const simulationSchema = yup.object({
    descricaoSimulacao: yup.string()
        .required('Insira um nome para a simulação')
        .max(100, 'O nome da simulação deve conter um máximo de 100 caracteres'),

    investimentoInicialSimulacao: yup.number()
        .required('Insira o valor do investimento inicial'),

    investimentoMensalSimulacao: yup.number()
        .required('Insira o valor do investimento mensal'),

    dataInicialSimulacao: yup.date('Insira a data novamente')
    .required('Insira a data inicial da simulação'),
    
    dataFinalSimulacao: yup.date('Insira a data novamente')
    .required('Insira a data final da simulação'),

    taxaJurosSimulacao: yup.number()
        .required('Insira a taxa de juros da simulação')
});

export {
    simulationSchema
}