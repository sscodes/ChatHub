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
  type: string;
  error?: boolean;
  helperText?: ReactNode;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps> | undefined;
}

const Input = ({
  label,
  onChange,
  type,
  error=false,
  helperText=null,
  InputProps,
}: InputPropTypes): ReactElement => {
  return (
    <div>
      <TextField
        label={label}
        variant='outlined'
        type={type}
        fullWidth
        required
        onChange={onChange}
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
