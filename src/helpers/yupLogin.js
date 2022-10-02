import * as Yup from 'yup';

export const yupLogin = Yup.object({
  email: Yup.string().email('Email Inválido').required('El email es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
