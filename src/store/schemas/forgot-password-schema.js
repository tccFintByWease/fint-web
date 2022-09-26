import * as yup from 'yup';

const forgotPasswordSchema = yup.object({
    emailUsuario: yup.string()
        .email('Insira um email válido')
        .required('Insira seu email')
        .max(100, 'O email deve conter um máximo de 100 caracteres')
});

const recoverPasswordSchema = yup.object({
    primeiroDigito: yup.number()
        .required('Insira todos os dígitos do código'),

    segundoDigito: yup.number()
    .required('Insira todos os dígitos do código'),

    terceiroDigito: yup.number()
    .required('Insira todos os dígitos do código'),

    quartoDigito: yup.number()
    .required('Insira todos os dígitos do código'),

    quintoDigito: yup.number()
    .required('Insira todos os dígitos do código'),

    sextoDigito: yup.number()
    .required('Insira todos os dígitos do código')
});

export {
    forgotPasswordSchema,
    recoverPasswordSchema
}