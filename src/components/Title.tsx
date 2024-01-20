import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

const Title = (): ReactElement => {
  return (
    <Box
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        style={{
          color: '#ff9800',
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
              marginLeft: '0.2rem',
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
