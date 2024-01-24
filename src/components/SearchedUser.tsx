import { Box } from '@mui/material';
import { User } from 'firebase/auth';
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Dispatch, SetStateAction, useContext } from 'react';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import Inbox from './Inbox';

interface InboxType {
  image: string;
  username: string;
  user: User;
  setUsername: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<DocumentData | null | undefined>>;
}
type userType = {
  currentUser: User | null;
};

const SearchedUser = ({
  image,
  username,
  user,
  setUsername,
  setUser,
}: InboxType) => {
  const { currentUser }: userType = useContext(AuthContext);

  const handleSelect = async () => {
    const combinedId: string = currentUser?.uid + user.uid;
    const res: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(
      doc(db, 'chats', combinedId)
    );
    try {
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.username,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        setUsername('');
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box onClick={handleSelect}>
      <Inbox image={image} username={username} />
    </Box>
  );
};

export default SearchedUser;
