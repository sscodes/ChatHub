import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { User } from 'firebase/auth';
import { ChatContext } from '../context/chatContext';
import { useTheme } from '@emotion/react';

interface messageType {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
  image?: string;
}
interface messagePropType {
  message: messageType;
  type: string;
}

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
}

const Message = ({ message, type }: messagePropType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);

  const theme = useTheme();
  // @ts-ignore
  const isSmallScreen = useMediaQuery(theme?.breakpoints.between('xs', 'md'));
  // @ts-ignore
  const isMediumScreen = useMediaQuery(theme?.breakpoints.between('md', 'xl'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container>
        {type === 'friend' && (
          <Grid
            item
            xs={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {isMediumScreen && (
              <Avatar
                src={data.user.photoURL}
                style={{ width: 45, height: 45 }}
              />
            )}
            {isSmallScreen && (
              <Avatar
                src={data.user.photoURL}
                style={{ width: 25, height: 25 }}
              />
            )}
          </Grid>
        )}
        <Grid item xs={9}>
          {message.text && (
            <Box
              border={2}
              borderColor={'orange'}
              borderRadius={
                type === 'user' ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'
              }
              bgcolor={type === 'user' ? 'warning.light' : 'black'}
              color={type === 'user' ? 'black' : 'warning.light'}
              p={1}
            >
              {message.text}
            </Box>
          )}
          <Box>
            {message.image && (
              <>
                {imageLoading && <CircularProgress color='warning' />}
                <img
                  src={message?.image}
                  alt=''
                  style={{
                    width: '100%',
                    marginTop: '4%',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                  }}
                  onClick={handleClickOpen}
                  onLoad={() => setImageLoading(false)}
                />
              </>
            )}
          </Box>
        </Grid>
        {type === 'user' && (
          <Grid
            item
            xs={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {isMediumScreen && (
              <Avatar
                src={currentUser?.photoURL + ''}
                style={{ width: 45, height: 45 }}
              />
            )}
            {isSmallScreen && (
              <Avatar
                src={currentUser?.photoURL + ''}
                style={{ width: 25, height: 25 }}
              />
            )}
          </Grid>
        )}
      </Grid>
      <Box textAlign={'center'}>
        <Typography variant='subtitle2' color={'orange'}>
          {`${message.date.toDate().toLocaleDateString('en-IN')}`}
        </Typography>
      </Box>
      <Dialog onClose={handleClose} open={open} fullWidth={true}>
        <img
          src={message?.image}
          alt=''
          style={{
            cursor: 'pointer',
          }}
        />
      </Dialog>
    </>
  );
};

export default Message;
