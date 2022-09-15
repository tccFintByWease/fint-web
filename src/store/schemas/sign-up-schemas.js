import * as yup from 'yup';
import { validateCPF } from './../../utils/cpf-utils';

const schemaStepOne = yup.object({
    email: yup.string()
        .email('Insira um email válido')
        .required('Insira seu email')
        .max(320, 'O email deve ter no máximo 320 caracteres'),

    password: yup.string()
        .required('Insira sua senha')
        .min(10, 'A senha deve ter no mínimo 10 caracteres')
        .max(20, 'A senha deve ter entre 10 e 20 caracteres'),

    passwordConfirmation: yup.string()
        .required('Confirme sua senha')
        .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
});

const schemaStepTwo = yup.object({
    name: yup.string()
        .required('Insira seu nome completo'),

    cpf: yup.string()
        .required('Insira seu CPF')
        .min(14, 'Insira um CPF válido').max(14)
        .test('validated-cpf', 'Insira um CPF válido', (cpf) => validateCPF(cpf)),

    phone: yup.string()
        .required('Insira seu telefone')
        .min(15, 'Insira um telefone válido').max(15),

    birthDate: yup.date()
        .required('Insira sua data de nascimento')
});

const schemaStepThree = yup.object({
    initialValue: yup.number()
        .required(),

    currentCurrency: yup.string()
        .required()
});

export {
    schemaStepOne,
    schemaStepTwo,
    schemaStepThree
}