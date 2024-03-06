import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const EncryptionMessage = () => {
  return (
    <Box
      border={2}
      position={'absolute'}
      top={'1rem'}
      borderColor={'indigo'}
      borderRadius={'25px'}
      padding={2}
      width={400}
    >
      <Typography
        variant='subtitle1'
        textAlign={'center'}
        color={'indigo'}
        fontFamily={'Nunito Sans'}
      >
        Chat with confidence. Our end-to-end encryption ensures your messages
        stay private.
      </Typography>
    </Box>
  );
};

export default EncryptionMessage;
