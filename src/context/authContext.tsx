import { User, onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export const AuthContext = createContext<User | null>(null);

type ContextProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
