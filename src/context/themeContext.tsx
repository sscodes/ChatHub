import { createContext, useState } from 'react';
import { ChildrenProps } from '../types/types';

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }: ChildrenProps) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  return (
    // @ts-ignore
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
