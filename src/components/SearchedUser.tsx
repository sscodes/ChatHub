import { Alert, Box, Slide, SlideProps, Snackbar } from '@mui/material';
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useContext, useState } from 'react';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { InboxType, userType } from '../types/types';
import Inbox from './Inbox';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const SearchedUser = ({
  image,
  username,
  user,
  setUsername = () => {},
  setUser = () => {},
}: InboxType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
  const { dispatch } = useContext(ChatContext);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrorMessage('');
  };

  const handleSelect = async () => {
    const combinedId: string =
      currentUser?.uid + '' > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;
    const res: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(
      doc(db, 'chats', combinedId)
    );
    try {
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser?.uid || ''), {
          [combinedId + '.userInfo']: {
            uid: user?.uid,
            displayName: user?.username,
            photoURL: user?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user?.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        setUsername('');
        setUser(null);
        dispatch({
          type: 'CHANGE_USER',
          payload: {
            uid: user?.uid,
            displayName: user?.username,
            photoURL: user?.photoURL,
          },
        });
      }
    } catch (error) {
      setOpen(true);
      // @ts-ignore
      setErrorMessage(error.code);
    }
  };

  return (
    <>
      <Box style={{ height: '24.7rem', overflowY: 'auto' }}>
        <Inbox
          image={image}
          username={username}
          onClick={() => handleSelect()}
        />
      </Box>
      <Snackbar
        open={open}
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

export default SearchedUser;
