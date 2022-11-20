/* libraries */
import * as yup from 'yup';
/* utils */
import { validateCPF } from './../../utils/cpf-utils';

const minDate = new Date();
minDate.setHours(0, 0, 0, 0);
minDate.setFullYear(new Date().getFullYear() - 100);

const maxDate = new Date();
maxDate.setHours(0, 0, 0, 0);
maxDate.setFullYear(new Date().getFullYear() - 16);

const updateUserSchema = yup.object({
    emailUsuario: yup.string()
        .email('Insira um email válido')
        .required('Insira seu email')
        .max(100, 'O email deve ter no máximo 100 caracteres'),

    nomeUsuario: yup.string()
        .required('Insira seu nome completo')
        .max(200, 'O email deve ter no máximo 200 caracteres'),

    cpfUsuario: yup.string()
        .required('Insira seu CPF')
        .min(14, 'Insira um CPF válido').max(14)
        .test('validated-cpf', 'Insira um CPF válido', (cpf) => validateCPF(cpf)),

    foneUsuario: yup.string()
        .required('Insira seu telefone')
        .min(15, 'Insira um telefone válido').max(15),

    dataNascUsuario: yup.date('Insira sua data de nascimento novamente')
        .required('Insira sua data de nascimento')
        .min(minDate, 'Insira uma data de nascimento válida')
        .max(maxDate, 'É necessário ser maior de 16 anos para se cadastrar em nossa plataforma')
});

export {
    updateUserSchema
}