import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ReactElement, Ref, forwardRef, useContext, useState } from 'react';
import { ChatContext } from '../context/chatContext';
import { TransitionProps } from '@mui/material/transitions';
import { BorderColor } from '@mui/icons-material';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const RightNavbar = () => {
  const { data } = useContext(ChatContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            onClick={handleClickOpen}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <Box style={{ backgroundColor: 'orange' }}>
          <DialogTitle color={'black'}>{'Sign out, already?'}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id='alert-dialog-slide-description'
              color={'black'}
            >
              Are you sure, you want to sign out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant='contained'
              style={{ backgroundColor: 'black', color: 'orange' }}
            >
              No
            </Button>
            <Button
              onClick={() => signOut(auth)}
              variant='outlined'
              style={{ borderColor: 'black', color: 'black' }}
            >
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default RightNavbar;
