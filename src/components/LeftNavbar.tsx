import { Avatar, Grid, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import Title from './Title';
import { User } from 'firebase/auth';

type userType = {
  currentUser: User | null;
};
const LeftNavbar = () => {
  const { currentUser }: userType = useContext(AuthContext);

  useEffect(() => {
    const reloadCount: number = parseInt(
      sessionStorage.getItem('reloadCount') || '0'
    );
    if (reloadCount < 1) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);

  return (
    <Grid py={2} container>
      <Grid item xs={4} mt={0.4}>
        <Title />
      </Grid>
      <Grid item xs={8} display={'flex'} justifyContent={'end'} pr={2}>
        <Avatar src={currentUser.photoURL} style={{ width: 37, height: 37 }} />
        <Typography
          display={'flex'}
          alignItems={'center'}
          color={'warning.light'}
          ml={1}
          variant='h6'
        >
          {currentUser.displayName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LeftNavbar;
