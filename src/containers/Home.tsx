import { Box, Grid } from '@mui/material';
import Left from '../components/Left';
import Right from '../components/Right';

const Home = () => {
  return (
    <Box display={'grid'} justifyContent={'center'}>
      <Grid
        width={'80vw'}
        border={4}
        borderColor={'orange'}
        borderRadius={3}
        mt={2}
        container
      >
        <Grid md={4} item borderRight={3} borderColor={'orange'}>
          <Left />
        </Grid>
        <Grid md={8} item>
          <Right />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
