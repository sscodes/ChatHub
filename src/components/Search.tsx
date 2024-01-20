import { TextField } from '@mui/material';

const Search = () => {
  return (
    <TextField
      label={'Find an user...'}
      variant={'filled'}
      color={'warning'}
      style={{
        backgroundColor: '#dfab62',
        display: 'flex',
        borderTop: '0.2rem solid orange',
        borderBottom: '0.2rem solid orange',
      }}
    />
  );
};

export default Search;
