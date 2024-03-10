import { Box, Grid, Typography } from '@mui/material';
import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { messageType, stateType, userType } from '../types/types';
import ChatInput from './ChatInput';
import Message from './Message';
import EncryptionMessage from './EncryptionMessage';

const Chat = ({ blockedProp }: { blockedProp: boolean }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [chatStarted, setChatStarted] = useState<boolean>(false);
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = () => {
      const unsub: any = onSnapshot(doc(db, 'chats', data?.chatId), (doc) => {
        if (doc.exists()) setMessages(doc.data().messages);
        return () => unsub();
      });
    };

    data?.chatId && fetchData();
  }, [data?.chatId]);

  useEffect(() => {
    if (messages.length) setChatStarted(true);
    else setChatStarted(false);
  }, [messages]);

  return data?.user?.displayName ? (
    <>
      <Box
        height={'24.55rem'}
        display={'flex'}
        flexDirection={'column-reverse'}
        style={{ overflowY: 'auto' }}
        borderRight={2}
        borderColor={'indigo'}
        position={'relative'}
      >
        {!chatStarted && (
          <div style={{ display: 'flex', justifyContent: ' center' }}>
            <EncryptionMessage />
          </div>
        )}

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
            bgcolor={'rgb(178, 182, 255)'}
            height={56}
            borderBottom={2}
            borderRight={2}
            borderColor={'indigo'}
          >
            <Typography color={'indigo'} fontFamily={'Nunito Sans'}>
              You can't communicate with them anymore.
            </Typography>
          </Box>
        ) : (
          <ChatInput />
        ))}
    </>
  ) : (
    <Box
      display={'flex'}
      justifyContent={'center'}
      height={'28.05rem'}
      borderBottom={2}
      borderRight={2}
      borderColor={'indigo'}
    >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box textAlign={'center'}>
          <Typography
            variant='h2'
            color={'indigo'}
            fontFamily={'Nunito Sans'}
            fontWeight={700}
          >
            Welcome!
          </Typography>
          <Typography
            variant='h4'
            color={'indigo'}
            fontFamily={'Nunito Sans'}
            fontWeight={700}
          >
            Click on a chat or search someone up to start messaging.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
