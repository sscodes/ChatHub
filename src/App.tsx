import { Route, Routes } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
