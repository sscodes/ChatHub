import { Box } from '@mui/material';
import Inbox from './Inbox';
import { User } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface InboxType {
  image: string;
  username: string;
  user: User;
}
type userType = {
  currentUser: User | null;
};

const SearchedUser = ({ image, username, user }: InboxType) => {
  const { currentUser }: userType = useContext(AuthContext);

  const handleSelect = async () => {
    const combinedId: string = currentUser?.uid + user.uid;
    const res: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(
      doc(db, 'chats', combinedId)
    );
    if (!res.exists()) {
      await setDoc(doc(db, 'chats', combinedId), { messages: [] });

      await updateDoc(doc(db, 'userChats', currentUser?.uid), {
        [combinedId + '.userInfo']: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + '.date']: serverTimestamp(),
      });
      
      await updateDoc(doc(db, 'userChats', user?.uid), {
        [combinedId + '.userInfo']: {
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
        },
        [combinedId + '.date']: serverTimestamp(),
      });
    }
  };

  return (
    <Box onClick={handleSelect}>
      <Inbox image={image} username={username} />
    </Box>
  );
};

export default SearchedUser;
