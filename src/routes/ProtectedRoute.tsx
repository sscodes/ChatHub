import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { ReactNode, useContext } from 'react';

type ContextProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ContextProps) => {
  // @ts-ignore
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to='/register' />;
  }

  return children;
};
