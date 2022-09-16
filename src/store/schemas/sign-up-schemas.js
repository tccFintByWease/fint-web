import * as yup from 'yup';
import { validateCPF } from './../../utils/cpf-utils';

const schemaStepOne = yup.object({
    emailUsuario: yup.string()
        .email('Insira um email válido')
        .required('Insira seu email')
        .max(320, 'O email deve ter no máximo 320 caracteres'),

    senhaUsuario: yup.string()
        .required('Insira sua senha')
        .min(10, 'A senha deve ter no mínimo 10 caracteres')
        .max(20, 'A senha deve ter entre 10 e 20 caracteres'),

    confirmarSenha: yup.string()
        .required('Confirme sua senha')
        .oneOf([yup.ref('senhaUsuario'), null], 'As senhas não coincidem')
});

const schemaStepTwo = yup.object({
    nomeUsuario: yup.string()
        .required('Insira seu nome completo'),

    cpfUsuario: yup.string()
        .required('Insira seu CPF')
        .min(14, 'Insira um CPF válido').max(14)
        .test('validated-cpf', 'Insira um CPF válido', (cpf) => validateCPF(cpf)),

    foneUsuario: yup.string()
        .required('Insira seu telefone')
        .min(15, 'Insira um telefone válido').max(15),

    dataNascUsuario: yup.date()
        .required('Insira sua data de nascimento')
});

const schemaStepThree = yup.object({
    valorInicial: yup.number()
        .required(),

    moeda: yup.string()
        .required()
});

export {
    schemaStepOne,
    schemaStepTwo,
    schemaStepThree
}