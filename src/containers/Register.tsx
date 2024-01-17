import { Box, Stack, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>();

  useEffect(() => {
    if (password !== confirmPassword) setPasswordMismatch(false);
    else true;
  }, [confirmPassword, password]);

  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
  };
  return (
    <Box
      style={{ display: 'flex', justifyContent: 'center' }}
      component='form'
    >
      <Stack spacing={2} direction='column' style={{ display: 'flex' }}>
        <TextField label='Username' variant='standard' fullWidth required />
        <TextField label='Email' variant='standard' fullWidth required />
        <TextField label='Password' variant='standard' fullWidth required />
        <TextField label='Confirm Password' variant='standard' fullWidth required />
      </Stack>
    </Box>
  );
};

export default Register;
