import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

const Title = (): ReactElement => {
  return (
    <Box
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      marginBottom={-1}
      marginTop={2}
    >
      <Box
        style={{
          color: '#ff9800',
          padding: '0.4rem',
          width: '10rem',
          textAlign: 'center',
          borderRadius: '0.7rem',
        }}
      >
        <Typography variant='h6'>
          <b>Chat</b>
          <b
            style={{
              backgroundColor: '#ff9800',
              color: 'black',
              borderRadius: '0.4rem',
              padding: '0.2rem',
              marginLeft: '0.2rem'
            }}
          >
            Hub
          </b>
        </Typography>
      </Box>
    </Box>
  );
};

export default Title;
