import { useTheme } from '@emotion/react';
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { AES, enc } from 'crypto-js';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { popularTLDs } from '../config/constants';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import { messageType, stateType, userType } from '../types/types';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from '../context/themeContext';

interface messagePropType {
  message: messageType;
  type: string;
  setClickMessage: Dispatch<SetStateAction<string>>;
}

const Message = ({ message, type, setClickMessage }: messagePropType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);
  // @ts-ignore
  const { theme } = useContext(ThemeContext);

  const themeMUI = useTheme();
  // @ts-ignore
  const isSmallScreen = useMediaQuery(themeMUI?.breakpoints.between('xs', 'md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkForLinks = (msg: string): string => {
    let arrStr = msg.split(' ');
    for (let substr of arrStr) {
      for (let tld of popularTLDs) {
        if (substr.includes(tld)) {
          arrStr[
            arrStr.indexOf(substr)
          ] = `<a target='_blank' href='https://${substr}'>${substr}</a>`;
          break;
        }
      }
    }
    return arrStr.join(' ');
  };

  const decodeMessage = (message: string): string => {
    const byteStream = AES.decrypt(message, import.meta.env.VITE_CHAT_HUB_AES_KEY);
    return checkForLinks(byteStream.toString(enc.Utf8));
  };

  return (
    <>
      <Grid container style={{ cursor: 'pointer' }}>
        {type === 'friend' && (
          <Grid
            item
            xs={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {!isSmallScreen && (
              <Avatar
                src={data.user?.photoURL}
                style={{ width: 45, height: 45 }}
              />
            )}
            {isSmallScreen && (
              <Avatar
                src={data.user?.photoURL}
                style={{ width: 25, height: 25 }}
              />
            )}
          </Grid>
        )}
        <Grid item xs={9}>
          {message.text && (
            <Box
              border={2}
              borderColor={'indigo'}
              borderRadius={
                type === 'user' ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'
              }
              bgcolor={type === 'user' ? 'indigo' : 'rgb(178, 182, 255)'}
              color={type === 'user' ? 'blanchedalmond' : 'indigo'}
              p={1}
              position={'relative'}
            >
              <Typography fontFamily={'Nunito Sans'}>
                {decodeMessage(message.text)
                  .split(/(<a.*?>.*?<\/a>)/)
                  .map((segment, index) =>
                    segment.startsWith('<a') ? (
                      <span
                        key={index}
                        dangerouslySetInnerHTML={{ __html: segment }}
                      />
                    ) : (
                      <span key={index}>{segment}</span>
                    )
                  )}
              </Typography>
              {message.reaction?.length > 0 ? (
                <Box position={'absolute'} bottom={-10} right={0}>
                  <Typography
                    style={{
                      fontSize: '1.4rem',
                      cursor: 'pointer',
                    }}
                    dangerouslySetInnerHTML={{ __html: message.reaction }}
                    onClick={() => setClickMessage(message.id)}
                  />
                </Box>
              ) : (
                message.senderId !== currentUser?.uid && (
                  <Box position={'absolute'} bottom={-10} right={0}>
                    <AddIcon
                      style={{
                        fontSize: '1.4rem',
                        backgroundColor: 'gray',
                        color: 'white',
                        borderRadius: '50%',
                        cursor: 'pointer',
                      }}
                      onClick={() => setClickMessage(message.id)}
                    />
                  </Box>
                )
              )}
            </Box>
          )}
          <Box>
            {message.image && (
              <>
                {imageLoading && <CircularProgress color='secondary' />}
                <img
                  src={message?.image}
                  alt=''
                  style={{
                    width: '100%',
                    marginTop: '4%',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                  }}
                  onClick={handleClickOpen}
                  onLoad={() => setImageLoading(false)}
                />
              </>
            )}
          </Box>
        </Grid>
        {type === 'user' && (
          <Grid
            item
            xs={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {!isSmallScreen && (
              <Avatar
                src={currentUser?.photoURL + ''}
                style={{ width: 45, height: 45 }}
              />
            )}
            {isSmallScreen && (
              <Avatar
                src={currentUser?.photoURL + ''}
                style={{ width: 25, height: 25 }}
              />
            )}
          </Grid>
        )}
      </Grid>
      <Box textAlign={'center'}>
        <Typography
          style={{ fontSize: '0.74rem' }}
          className={`${theme === 'light' ? 'colour-dark' : 'colour-light'}`}
          fontFamily={'Nunito Sans'}
        >
          {`${message.date.toDate().toLocaleDateString('en-IN')}`}
        </Typography>
      </Box>
      <Dialog onClose={handleClose} open={open} fullWidth={true}>
        <img
          src={message?.image}
          alt=''
          style={{
            cursor: 'pointer',
          }}
        />
      </Dialog>
    </>
  );
};

export default Message;
