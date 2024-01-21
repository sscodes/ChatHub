import { ReactNode, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import { AuthContext } from './context/authContext';

type ContextProps = {
  children: ReactNode;
};

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({ children }: ContextProps) => {
    if (!currentUser) {
      return <Navigate to='/register' />;
    }

    return children;
  };

  const PublicRoute = ({ children }: ContextProps) => {
    if (currentUser) {
      return <Navigate to='/' />;
    }

    return children;
  };
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
