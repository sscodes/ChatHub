import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import {
  Alert,
  Grid,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
} from '@mui/material';
import { User } from 'firebase/auth';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
};

interface stateType {
  chatId: string;
  user: userInfoType;
}

type userType = {
  currentUser: User | null;
};

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const ChatInput = () => {
  const [waitMessage, setWaitMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [imageMessage, setImageMessage] = useState<File | null | undefined>();

  const { data }: { data: stateType } = useContext(ChatContext);
  const { currentUser }: userType = useContext(AuthContext);

  useEffect(() => {
    if (imageMessage?.name || waitMessage) setImageOpen(true);
  }, [imageMessage, waitMessage]);

  const handleErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };

  const handleImageAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setImageOpen(false);
  };

  const sendMessage = async () => {
    if ((message.length > 0 || imageMessage) && currentUser?.uid) {
      if (imageMessage) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, imageMessage);
        setWaitMessage('Please wait a while for the image to get sent.');

        uploadTask
          .then(async (snapshot: UploadTaskSnapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: message,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          })
          .catch((error) => {
            setErrorOpen(true);
            setErrorMessage(error.code);
            console.log(error);
          });
      } else {
        try {
          await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: message,
              senderId: currentUser?.uid,
              date: Timestamp.now(),
            }),
          });
        } catch (error) {
          setErrorOpen(true);
          setErrorMessage(error.code);
          console.log(error);
        }
      }
    }

    if (!errorOpen) {
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: message.length
          ? message.substring(0, 7) + '...'
          : 'Image',
        [data.chatId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(db, 'userChats', currentUser?.uid || ''), {
        [data.chatId + '.lastMessage']: message.length
          ? message.substring(0, 7) + '...'
          : 'Image',
        [data.chatId + '.date']: serverTimestamp(),
      });
    }

    setMessage('');
    setImageMessage(null);
    setErrorOpen(false);
  };

  return (
    <>
      <TextField
        label={'Type your message...'}
        variant={'filled'}
        color={'warning'}
        style={{
          backgroundColor: '#dfab62',
          display: 'flex',
          borderRadius: '0 0 8px 0',
        }}
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setMessage(e.target.value)
        }
        InputProps={{
          endAdornment: (
            <Grid container spacing={2} width={100}>
              <Grid item>
                <input
                  accept='.png, .jpg, .jpeg'
                  style={{ display: 'none' }}
                  id='file-input'
                  type='file'
                  name='file'
                  onChange={(e) => setImageMessage(e.target.files?.[0])}
                />
                <label htmlFor='file-input' style={{ cursor: 'pointer' }}>
                  <AddPhotoAlternateIcon />
                </label>
              </Grid>
              <Grid item style={{ cursor: 'pointer' }} onClick={sendMessage}>
                <SendIcon />
              </Grid>
            </Grid>
          ),
        }}
      />
      <Snackbar
        open={imageOpen}
        autoHideDuration={5000}
        onClose={handleImageAlertClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleImageAlertClose}
          variant='filled'
          style={{ width: '100%', backgroundColor: 'orange', color: 'black' }}
        >
          {imageMessage?.name
            ? `Selected Image: ${imageMessage?.name}`
            : waitMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={handleErrorClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleErrorClose}
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

export default ChatInput;
