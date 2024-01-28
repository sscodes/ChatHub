import { Avatar, Box, Dialog, Grid, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { User } from 'firebase/auth';
import { ChatContext } from '../context/chatContext';

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
  const [open, setOpen] = useState(false);

  const { currentUser }: userType = useContext(AuthContext);
  const { data }: { data: stateType } = useContext(ChatContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
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
            <Avatar
              src={data.user.photoURL}
              style={{ width: 45, height: 45 }}
            />
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
            <Avatar
              src={currentUser?.photoURL || ''}
              style={{ width: 45, height: 45 }}
            />
          </Grid>
        )}
      </Grid>
      <Box textAlign={'center'}>
        <Typography variant='subtitle2' color={'orange'}>
          {`${message.date.toDate().toLocaleDateString(undefined, options)}`}
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
