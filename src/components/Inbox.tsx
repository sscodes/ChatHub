import { Avatar, Box, Grid, Typography } from '@mui/material';

interface InboxType {
  image: string;
  username: string;
}

const Inbox = ({ image, username }: InboxType) => {
  return (
    <Box className='inbox' borderBottom={1.4} borderColor={'orange'} py={2}>
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
            <Typography variant='subtitle2'>
              {username}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Inbox;
