import { Box } from '@mui/material';
import Inbox from './Inbox';

type userType = {
  image: string;
  username: string;
};

const Inboxes = () => {
  return (
    <Box style={{ height: '24.7rem', overflowY: 'auto' }}>
      {[
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
        {
          image: '../../Sanket-Photo.jpeg',
          username: 'username',
        },
      ].map((user: userType) => (
        <Inbox image={user.image} username={user.username} />
      ))}
    </Box>
  );
};

export default Inboxes;
