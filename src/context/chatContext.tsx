import { ReactNode, createContext, useContext, useReducer } from 'react';
import { AuthContext, AuthContextType } from './authContext';

type ContextProps = {
  children: ReactNode;
};

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
} | null;

interface stateType {
  chatId: string;
  user: userInfoType;
}

export const ChatContext = createContext<stateType | null>(null);

export const ChatContextProvider = ({ children }: ContextProps) => {
  // @ts-ignore
  const { currentUser }: AuthContextType | null = useContext(AuthContext);
  console.log(currentUser);

  const INITIAL_STATE = {
    chatId: '',
    user: null,
  };

  const chatReducer = (
    state: stateType,
    action: { type: string; payload: userInfoType }
  ) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser?.uid + '' > action?.payload?.uid + ''
              ? currentUser?.uid + '' + action?.payload?.uid + ''
              : action?.payload?.uid + '' + currentUser?.uid + '',
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    // @ts-ignore
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
