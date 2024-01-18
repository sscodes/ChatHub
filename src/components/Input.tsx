import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField,
} from '@mui/material';
import { ReactElement, ReactNode } from 'react';

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
}: InputPropTypes): ReactElement => {
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
    </div>
  );
};

export default Input;
