import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  Grid,
  Hidden,
  Slide,
  SlideProps,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
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

  return (
    <>
      <Grid
        container
        height={'95vh'}
        style={{
          placeItems: 'center',
        }}
        rowGap={4}
      >
        <Grid item xs={12} lg={6} alignItems={'center'}>
          <Grid container justifyContent={'center'} rowGap={5}>
            <Grid item xs={12}>
              <Box display={'flex'} justifyContent={'center'}>
                <img src='src/assets/LogoDark.svg' alt='logo' width={200} />
              </Box>
            </Grid>
            <Hidden lgDown>
              <Grid item xs={12}>
                <Box display={'flex'} justifyContent={'center'}>
                  <img src='src/assets/Login.svg' alt='logo' width={500} />
                </Box>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box display={'flex'} justifyContent={'center'}>
            <Box width={470} bgcolor={'#4b0082'} p={2} borderRadius={'2%'}>
              <Box textAlign={'center'}>
                <Typography
                  variant='h5'
                  gutterBottom
                  color={'blanchedalmond'}
                  fontFamily={'Nunito Sans'}
                >
                  <b>Already have an account, login!</b>
                </Typography>
              </Box>
              <Stack
                spacing={2}
                direction='column'
                display={'flex'}
                component={'form'}
                onSubmit={Formik.handleSubmit}
              >
                <Input
                  label='Email'
                  name='email'
                  type='text'
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  error={
                    Formik.touched.email && Formik.errors.email ? true : false
                  }
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
                    Formik.touched.password && Formik.errors.password
                      ? true
                      : false
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
                  style={{
                    backgroundColor: 'rgb(246, 215, 169)',
                    color: 'indigo',
                  }}
                  type='submit'
                >
                  <b>Login</b>
                </Button>
              </Stack>
              <Box textAlign={'center'} mt={1}>
                <Typography variant='subtitle2' color={'rgb(246, 215, 169)'}>
                  New here?&nbsp;
                  <Link to={'/register'}>
                    <u style={{ color: 'rgb(246, 215, 169)' }}>Register!</u>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
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
