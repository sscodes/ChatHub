import Chat from './Chat';
import ChatInput from './ChatInput';
import RightNavbar from './RightNavbar';
import { useContext } from 'react';
import { ChatContext } from '../context/chatContext';

const Right = () => {
  const { data } = useContext(ChatContext);
  return (
    <>
      <RightNavbar />
      <Chat />
      {data?.user?.displayName && <ChatInput />}
    </>
  );
};

export default Right;
