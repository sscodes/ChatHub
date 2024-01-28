import { ReactNode, createContext, useContext, useReducer } from 'react';
import { AuthContext } from './authContext';

type ContextProps = {
  children: ReactNode;
};

type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
};

interface stateType {
  chatId: string;
  user: userInfoType;
}

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }: ContextProps) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
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
            currentUser.uid+'' > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state as stateType, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
