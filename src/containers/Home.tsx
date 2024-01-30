import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Left from '../components/Left';
import Right from '../components/Right';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // @ts-ignore
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {  
    if (currentUser?.displayName === null) {
      setLoading(true);
      setTimeout(() => setLoading(false), 40000);
    }
  }, [currentUser?.displayName]);

  return loading ? (
    <Stack position={'absolute'} top={'30%'} left={'25%'} spacing={2}>
      <Typography color={'orange'} variant='h4'>
        Please wait while we get your account ready!
      </Typography>
      <Box display={'flex'} justifyContent={'center'}>
        <CircularProgress color='warning' />
      </Box>
    </Stack>
  ) : (
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
