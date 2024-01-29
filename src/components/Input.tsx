import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField,
  Typography,
} from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface InputPropTypes {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type: string;
  name: string;
  value?: string;
  error?: boolean;
  helperText?: ReactNode;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>
    | undefined;
  forgotPassword?: boolean;
}

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
}: InputPropTypes): ReactElement => {

  const navigate = useNavigate();
  const toForgotPassword = () => {
    navigate('/forgot-password');
  }
  return (
    <div>
      <TextField
        label={label}
        variant='outlined'
        type={type}
        fullWidth
        name={name}
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ backgroundColor: '#dfab62' }}
        color='warning'
        error={error}
        helperText={helperText}
        InputProps={InputProps}
      />
      {forgotPassword && (
        <Typography
          variant='subtitle2'
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          mt={1}
          ml={1}
          onClick={toForgotPassword}
        >
          Forgot Password?
        </Typography>
      )}
    </div>
  );
};

export default Input;
