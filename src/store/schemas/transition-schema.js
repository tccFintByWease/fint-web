import * as yup from 'yup';

const minDate = new Date();
minDate.setHours(0, 0, 0, 0);
minDate.setFullYear(new Date().getFullYear() - 1);

const maxDate = new Date();
maxDate.setHours(0, 0, 0, 0);
maxDate.setFullYear(new Date().getFullYear() + 1);

const transitionSchema = yup.object({
    idCategoria: yup.number(),

    descricaoMovimentacao: yup.string()
        .required('Insira um nome para a movimentação')
        .min(1, 'O nome da movimentação deve conter no mínimo 1 caractere')
        .max(300, 'O nome da movimentação deve conter um máximo de 300 caracteres'),

    observacaoMovimentacao: yup.string()
        .max(300, 'A observação deve conter um máximo de 300 caracteres'),

    dataMovimentacao: yup.date('Insira a data da movimentação novamente')
        .required('Insira a data da movimentação')
        .min(minDate, 'A data mínima permitida para uma movimentação é de um ano atrás')
        .max(maxDate, 'A data máxima permitida para uma movimentação é de um ano a frente'),

    valorMovimentacao: yup.number()
        .required('Insira o valor da movimentação'),

});

export {
    transitionSchema
}