import * as yup from 'yup';

const insertTransitionSchema = yup.object({
    observacaoMovimentacao: yup.string()
        .required('Insira um nome para a movimentação')
        .min(5, 'O nome da movimentação deve conter um máximo de 300 caracteres')
        .max(300, 'O nome da movimentação deve conter um máximo de 300 caracteres'),

    observacaoMovimentacao: yup.string()
        .required('Insira um nome para a movimentação')
        .min(5, 'O nome da movimentação deve conter um máximo de 300 caracteres')
        .max(300, 'O nome da movimentação deve conter um máximo de 300 caracteres'),
});

export {
    insertTransitionSchema
}