import { Box, CircularProgress } from '@mui/material';
import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { inboxesType, userInfoType, userType } from '../types/types';
import Inbox from './Inbox';

const Inboxes = () => {
  const [inboxesList, setInboxesList] = useState<inboxesType[]>([]);
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
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
            (a: inboxesType, b: inboxesType) =>
              b[1].date?.toDate().getTime() - a[1].date?.toDate().getTime()
          )
          .map(
            (user: inboxesType) =>
              user[1]?.userInfo?.photoURL && (
                <Inbox
                  onClick={() => handleSelect(user[1].userInfo)}
                  image={user[1]?.userInfo?.photoURL}
                  username={user[1]?.userInfo?.displayName}
                  key={user[1]?.userInfo?.uid}
                  chat={user[1].lastMessage}
                  date={user[1].date}
                />
              )
          )
      ) : (
        <Box display={'flex'} justifyContent={'center'} mt={2}>
          <CircularProgress color='secondary' />
        </Box>
      )}
    </Box>
  );
};

export default Inboxes;
