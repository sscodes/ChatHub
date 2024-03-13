import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { ChildrenProps } from '../types/types';

export const ProtectedRoute = ({ children }: ChildrenProps) => {
  // @ts-ignore
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to='/register' />;
  }

  return children;
};
