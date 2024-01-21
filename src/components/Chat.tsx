import { Box, Grid } from '@mui/material';
import Message from './Message';

const Chat = () => {
  return (
    <Box height={'25rem'} style={{ overflowY: 'auto' }}>
      <Grid container>
        <Grid item xs={12} display={'flex'} justifyItems={'start'} py={1}>
          <Grid xs={6}>
            <Message />
          </Grid>
          <Grid xs={6}></Grid>
        </Grid>
        <Grid item xs={12} display={'flex'} py={1}>
          <Grid xs={6}></Grid>
          <Grid xs={6}>
            <Message type='user' />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
