import { TextField, Typography } from '@mui/material';
import { ReactElement, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputPropTypes } from '../types/types';

const Input = ({
  label,
  onChange,
  onBlur,
  type,
  name,
  value,
  error = false,
  helperText = null,
  InputProps,
  forgotPassword = false,
  refProp = () => {},
}: InputPropTypes): ReactElement => {
  const navigate = useNavigate();
  const toForgotPassword = () => {
    navigate('/forgot-password');
  };

  const inputRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    refProp(inputRef?.current?.querySelector('div input'));
  }, [refProp]);

  return (
    <div>
      <TextField
        label={label}
        variant='filled'
        type={type}
        fullWidth
        name={name}
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ backgroundColor: 'rgb(246, 215, 169)' }}
        color='secondary'
        error={error}
        helperText={helperText}
        InputProps={InputProps}
        ref={inputRef}
      />
      {forgotPassword && (
        <Typography
          variant='subtitle2'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          mt={1}
          ml={1}
          onClick={toForgotPassword}
          color={'rgb(246, 215, 169)'}
        >
          Forgot Password?
        </Typography>
      )}
    </div>
  );
};

export default Input;
