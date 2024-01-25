import { Box, Grid, Typography } from '@mui/material';
import Message from './Message';
import { useContext } from 'react';
import { ChatContext } from '../context/chatContext';

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
};

interface stateType {
  chatId: string;
  user: userInfoType;
}

const Chat = () => {
  const { data }: { data: stateType } = useContext(ChatContext);

  return data.user.displayName ? (
    <Box height={'25rem'} style={{ overflowY: 'auto' }}>
      <Grid container>
        <Grid item xs={12} display={'flex'} justifyItems={'start'} py={1}>
          <Grid item xs={6}>
            <Message type='friend' />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <Grid item xs={12} display={'flex'} py={1}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Message type='user' />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box display={'flex'} justifyContent={'center'} marginTop={'25vh'}>
      <Box textAlign={'center'}>
        <Typography variant='h2' color={'orange'}>
          Welcome!
        </Typography>
        <Typography variant='h4' color={'orange'}>
          Click on a chat to start messaging.
        </Typography>
      </Box>
    </Box>
  );
};

export default Chat;
