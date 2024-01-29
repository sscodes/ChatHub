import { Box, Grid, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import ChatInput from './ChatInput';
import Message from './Message';

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
};

interface stateType {
  chatId: string;
  user: userInfoType;
}

interface messageType {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
  image?: string;
}

type userType = {
  currentUser: User | null;
};

const Chat = ({ blockedProp }: { blockedProp: boolean }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(doc(db, 'chats', data?.chatId), (doc) => {
        if (doc.exists()) setMessages(doc.data().messages);
        return () => unsub();
      });
    };

    data?.chatId && fetchData();
  }, [data?.chatId]);

  return data?.user?.displayName ? (
    <>
      <Box
        height={'25rem'}
        display={'flex'}
        flexDirection={'column-reverse'}
        style={{ overflowY: 'auto' }}
      >
        <Grid container>
          {messages?.map((message) => (
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyItems={
                !(message.senderId === currentUser?.uid) ? 'start' : 'end'
              }
              py={1}
              key={message.id}
            >
              {message.senderId === currentUser?.uid && (
                <Grid item xs={6}></Grid>
              )}
              <Grid item xs={6}>
                <Message
                  message={message}
                  type={
                    message.senderId === currentUser?.uid ? 'user' : 'friend'
                  }
                />
              </Grid>
              {!(message.senderId === currentUser?.uid) && (
                <Grid item xs={6}></Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
      {data?.user?.displayName &&
        (blockedProp ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={'orange'}
            height={55}
          >
            <Typography>You can't communicate with them anymore.</Typography>
          </Box>
        ) : (
          <ChatInput />
        ))}
    </>
  ) : (
    <Box display={'flex'} justifyContent={'center'} marginTop={'25vh'}>
      <Box textAlign={'center'}>
        <Typography variant='h2' color={'orange'}>
          Welcome!
        </Typography>
        <Typography variant='h4' color={'orange'}>
          Click on a chat or search someone up to start messaging.
        </Typography>
      </Box>
    </Box>
  );
};

export default Chat;
