import * as yup from 'yup';

const loginSchema = yup.object({
    emailUsuario: yup.string()
        .email('Insira um email válido')
        .required('Insira seu email')
        .max(100, 'O email deve conter um máximo de 100 caracteres'),

    senhaUsuario: yup.string()
        .required('Insira sua senha')
        .min(8, 'A senha deve conter um mínimo de 8 caracteres')
        .max(50, 'A senha deve conter entre 8 e 50 caracteres'),

    manterConectado: yup.bool()
        
});

export {
    loginSchema
}