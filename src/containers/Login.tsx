import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Stack, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Title from '../components/Title';
import { loginSchema } from '../config/schema';

interface valuesTypes {
  username: string;
  password: string;
}

const initialValues: valuesTypes = {
  username: '',
  password: '',
};

const Login = () => {
  const [passwordField, setPasswordField] = useState<string>('password');

  const Formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  const theme = createTheme({
    palette: {
      warning: {
        main: '#ed6c02',
        dark: '#e65100',
      },
    },
  });

  return (
    <>
      <Title />
      <Box
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '90vh',
        }}
      >
        <Box
          style={{
            borderRadius: '2%',
            padding: '1.4%',
            width: '25rem',
            backgroundColor: '#ff9800',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom>
              <b>Already have an account, login!</b>
            </Typography>
          </div>
          <Stack
            spacing={2}
            direction='column'
            style={{ display: 'flex', width: '400px' }}
            component='form'
            onSubmit={Formik.handleSubmit}
          >
            <Input
              label='Username'
              name='username'
              type='text'
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.username && Formik.errors.username ? true : false
              }
              helperText={
                Formik.touched.username &&
                Formik.errors.username && (
                  <b style={{ color: 'red' }}>{Formik.errors.username}</b>
                )
              }
            />
            <Input
              label='Password'
              name='password'
              type={passwordField}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.password && Formik.errors.password ? true : false
              }
              helperText={
                Formik.touched.password &&
                Formik.errors.password && (
                  <b style={{ color: 'red' }}>{Formik.errors.password}</b>
                )
              }
              InputProps={{
                endAdornment: (
                  <div
                    onClick={() => {
                      if (passwordField === 'password')
                        setPasswordField('text');
                      else setPasswordField('password');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {passwordField === 'password' ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </div>
                ),
              }}
            />
            <Button
              variant='contained'
              style={{ backgroundColor: theme.palette.warning.dark }}
              type='submit'
            >
              Login
            </Button>
          </Stack>
          <div style={{ textAlign: 'center', marginTop: '0.7rem' }}>
            <Typography variant='subtitle2'>
              New here?&nbsp;
              <Link to={'/register'}>
                <u style={{ color: 'black' }}>Register!</u>
              </Link>
            </Typography>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Login;
