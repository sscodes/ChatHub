import { Avatar, Box, Grid, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { MouseEventHandler } from 'react';

interface InboxType {
  image: string;
  username: string;
  chat?: string;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  date?: Timestamp;
}

const Inbox = ({ image, username, chat = '', onClick, date }: InboxType) => {
  return (
    <Box
      className='inbox'
      borderBottom={1.4}
      borderColor={'orange'}
      pt={2}
      pb={1}
      onClick={onClick}
    >
      <Box display={'flex'} pl={1}>
        <Box>
          <Avatar src={image} style={{ backgroundColor: 'orange' }} />
        </Box>
        <Grid container display={'flex'} ml={1} alignItems={'top'}>
          <Grid item xs={12}>
            <Typography>
              <b>{username}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>{chat}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant='subtitle2'>
          {date?.toDate().toLocaleDateString('en-IN')}
        </Typography>
      </Box>
    </Box>
  );
};

export default Inbox;
