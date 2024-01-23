import { Alert, Slide, SlideProps, Snackbar, TextField } from '@mui/material';
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import Inboxes from './Inboxes';
import SearchedUser from './SearchedUser';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const Search = () => {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<DocumentData | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [enter, setEnter] = useState<boolean>(false);

  const usersRef = collection(db, 'users');

  useEffect(() => {
    if (username.length === 0) setUser(null);
  }, [username]);

  useEffect(() => {
    if (!user && username.length !== 0 && enter) {
      setOpen(true);
      setErrorMessage('Could not find the user');
    } else if (user || !enter) {
      setOpen(false);
    }
  }, [enter, user, username]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrorMessage('');
  };

  const handleSearch = async () => {
    setUser(null);
    setEnter(true);
    const q = query(usersRef, where('username', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setOpen(true);
      setErrorMessage(error.code);
    }
  };

  const handleKey = (e: { code: string }) => {
    e.code === 'Enter' && handleSearch();
  };

  return (
    <>
      <TextField
        label={'Find an user...'}
        variant={'filled'}
        color={'warning'}
        style={{
          backgroundColor: '#dfab62',
          display: 'flex',
          borderTop: '0.2rem solid orange',
          borderBottom: '0.2rem solid orange',
        }}
        onChange={(e) => {
          setUsername(e.target.value);
          setEnter(false);
        }}
        onKeyDown={handleKey}
      />
      {user ? (
        <SearchedUser image={user.photoURL} username={user.username} />
      ) : (
        <Inboxes />
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
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

export default Search;