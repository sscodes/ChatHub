import BlockIcon from '@mui/icons-material/Block';
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
  useMediaQuery,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { User, signOut } from 'firebase/auth';
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
import { useTheme } from '@emotion/react';
import LogoutIcon from '@mui/icons-material/Logout';

type userType = {
  currentUser: User | null;
};

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
};

interface stateType {
  chatId: string;
  user: userInfoType;
  blocked: boolean;
  blocker: string;
}

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

  const theme = useTheme();
  // @ts-ignore
  const isSmallScreen = useMediaQuery(theme?.breakpoints.between('xs', 'md'));
  // @ts-ignore
  const isMediumScreen = useMediaQuery(theme?.breakpoints.between('md', 'xl'));

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
        await updateDoc(doc(db, 'userChats', data.user.uid), {
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
        await updateDoc(doc(db, 'userChats', data.user.uid), {
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
      <Grid py={2} borderBottom={2} borderColor={'orange'} container>
        <Grid item xs={8} pl={2}>
          <Box display={'flex'} alignContent={'center'}>
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
          </Box>
        </Grid>
        <Grid
          xs={4}
          item
          display={'flex'}
          justifyItems={'end'}
          alignItems={'center'}
        >
          <Grid container>
            <Grid item>
              {data?.user?.photoURL &&
                (block ? (
                  blocker && (
                    <>
                      {isMediumScreen && (
                        <Button
                          variant='contained'
                          color='success'
                          size='small'
                          onClick={blockUnblockUser}
                          style={{ marginRight: '1rem' }}
                        >
                          Unblock
                        </Button>
                      )}
                      {isSmallScreen && (
                        <IconButton color='success' onClick={blockUnblockUser}>
                          <BlockIcon />
                        </IconButton>
                      )}
                    </>
                  )
                ) : (
                  <>
                    {isMediumScreen && (
                      <Button
                        variant='contained'
                        color='error'
                        size='small'
                        onClick={blockUnblockUser}
                        style={{ marginRight: '1rem' }}
                      >
                        Block
                      </Button>
                    )}
                    {isSmallScreen && (
                      <IconButton color='error' onClick={blockUnblockUser}>
                        <BlockIcon />
                      </IconButton>
                    )}
                  </>
                ))}
            </Grid>
            <Grid item>
              {isMediumScreen && (
                <Button
                  variant='contained'
                  color='warning'
                  size='small'
                  onClick={handleClickOpen}
                >
                  {isMediumScreen && 'Logout'}
                </Button>
              )}
              {isSmallScreen && (
                <IconButton color='warning' onClick={handleClickOpen}>
                  <LogoutIcon />
                </IconButton>
              )}
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
              onClick={handleLogoutClose}
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
