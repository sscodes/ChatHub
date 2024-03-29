import {
  Avatar,
  Box,
  CircularProgress,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import Modals from '../HOC/Modals';
import Images from '../config/images';
import { AuthContext } from '../context/authContext';
import { userType } from '../types/types';
import Profile from './Profile';

const LeftNavbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);

  return (
    <>
      <Grid py={2} container height={75}>
        <Grid item xs={0.5} mt={0.4}></Grid>
        <Grid item xs={3.5} mt={0.4}>
          <Box display={'flex'} justifyContent={'center'}>
            <img src={Images.LogoLight} alt='logo' width={95} />
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
          style={{ cursor: 'pointer' }}
          onClick={handleOpen}
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
      <Modals open={open}>
        <DialogContent>
          <Profile />
        </DialogContent>
      </Modals>
    </>
  );
};

export default LeftNavbar;
