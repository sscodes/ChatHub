import {
  Alert,
  Box,
  Button,
  Grid,
  Slide,
  SlideProps,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { auth } from '../config/firebase';
import Images from '../config/images';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const ForgotPassword = () => {
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  const handleSuccessClose = (
    _event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
  };

  const handleErrorClose = (
    _event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
    setErrorMessage('');
  };

  const sendForgotPasswordEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessOpen(true);
        setTimeout(() => navigate('/login'), 7000);
      })
      .catch((error) => {
        setErrorOpen(true);
        setErrorMessage(error.code);
      });
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} mt={2}>
        <img src={Images.LogoDark} alt='logo' width={150} />
      </Box>
      <Grid
        container
        height={'70vh'}
        style={{
          placeItems: 'center',
        }}
      >
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent={'center'}>
            <Box width={400} bgcolor={'#4b0082'} p={2} borderRadius={'2%'}>
              <Box textAlign={'center'}>
                <Typography
                  variant='h5'
                  gutterBottom
                  color={'blanchedalmond'}
                  fontFamily={'Nunito Sans'}
                >
                  <b>Forgot your password?</b>
                  <br />
                  <b>No worries!</b>
                </Typography>
              </Box>
              <Stack
                spacing={2}
                direction='column'
                display={'flex'}
                component={'form'}
                onSubmit={sendForgotPasswordEmail}
              >
                <Input
                  label='Email'
                  name='email'
                  type='text'
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => setEmail(e.target.value)}
                  onBlur={() => null}
                />
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: 'rgb(246, 215, 169)',
                    color: 'indigo',
                  }}
                  type='submit'
                >
                  <b>Confirm email</b>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={handleErrorClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleErrorClose}
          severity='error'
          variant='filled'
          style={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successOpen}
        autoHideDuration={5000}
        onClose={handleSuccessClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleSuccessClose}
          severity='success'
          variant='filled'
          style={{ width: '100%' }}
        >
          Sent password reset link successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPassword;
