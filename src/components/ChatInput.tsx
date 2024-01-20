import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment, TextField } from '@mui/material';

const ChatInput = () => {
  return (
    <TextField
      label={'Type your message...'}
      variant={'filled'}
      color={'warning'}
      style={{
        backgroundColor: '#dfab62',
        display: 'flex',
        borderRadius: '0 0 8px 0'
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <div>
              <AddPhotoAlternateIcon />
            </div>
            <div>
              <AttachFileIcon />
            </div>
            <div>
              <SendIcon />
            </div>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ChatInput;
