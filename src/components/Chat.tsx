import { Grid } from '@mui/material';
import Message from './Message';

const Chat = () => {
  return (
    <div style={{ height: '25rem', overflowY: 'auto' }}>
      <Grid container>
        <Grid
          item
          xs={12}
          display={'flex'}
          justifyItems={'start'}
          py={1}
        >
          <Grid xs={6}>
            <Message />
          </Grid>
          <Grid xs={6}></Grid>
        </Grid>
        <Grid
          item
          xs={12}
          display={'flex'}
          py={1}
        >
        <Grid xs={6}></Grid>
          <Grid xs={6}>
            <Message type='user' />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
