import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './containers/ForgotPassword';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';

function App() {
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
