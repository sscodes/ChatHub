import { Avatar, Box, Grid, Typography } from '@mui/material';

interface MessagePropType {
  type?: string;
}
const Message = ({ type = 'friend' }: MessagePropType) => {
  return (
    <>
      <Grid container>
        {type === 'friend' && (
          <Grid
            item
            xs={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Avatar
              src='../../Sanket-Photo.jpeg'
              style={{ width: 45, height: 45 }}
            />
          </Grid>
        )}
        <Grid item xs={9}>
          <Box
            style={
              type === 'user'
                ? { borderRadius: '1rem 0 1rem 1rem' }
                : {
                    border: '0.2rem solid orange',
                    borderRadius: '0 1rem 1rem 1rem',
                  }
            }
            bgcolor={type === 'user' ? 'warning.light' : 'black'}
            color={type === 'user' ? 'black' : 'warning.light'}
            p={1}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
            ullam.
          </Box>
        </Grid>
        {type === 'user' && (
          <Grid
            item
            xs={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Avatar
              src='../../Sanket-Photo.jpeg'
              style={{ width: 45, height: 45 }}
            />
          </Grid>
        )}
      </Grid>
      <Box textAlign={'center'}>
        <Typography variant='subtitle2' color={'orange'}>
          Just now
        </Typography>
      </Box>
    </>
  );
};

export default Message;
