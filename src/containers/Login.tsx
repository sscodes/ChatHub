import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  Slide,
  SlideProps,
  Snackbar,
  Stack,
  Typography,
  createTheme,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Title from '../components/Title';
import { auth } from '../config/firebase';
import { loginSchema } from '../config/schema';

interface valuesTypes {
  email: string;
  password: string;
}

const initialValues: valuesTypes = {
  email: '',
  password: '',
};

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const Login = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | unknown>('');
  const [passwordField, setPasswordField] = useState<string>('password');

  const navigate = useNavigate();

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrorMessage('');
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      console.log(values);
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate('/');
      } catch (error) {
        setOpen(true);
        // @ts-ignore
        setErrorMessage(error.code);
      }

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
        display={'grid'}
        height={'90vh'}
        style={{
          placeItems: 'center',
        }}
      >
        <Box bgcolor={'#ff9800'} width={'25rem'} p={2} borderRadius={'2%'}>
          <Box textAlign={'center'}>
            <Typography variant='h5' gutterBottom>
              <b>Already have an account, login!</b>
            </Typography>
          </Box>
          <Stack
            spacing={2}
            direction='column'
            display={'flex'}
            width={'400px'}
            component={'form'}
            onSubmit={Formik.handleSubmit}
          >
            <Input
              label='Email'
              name='email'
              type='text'
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.email && Formik.errors.email ? true : false}
              helperText={
                Formik.touched.email &&
                Formik.errors.email && (
                  <b style={{ color: 'red' }}>{Formik.errors.email}</b>
                )
              }
            />
            <Input
              forgotPassword={true}
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
          <Box textAlign={'center'} mt={1}>
            <Typography variant='subtitle2'>
              New here?&nbsp;
              <Link to={'/register'}>
                <u style={{ color: 'black' }}>Register!</u>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          style={{ width: '100%' }}
        >
          {errorMessage + ''}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
