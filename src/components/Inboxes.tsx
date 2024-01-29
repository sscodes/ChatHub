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

type inboxType = [
  string,
  {
    date: Timestamp;
    userInfo: userInfoType;
    lastMessage?: string;
    blocked?: boolean;
    blocker?: string;
  }
];

const Inboxes = () => {
  const [inboxesList, setInboxesList] = useState<inboxType[]>([]);
  const { currentUser }: userType = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);  

  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser?.uid || ''),
        (doc) => {
          if (doc.exists()) {
            setInboxesList(Object.entries(doc.data()));
          }
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
          .sort(
            (a: inboxType, b: inboxType) =>
              b[1].date?.toDate().getTime() - a[1].date?.toDate().getTime()
          )
          .map((user: inboxType) => (
            <Inbox
              onClick={() => handleSelect(user[1].userInfo)}
              image={user[1].userInfo.photoURL}
              username={user[1].userInfo.displayName}
              key={user[1].userInfo.uid}
              chat={user[1].lastMessage}
              date={user[1].date}
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
