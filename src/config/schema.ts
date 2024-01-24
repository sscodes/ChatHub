import * as Yup from 'yup';

export const registerSchema = Yup.object({
  username: Yup.string().required('Please enter your name').max(10).min(4),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string()
    .min(6)
    .required('Please enter your password')
    
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
      'Password must contain at least one number, one alphabet, and one special character'
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Password must match')
    ,
  file: Yup.mixed().required('Please set a profile picture'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});
