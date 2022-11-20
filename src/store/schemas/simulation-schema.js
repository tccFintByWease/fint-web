import * as yup from 'yup';

const simulationSchema = yup.object({
    descricaoSimulacao: yup.string()
        .required('Insira um nome para a simulação')
        .max(100, 'O nome da simulação deve conter um máximo de 100 caracteres'),

    valorInicialSimulacao: yup.number()
        .required('Insira o valor investido'),

    dataInicialSimulacao: yup.date('Insira a data novamente')
    .required('Insira a data inicial da simulação'),
    
    dataFinalSimulacao: yup.date('Insira a data novamente')
    .required('Insira a data final da simulação'),

    taxaCorretagemSimulacao: yup.number()
        .required('Insira uma taxa de corretagem'),

    taxaJurosSimulacao: yup.number()
        .required('Insira uma taxa de corretagem')
});

export {
    simulationSchema
}