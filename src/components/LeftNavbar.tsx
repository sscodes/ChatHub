import { Avatar, Grid, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Title from './Title';

type userType = {
  currentUser: User | null;
};
const LeftNavbar = () => {
  const { currentUser }: userType = useContext(AuthContext);
  console.log(currentUser);

  return (
    <Grid py={2} container>
      <Grid item xs={4} mt={0.4}>
        <Title />
      </Grid>
      <Grid item xs={8} display={'flex'} justifyContent={'end'} pr={2}>
        <Avatar src={currentUser?.photoURL} style={{ width: 37, height: 37 }} />
        <Typography
          display={'flex'}
          alignItems={'center'}
          color={'warning.light'}
          ml={1}
          variant='h6'
        >
          {currentUser?.displayName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LeftNavbar;
