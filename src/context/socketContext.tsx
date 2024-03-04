import { createContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { ContextProps } from '../types/types';

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }: ContextProps) => {
  const socket = useMemo(() => io('localhost:8000'), []);

  return (
    // @ts-ignore
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
