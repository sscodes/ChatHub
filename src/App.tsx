import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './containers/ForgotPassword';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './context/themeContext';

function App() {
  // @ts-ignore
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme-bg');
      document.body.classList.remove('dark-theme-bg');
    } else {
      document.body.classList.add('dark-theme-bg');
      document.body.classList.remove('light-theme-bg');
    }
  }, [theme]);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            // @ts-ignore
            <ProtectedRoute>
              {/* @ts-ignore */}
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            // @ts-ignore
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            // @ts-ignore
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            // @ts-ignore
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
