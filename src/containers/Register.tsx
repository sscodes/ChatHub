import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Slide,
  SlideProps,
  Snackbar,
  Stack,
  Typography,
  createTheme,
} from '@mui/material';
import { FirebaseError } from 'firebase/app';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Title from '../components/Title';
import { auth, db, storage } from '../config/firebase';
import { registerSchema } from '../config/schema';

interface valuesTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  file: File | null;
}

const initialValues: valuesTypes = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  file: null,
};

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const Register = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('password');
  const [confirmPasswordField, setConfirmPasswordField] =
    useState<string>('password');

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

  const handleSubmit = async (values: valuesTypes) => {
    setLoading(true);
    try {
      const res: UserCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const storageRef = ref(storage, values.username);
      if (values.file) {
        const uploadTask = uploadBytesResumable(storageRef, values.file);

        uploadTask.on(
          // @ts-ignore
          (error: unknown) => {
            setLoading(false);
            setOpen(true);

            if (error instanceof FirebaseError) {
              setErrorMessage(error.code);
            } else if (
              typeof error === 'object' &&
              error !== null &&
              'code' in error
            ) {
              // You can access 'code' property safely here
              setErrorMessage((error as { code: string }).code);
            } else {
              // Handle other types of errors or unknown types
              setErrorMessage(String(error));
            }
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName: values.username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              username: values.username,
              email: values.email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          }
        );
      }
    } catch (error: unknown) {
      setOpen(true);
      setLoading(false);
      if (error instanceof FirebaseError) {
        setErrorMessage(error.code);
      } else {
        setErrorMessage(error + '');
      }
    }
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users'),
            where('username', '==', values.username)
          )
        );
        querySnapshot.docs.forEach((doc) => {
          if (doc.exists()) throw { code: 'username unavailable' };
        });
        handleSubmit(Formik.values);
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

  return loading ? (
    <>
      <Box position={'absolute'} top={'50%'} left={'50%'}>
        <CircularProgress color='warning' />
      </Box>
    </>
  ) : (
    <>
      <Title />
      <Box
        display={'grid'}
        mt={1}
        style={{
          placeItems: 'center',
        }}
      >
        <Box bgcolor={'#ff9800'} width={'25rem'} p={2} borderRadius={'2%'}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom>
              <b>Chat Now: Quick Sign-Up!</b>
            </Typography>
          </div>
          <Stack
            spacing={2}
            direction='column'
            component={'form'}
            display={'flex'}
            width={'400px'}
            onSubmit={Formik.handleSubmit}
          >
            <Input
              label='Username'
              type='text'
              name='username'
              value={Formik.values.username}
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
              label='Email'
              type='email'
              name='email'
              value={Formik.values.email}
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
              label='Password'
              type={passwordField}
              name='password'
              value={Formik.values.password}
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
            <Input
              label='Confirm Password'
              type={confirmPasswordField}
              name='confirmPassword'
              value={Formik.values.confirmPassword}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.confirmPassword && Formik.errors.confirmPassword
                  ? true
                  : false
              }
              helperText={
                Formik.touched.confirmPassword &&
                Formik.errors.confirmPassword && (
                  <b style={{ color: 'red' }}>
                    {Formik.errors.confirmPassword}
                  </b>
                )
              }
              InputProps={{
                endAdornment: (
                  <div
                    onClick={() => {
                      if (confirmPasswordField === 'password')
                        setConfirmPasswordField('text');
                      else setConfirmPasswordField('password');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {confirmPasswordField === 'password' ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </div>
                ),
              }}
            />
            <Box
              display={'grid'}
              style={{
                placeItems: 'center',
              }}
            >
              <input
                accept='.png, .jpg, .jpeg'
                style={{ display: 'none' }}
                id='file-input'
                type='file'
                name='file'
                onChange={(e) => {
                  Formik.setFieldValue('file', e.target.files?.[0] || null);
                }}
              />
              <label htmlFor='file-input'>
                <Button
                  variant='contained'
                  component='span'
                  style={{ backgroundColor: theme.palette.warning.dark }}
                >
                  <Stack
                    direction={'row'}
                    spacing={1}
                    display={'flex'}
                    alignItems={'center'}
                  >
                    <Avatar>
                      <AddPhotoAlternateIcon />
                    </Avatar>
                    <Typography variant='subtitle2' color={'white'}>
                      Set Profile Picture
                    </Typography>
                  </Stack>
                </Button>
              </label>
              {Formik.errors.file && Formik.touched.file ? (
                <Typography
                  variant='subtitle2'
                  color={'white'}
                  bgcolor={'red'}
                  p={1}
                  mt={1}
                >
                  {Formik.errors.file}
                </Typography>
              ) : null}
              {Formik.values.file && (
                <p>Selected File: {Formik.values.file.name}</p>
              )}
            </Box>
            <Button
              variant='contained'
              style={{ backgroundColor: theme.palette.warning.dark }}
              type='submit'
            >
              Register
            </Button>
          </Stack>
          <Box textAlign={'center'} mt={1}>
            <Typography variant='subtitle2'>
              Already have an account?&nbsp;
              <Link to={'/login'}>
                <u style={{ color: 'black' }}>Login!</u>
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
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
