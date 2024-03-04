import { VideoCall } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { signOut } from 'firebase/auth';
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  ReactElement,
  Ref,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { stateType, userType } from '../types/types';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const RightNavbar = () => {
  const [block, setBlock] = useState<boolean>(false);
  const [blocker, setBlocker] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(
        doc(db, 'userChats', currentUser?.uid + '')
      );

      if (res.exists() && res?.data()[data.chatId]?.blocked) {
        setBlock(true);
      } else {
        setBlock(false);
      }
      if (
        res.exists() &&
        res?.data()[data.chatId]?.blocker === currentUser?.uid
      ) {
        setBlocker(true);
      } else {
        setBlocker(false);
      }
    };

    currentUser?.uid && fetchUser();
  }, [currentUser?.uid, data?.user?.uid]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
    setErrorMessage('');
  };

  const handleClickOpen = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const blockUnblockUser = async () => {
    try {
      const res: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(
        doc(db, 'userChats', currentUser?.uid || '')
      );
      if (res.exists() && res.data()[data.chatId]?.blocked) {
        await updateDoc(doc(db, 'userChats', currentUser?.uid || ''), {
          [data.chatId + '.blocked']: false,
          [data.chatId + '.blocker']: '',
        });
        // @ts-ignore
        await updateDoc(doc(db, 'userChats', data.user?.uid), {
          [data.chatId + '.blocked']: false,
          [data.chatId + '.blocker']: '',
        });
        setBlock(false);
        setBlocker(false);
      } else {
        await updateDoc(doc(db, 'userChats', currentUser?.uid || ''), {
          [data.chatId + '.blocked']: true,
          [data.chatId + '.blocker']: currentUser?.uid || '',
        });
        // @ts-ignore
        await updateDoc(doc(db, 'userChats', data.user?.uid), {
          [data.chatId + '.blocked']: true,
          [data.chatId + '.blocker']: currentUser?.uid || '',
        });
        setBlock(true);
        setBlocker(true);
      }
    } catch (error) {
      setErrorOpen(true);
      // @ts-ignore
      setErrorMessage(error.code);
    }
  };

  return (
    <>
      <Grid
        borderTop={2}
        borderRight={2}
        borderColor={'indigo'}
        bgcolor={'rgb(178, 182, 255)'}
        height={75}
        container
      >
        <Grid item xs={6} sm={6} lg={9} pl={2} pt={2.5}>
          <Box display={'flex'} alignContent={'center'}>
            {data?.user?.photoURL && (
              <Avatar
                src={data.user.photoURL}
                style={{ backgroundColor: 'indigo', width: 37, height: 37 }}
              />
            )}
            <Typography
              display={'flex'}
              alignItems={'center'}
              color={'indigo'}
              ml={1}
              variant='h6'
              fontFamily={'Nunito Sans'}
              fontWeight={700}
            >
              {data?.user?.displayName}
            </Typography>
          </Box>
        </Grid>
        <Grid
          xs={6}
          sm={6}
          lg={3}
          item
          display={'flex'}
          justifyItems={'end'}
          alignItems={'center'}
          pt={0.5}
        >
          <Grid container alignItems={'center'} gap={1}>
            <Grid item>
              {data?.user?.photoURL && (
                <a
                  target='_blank'
                  href={`http://localhost:5173/vc/${data.user?.displayName}/${data.chatId}`}
                >
                  <IconButton style={{ color: 'indigo' }} onClick={() => {}}>
                    <VideoCall />
                  </IconButton>
                </a>
              )}
            </Grid>
            <Grid item>
              {data?.user?.photoURL &&
                (block ? (
                  blocker && (
                    <IconButton color='success' onClick={blockUnblockUser}>
                      <BlockIcon />
                    </IconButton>
                  )
                ) : (
                  <IconButton color='error' onClick={blockUnblockUser}>
                    <BlockIcon />
                  </IconButton>
                ))}
            </Grid>
            <Grid item>
              <IconButton style={{ color: 'indigo' }} onClick={handleClickOpen}>
                <LogoutIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={logoutOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <Box style={{ backgroundColor: 'indigo' }}>
          <DialogTitle
            color={'blanchedalmond'}
            fontFamily={'Nunito Sans'}
            fontWeight={400}
          >
            Sign out, already?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id='alert-dialog-slide-description'
              color={'blanchedalmond'}
              fontFamily={'Nunito Sans'}
              fontWeight={400}
            >
              Are you sure, you want to sign out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleLogoutClose}
              variant='contained'
              style={{ backgroundColor: 'blanchedalmond', color: 'indigo' }}
            >
              <Typography fontFamily={'Nunito Sans'} fontWeight={400}>
                No
              </Typography>
            </Button>
            <Button
              onClick={() => signOut(auth)}
              variant='outlined'
              style={{ borderColor: 'blanchedalmond', color: 'blanchedalmond' }}
            >
              <Typography fontFamily={'Nunito Sans'} fontWeight={400}>
                Yes
              </Typography>
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          style={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RightNavbar;
