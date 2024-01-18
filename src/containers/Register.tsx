import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Stack, Typography, createTheme } from '@mui/material';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Title from '../components/Title';

const Register = (): ReactElement => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordField, setPasswordField] = useState<string>('password');
  const [confirmPasswordField, setConfirmPasswordField] =
    useState<string>('password');

  useEffect(() => {
    if (password && password.length > 0 && password.length < 7)
      setPasswordMessage('Length of password should be at least 7 characters');
    else if (password && password.length > 0 && !/\d/.test(password))
      setPasswordMessage('Password should have at least one numeric character');
    else if (
      password &&
      password.length > 0 &&
      // eslint-disable-next-line no-useless-escape
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
    )
      setPasswordMessage('Password should have at least one special character');
    else setPasswordMessage(null);
  }, [password]);

  useEffect(() => {
    if (password === '' || confirmPassword === '') setPasswordMismatch(false);
    else if (confirmPassword !== null && password !== confirmPassword)
      setPasswordMismatch(true);
    else setPasswordMismatch(false);
  }, [password, confirmPassword]);

  const theme = createTheme({
    palette: {
      warning: {
        main: '#ed6c02',
        dark: '#e65100',
      },
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      // If it's an image file, set the selected file
      setSelectedFile(file);
    } else {
      // If it's not an image file, reset the selected file
      setSelectedFile(null);
      alert('Please select a valid image file.');
    }
  };

  const register = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(selectedFile);
  };

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
          component='form'
        >
          <div style={{ textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom>
              <b>Chat Now: Quick Sign-Up!</b>
            </Typography>
          </div>
          <Stack
            spacing={2}
            direction='column'
            style={{ display: 'flex', width: '400px' }}
          >
            <Input
              label='Username'
              type='text'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label='Email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label='Password'
              type={passwordField}
              error={passwordMessage === null ? false : true}
              onChange={(e) => setPassword(e.target.value)}
              helperText={
                passwordMessage !== null && (
                  <b style={{ color: 'red' }}>{passwordMessage}</b>
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
              error={passwordMismatch}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={
                passwordMismatch && (
                  <b style={{ color: 'red' }}>Passwords do not match.</b>
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
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <input
                accept='image/*' // Specify accepted file types if needed
                style={{ display: 'none' }}
                id='file-input'
                type='file'
                onChange={handleFileChange}
              />
              <label htmlFor='file-input'>
                <Button
                  variant='contained'
                  style={{ backgroundColor: theme.palette.warning.dark }}
                >
                  Set Profile Picture
                </Button>
              </label>
              {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            </div>
            <Button
              variant='contained'
              style={{ backgroundColor: theme.palette.warning.dark }}
              onClick={register}
            >
              Register
            </Button>
          </Stack>
          <div style={{ textAlign: 'center', marginTop: '0.7rem' }}>
            <Typography variant='subtitle2'>
              Already have an account?&nbsp;
              <Link to={'/login'}>
                <u style={{ color: 'black' }}>Login!</u>
              </Link>
            </Typography>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Register;
