import { User, onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export type AuthContextType = {
  currentUser: User | null;
};
export const AuthContext = createContext<AuthContextType | null>(null);

type ContextProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
