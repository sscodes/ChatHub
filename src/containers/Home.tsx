import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Left from '../components/Left';
import Right from '../components/Right';
import { AuthContext } from '../context/authContext';
import { Anchor } from '../types/types';
import { ThemeContext } from '../context/themeContext';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState({
    top: false,
  });

  const themeMUI = useTheme();
  const isSmallScreen = useMediaQuery(
    // @ts-ignore
    themeMUI?.breakpoints.between('xs', 'md')
  );

  // @ts-ignore
  const { theme } = useContext(ThemeContext);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  // @ts-ignore
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?.displayName === null) {
      setLoading(true);
      setTimeout(() => setLoading(false), 40000);
    }
  }, [currentUser?.displayName]);

  return loading ? (
    <Stack
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={2}
      height={'90vh'}
    >
      <Stack gap={5}>
        <Typography
          className={`${theme === 'light' ? 'colour-dark' : 'colour-light'}`}
          variant='h4'
          fontFamily={'Nunito Sans'}
          fontWeight={700}
        >
          Please wait while we get your account ready!
        </Typography>
        <Box display={'flex'} justifyContent={'center'}>
          <CircularProgress
            className={`${theme === 'light' ? 'colour-dark' : 'colour-light'}`}
          />
        </Box>
      </Stack>
    </Stack>
  ) : !isSmallScreen ? (
    <Box display={'grid'} justifyContent={'center'}>
      <Grid width={'80vw'} borderRadius={3} mt={2} container>
        <Grid md={4} item>
          <Left />
        </Grid>
        <Grid md={8} item>
          <Right />
        </Grid>
      </Grid>
    </Box>
  ) : (
    isSmallScreen && (
      <>
        <SwipeableDrawer
          anchor={'top'}
          open={state['top']}
          onClose={toggleDrawer('top', false)}
          onOpen={toggleDrawer('top', true)}
        >
          <Left />
          <Button
            variant='contained'
            style={{
              backgroundColor: 'blanchedalmond',
              color: 'indigo',
              paddingTop: '2%',
              paddingBottom: '2%',
            }}
            onClick={toggleDrawer('top', false)}
            startIcon={<CloseIcon />}
          >
            <Typography fontFamily={'Nunito Sans'}>
              <b>Close</b>
            </Typography>
          </Button>
        </SwipeableDrawer>
        <Box display={'flex'} justifyContent={'center'}>
          <Button
            variant='contained'
            style={{ backgroundColor: 'indigo', color: 'blanchedalmond' }}
            onClick={toggleDrawer('top', true)}
            startIcon={<SearchIcon />}
          >
            <Typography fontFamily={'Nunito Sans'}>
              <b>Search Users</b>
            </Typography>
          </Button>
        </Box>
        <Grid container>
          <Grid item xs={0.15}></Grid>
          <Grid item xs={11.7}>
            <Box border={4} borderColor={'indigo'} mt={2}>
              <Right />
            </Box>
          </Grid>
          <Grid item xs={0.15}></Grid>
        </Grid>
      </>
    )
  );
};

export default Home;
