/* libraries */
import * as yup from 'yup';
import axios from 'axios';
/* utils */
import { validateCPF } from './../../utils/cpf-utils';
/* store */
import { LOOK_FOR_EMAIL_URL, LOOK_FOR_CPF_URL, LOOK_FOR_PHONE_URL } from './../api-urls';

yup.addMethod(yup.string, "checkEmail", function (errorMessage) {
    return this.test('check-email', errorMessage, async function (value) {
        const { path, createError } = this;
        const response = await axios.post(LOOK_FOR_EMAIL_URL, { emailUsuario: value });

        return (
            response.data.result.emailUsuario !== value || createError({ path, message: errorMessage })
        );
    });
});

yup.addMethod(yup.string, "checkCPF", function (errorMessage) {
    return this.test('check-cpf', errorMessage, async function (value) {
        const { path, createError } = this;
        const response = await axios.post(LOOK_FOR_CPF_URL, { cpfUsuario: value });

        return (
            response.data.result.cpfUsuario !== value || createError({ path, message: errorMessage })
        );
    });
});

yup.addMethod(yup.string, "checkPhone", function (errorMessage) {
    return this.test('check-phone', errorMessage, async function (value) {
        const { path, createError } = this;
        const response = await axios.post(LOOK_FOR_PHONE_URL, { foneUsuario: value });

        return (
            response.data.result.foneUsuario !== value || createError({ path, message: errorMessage })
        );
    });
});

const minDate = new Date();
minDate.setHours(0, 0, 0, 0);
minDate.setFullYear(new Date().getFullYear() - 100);

const maxDate = new Date();
maxDate.setHours(0, 0, 0, 0);
maxDate.setFullYear(new Date().getFullYear() - 16);

const stepOneSchema = yup.object({
    emailUsuario: yup.string()
        .email('Insira um email válido')
        .required('Insira seu email')
        .max(100, 'O email deve ter no máximo 100 caracteres')
        .checkEmail("Esse email já está cadastrado na plataforma"),

    senhaUsuario: yup.string()
        .required('Insira sua senha')
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .max(50, 'A senha deve ter entre 8 e 50 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'Sua senha deve conter letras maiúsculas e minúsculas e ao menos um número e um caractere especial'
        ),

    confirmarSenha: yup.string()
        .required('Confirme sua senha')
        .oneOf([yup.ref('senhaUsuario'), null], 'As senhas não coincidem')
});

const stepTwoSchema = yup.object({
    nomeUsuario: yup.string()
        .required('Insira seu nome completo')
        .max(200, 'O email deve ter no máximo 200 caracteres'),

    cpfUsuario: yup.string()
        .required('Insira seu CPF')
        .min(14, 'Insira um CPF válido').max(14)
        .test('validated-cpf', 'Insira um CPF válido', (cpf) => validateCPF(cpf))
        .checkCPF("Esse CPF já está cadastrado na plataforma"),

    foneUsuario: yup.string()
        .required('Insira seu telefone')
        .min(15, 'Insira um telefone válido').max(15)
        .checkPhone("Esse telefone já está cadastrado na plataforma"),

    dataNascUsuario: yup.date('Insira sua data de nascimento novamente')
        .required('Insira sua data de nascimento')
        .min(minDate, 'Insira uma data de nascimento válida')
        .max(maxDate, 'É necessário ser maior de 16 anos para se cadastrar em nossa plataforma')
});

const stepThreeSchema = yup.object({
    valorInicial: yup.number(),

    moeda: yup.string()
});

export {
    stepOneSchema,
    stepTwoSchema,
    stepThreeSchema
}