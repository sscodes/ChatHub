import { useTheme } from '@emotion/react';
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { messageType, stateType, userType } from '../types/types';

interface messagePropType {
  message: messageType;
  type: string;
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
                src={data.user?.photoURL}
                style={{ width: 45, height: 45 }}
              />
            )}
            {isSmallScreen && (
              <Avatar
                src={data.user?.photoURL}
                style={{ width: 25, height: 25 }}
              />
            )}
          </Grid>
        )}
        <Grid item xs={9}>
          {message.text && (
            <Box
              border={2}
              borderColor={'indigo'}
              borderRadius={
                type === 'user' ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'
              }
              bgcolor={type === 'user' ? 'indigo' : 'rgb(178, 182, 255)'}
              color={type === 'user' ? 'blanchedalmond' : 'indigo'}
              p={1}
            >
              <Typography fontFamily={'Nunito Sans'}>{message.text}</Typography>
            </Box>
          )}
          <Box>
            {message.image && (
              <>
                {imageLoading && <CircularProgress color='secondary' />}
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
        <Typography
          variant='subtitle2'
          color={'indigo'}
          fontFamily={'Nunito Sans'}
        >
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
