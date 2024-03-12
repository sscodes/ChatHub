import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, Typography } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { db } from '../config/firebase';
import { messageType, stateType } from '../types/types';
import { ChatContext } from '../context/chatContext';

const ReactionPanel = ({
  message,
  messages,
  setClickMessage,
}: {
  message: messageType;
  messages: messageType[];
  setClickMessage: Dispatch<SetStateAction<string>>;
}) => {
  const [emoji, setEmoji] = useState(message.reaction);
  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);

  const emojiList = [
    '&#128514;',
    '&#128561;',
    '&#128545;',
    '&#128525;',
    '&#128557;',
    '&#128559;',
  ];

  const changeEmoji = async (e: string): Promise<void> => {
    let msgIndex = messages.findIndex((msg: any) => msg.id === message.id);

    if (emoji === e) {
      setEmoji('');
      let msg = [...messages];
      msg[msgIndex].reaction = '';
      await updateDoc(doc(db, 'chats', data?.chatId), { messages: [...msg] });
    } else {
      setEmoji(e);
      let msg = [...messages];
      msg[msgIndex].reaction = e;
      await updateDoc(doc(db, 'chats', data?.chatId), { messages: [...msg] });
    }
    setClickMessage('');
  };
  return (
    <Grid
      container
      alignItems={'center'}
      border={2}
      borderColor={'indigo'}
      borderRadius={'25px'}
      width={'74%'}
      height={'2.4rem'}
      position={'relative'}
    >
      {emojiList.map((e) => (
        <Grid item xs={2} display={'flex'} justifyContent={'center'} key={e}>
          <Typography
            className='emoji'
            onClick={() => changeEmoji(e)}
            dangerouslySetInnerHTML={{ __html: e }}
          />
        </Grid>
      ))}
      <Box position={'absolute'} top={-4} right={0}>
        <CloseIcon
          style={{
            fontSize: '0.8rem',
            backgroundColor: 'gray',
            color: 'white',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={() => setClickMessage('')}
        />
      </Box>
    </Grid>
  );
};

export default ReactionPanel;
