import { Grid } from '@mui/material';
import Left from '../components/Left';
import Right from '../components/Right';

const Home = () => {
  return (
    <div
      style={{
        display: 'grid',
        justifyContent: 'center',
      }}
    >
      <Grid
        style={{
          width: '80vw',
        }}
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
    </div>
  );
};

export default Home;
