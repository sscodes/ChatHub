import { Avatar, Grid, Typography } from '@mui/material';
import Title from './Title';

const LeftNavbar = () => {
  return (
    <Grid py={2} container>
      <Grid item xs={4} mt={0.4}>
        <Title />
      </Grid>
      <Grid item xs={8} display={'flex'} justifyContent={'end'} pr={2}>
        <Avatar
          src='../../Sanket-Photo.jpeg'
          style={{width: 37, height: 37 }}
        />
        <Typography
          display={'flex'}
          alignItems={'center'}
          color={'warning.light'}
          ml={1}
          variant='h6'
        >
          username
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LeftNavbar;
