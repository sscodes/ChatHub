import { Avatar, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

type userType = {
  currentUser: User | null;
};
const LeftNavbar = () => {
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);

  return (
    <Grid py={2} container height={75}>
      <Grid item xs={0.5} mt={0.4}></Grid>
      <Grid item xs={3.5} mt={0.4}>
        <Box display={'flex'} justifyContent={'center'}>
          <img
            src='src/assets/LogoLight.svg'
            alt='logo'
            width={95}
          />
        </Box>
      </Grid>

      <Grid
        item
        xs={8}
        display={'flex'}
        justifyContent={'end'}
        alignItems={'center'}
        pr={2}
        mt={0.4}
      >
        {currentUser?.photoURL ? (
          <>
            <Avatar
              src={currentUser?.photoURL}
              style={{ width: 37, height: 37 }}
            />
            <Typography
              display={'flex'}
              alignItems={'center'}
              color={'blanchedalmond'}
              ml={1}
              variant='h6'
              fontFamily={'lato'}
              fontWeight={700}
            >
              {currentUser?.displayName}
            </Typography>
          </>
        ) : (
          <CircularProgress color='secondary' />
        )}
      </Grid>
    </Grid>
  );
};

export default LeftNavbar;
