import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { ChatContext } from '../context/chatContext';
import Chat from './Chat';
import RightNavbar from './RightNavbar';

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
};
interface stateType {
  chatId: string;
  user: userInfoType;
}

type userType = {
  currentUser: User | null;
};

const Right = () => {
  const [blockedProp, setBlockedProp] = useState<boolean>(false);

  const { currentUser }: userType = useContext(AuthContext);
  const { data }: { data: stateType } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser?.uid || ''),
        (doc) => {
          if (doc.exists()) {
            if (doc.data()[data.chatId].blocked) setBlockedProp(true);
            else setBlockedProp(false);
          }
          return () => unsub();
        }
      );
    };
    currentUser?.uid && data.chatId && fetchData();
  }, [currentUser?.uid, data.chatId]);
  return (
    <>
      <RightNavbar />
      <Chat blockedProp={blockedProp} />
    </>
  );
};

export default Right;
