import { Avatar, Button, Grid, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useContext } from 'react';
import { ChatContext } from '../context/chatContext';

const RightNavbar = () => {
  const { data } = useContext(ChatContext);

  return (
    <Grid py={2} borderBottom={2} borderColor={'orange'} container>
      <Grid item xs={10} display={'flex'} pl={2}>
        {data?.user?.photoURL && (
          <Avatar
            src={data.user.photoURL}
            style={{ backgroundColor: 'orange', width: 37, height: 37 }}
          />
        )}
        <Typography
          display={'flex'}
          alignItems={'center'}
          color={'warning.light'}
          ml={1}
          variant='h6'
        >
          {data?.user?.displayName}
        </Typography>
      </Grid>
      <Grid
        xs={2}
        item
        display={'flex'}
        justifyItems={'end'}
        alignItems={'center'}
      >
        <Button
          variant='contained'
          color='warning'
          size='small'
          onClick={() => signOut(auth)}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default RightNavbar;
