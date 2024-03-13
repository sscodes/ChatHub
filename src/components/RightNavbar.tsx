import { useTheme } from '@emotion/react';
import BlockIcon from '@mui/icons-material/Block';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Alert,
  Avatar,
  Box,
  Button,
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
import { signOut } from 'firebase/auth';
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import Modals from '../HOC/Modals';
import { auth, db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { ThemeContext } from '../context/themeContext';
import { stateType, userType } from '../types/types';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

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
  // @ts-ignore
  const { theme, setTheme } = useContext(ThemeContext);

  const themeMUI = useTheme();
  const isSmallScreen = useMediaQuery(
    // @ts-ignore
    themeMUI?.breakpoints.between('xs', 'sm')
  );

  const handleThemeChange = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

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
        <Grid item xs={6} sm={6} lg={7} pl={2} pt={2.5}>
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
          lg={5}
          item
          display={'flex'}
          justifyItems={'end'}
          alignItems={'center'}
          pt={0.5}
        >
          <Grid container>
            <Grid
              item
              sm={5}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'end'}
            >
              {data?.user?.photoURL &&
                (block ? (
                  blocker && (
                    <>
                      {!isSmallScreen && (
                        <Button
                          variant='contained'
                          color='success'
                          size='small'
                          onClick={blockUnblockUser}
                          style={{ marginRight: '1rem' }}
                        >
                          <Typography fontFamily={'Nunito Sans'}>
                            <b>Unblock</b>
                          </Typography>
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
                    {!isSmallScreen && (
                      <Button
                        variant='contained'
                        color='error'
                        size='small'
                        onClick={blockUnblockUser}
                        style={{ marginRight: '1rem' }}
                      >
                        <Typography fontFamily={'Nunito Sans'}>
                          <b>Block</b>
                        </Typography>
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
            <Grid
              item
              sm={4}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {!isSmallScreen && (
                <Button
                  variant='contained'
                  style={{ backgroundColor: 'indigo' }}
                  size='small'
                  onClick={handleClickOpen}
                >
                  <Typography fontFamily={'Nunito Sans'}>
                    <b>{!isSmallScreen && 'Logout'}</b>
                  </Typography>
                </Button>
              )}
              {isSmallScreen && (
                <IconButton
                  style={{ color: 'indigo' }}
                  onClick={handleClickOpen}
                >
                  <LogoutIcon />
                </IconButton>
              )}
            </Grid>
            <Grid
              item
              sm={2}
              display={'flex'}
              alignItems={'center'}
              style={{ paddingLeft: isSmallScreen ? '0rem' : '0.5rem' }}
            >
              <IconButton
                style={{ color: 'indigo' }}
                onClick={handleThemeChange}
              >
                {theme !== 'light' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modals open={logoutOpen}>
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
      </Modals>
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
