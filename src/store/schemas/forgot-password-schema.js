import * as yup from 'yup';

const forgotPasswordSchema = yup.object({
    emailUsuario: yup.string()
        .email('Insira um email válido')
        .required('Insira seu email')
        .max(100, 'O email deve conter um máximo de 100 caracteres')
        
});

export {
    forgotPasswordSchema
}