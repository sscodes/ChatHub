import { Avatar, Grid } from '@mui/material';
import Title from './Title';

const LeftNavbar = () => {
  return (
    <Grid
      style={{
        borderBottom: '0.2rem solid white',
      }}
      py={1}
      container
    >
      <Grid item xs={4} alignItems={'start'} mt={0.4}>
        <Title />
      </Grid>
      <Grid item xs={8}>
        <Avatar style={{ backgroundColor: 'deepskyblue' }}>SS</Avatar>
      </Grid>
    </Grid>
  );
};

export default LeftNavbar;
