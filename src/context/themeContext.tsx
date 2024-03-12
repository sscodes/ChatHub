import { createContext, useState } from 'react';
import { ContextProps } from '../types/types';

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  return (
    // @ts-ignore
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
