import { ThemeProvider, createTheme } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthContextProvider } from './context/authContext.tsx';
import { ChatContextProvider } from './context/chatContext.tsx';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
