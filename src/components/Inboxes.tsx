import { Box, CircularProgress } from '@mui/material';
import Inbox from './Inbox';
import { useContext, useEffect, useState } from 'react';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { User } from 'firebase/auth';
import { ChatContext } from '../context/chatContext';

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
};

type userType = {
  currentUser: User | null;
};

type inboxType = {
  date: Timestamp;
  userInfo: userInfoType;
  lastMessage?: string;
};

const Inboxes = () => {
  const [inboxesList, setInboxesList] = useState<inboxType[]>([]);
  const { currentUser }: userType = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser?.uid || ''),
        (doc) => {
          if (doc.exists())
            setInboxesList([...inboxesList, Object.entries(doc.data())[0][1]]);
          return () => unsub();
        }
      );
    };

    currentUser?.uid && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  const handleSelect = (payload: userInfoType) => {
    dispatch({ type: 'CHANGE_USER', payload: payload });
  };

  return (
    <Box style={{ height: '24.7rem', overflowY: 'auto' }}>
      {inboxesList?.length ? (
        inboxesList
          // .sort(
          //   (a: inboxType, b: inboxType) =>
          //     b.date - a.date
          // )
          .map((user: inboxType) => (
            <Inbox
              onClick={() => handleSelect(user.userInfo)}
              image={user.userInfo.photoURL}
              username={user.userInfo.displayName}
              key={user.userInfo.uid}
              chat={user.lastMessage}
              date={user.date}
            />
          ))
      ) : (
        <Box display={'flex'} justifyContent={'center'} mt={2}>
          <CircularProgress color='warning' />
        </Box>
      )}
    </Box>
  );
};

export default Inboxes;
