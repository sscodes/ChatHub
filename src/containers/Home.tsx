import { Grid } from '@mui/material';
import Left from '../components/Left';

const Home = () => {
  return (
    <Grid
      style={{
        height: '95vh',
        width: '80vw',
        border: '2px solid white',
      }}
      mt={2}
      container
    >
      <Grid
        md={4}
        style={{
          border: '2px solid white',
        }}
        item
      >
        <Left />
      </Grid>
      <Grid
        md={8}
        style={{
          border: '2px solid white',
        }}
        item
      ></Grid>
    </Grid>
  );
};

export default Home;
