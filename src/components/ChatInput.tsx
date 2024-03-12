import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import {
  Alert,
  Box,
  Grid,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
} from '@mui/material';
import { AES } from 'crypto-js';
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
import { stateType, userType } from '../types/types';

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
  const [chatInputFocus, setChatInputFocus] = useState<boolean>(false);

  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);

  useEffect(() => {
    if (imageMessage?.name || waitMessage) setImageOpen(true);
  }, [imageMessage, waitMessage]);

  const handleErrorClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };

  const handleImageAlertClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setImageOpen(false);
  };

  const encodeText = (message: string): string => {
    return AES.encrypt(message, import.meta.env.VITE_CHAT_HUB_AES_KEY).toString();
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
                reaction: '',
              }),
            });
          })
          .catch((error) => {
            setErrorOpen(true);
            setErrorMessage(error.code);
          });
      } else {
        try {
          await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: encodeText(message),
              senderId: currentUser?.uid,
              date: Timestamp.now(),
              reaction: '',
            }),
          });
        } catch (error) {
          setErrorOpen(true);
          // @ts-ignore
          setErrorMessage(error.code);
        }
      }
    }

    if (!errorOpen && data.user?.uid) {
      await updateDoc(doc(db, 'userChats', data.user?.uid), {
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

  useEffect(() => {
    const handleEnterPressMessageSend = (event: any) => {
      if (event.key === 'Enter' && chatInputFocus && message.length > 0)
        sendMessage();
    };
    document.addEventListener('keydown', handleEnterPressMessageSend);

    return () => {
      document.removeEventListener('keydown', handleEnterPressMessageSend);
    };
  }, [chatInputFocus, message]);

  return (
    <Box borderBottom={2} borderRight={2} borderColor={'indigo'}>
      <TextField
        onFocus={() => setChatInputFocus(true)}
        onBlur={() => setChatInputFocus(false)}
        label={'Type your message...'}
        variant={'filled'}
        color={'secondary'}
        style={{
          backgroundColor: 'rgb(178, 182, 255)',
          display: 'flex',
        }}
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setMessage(e.target.value)
        }
        InputProps={{
          endAdornment: (
            <Grid container spacing={2} width={100}>
              <Grid item xs={6}>
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
              <Grid
                item
                xs={6}
                style={{ cursor: 'pointer' }}
                onClick={sendMessage}
              >
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
          style={{
            width: '100%',
            backgroundColor: 'rgb(178, 182, 255)',
            color: 'indigo',
          }}
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
    </Box>
  );
};

export default ChatInput;
