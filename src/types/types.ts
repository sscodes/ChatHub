import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
} from '@mui/material';
import { User } from 'firebase/auth';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';

export type valuesTypes = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  file?: File | null;
};

export type Anchor = 'top';

export type AuthContextType = {
  currentUser: User | null;
};

export type ContextProps = {
  children: ReactNode;
};

export type userInfoType = {
  displayName: string;
  photoURL: string;
  uid: string;
} | null;

export type stateType = {
  chatId: string;
  user: userInfoType;
  blocked?: boolean;
  blocker?: string;
};

export type messageType = {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
  image?: string;
  reaction: string;
};

export type userType = {
  currentUser: User | null;
};

export type InboxType = {
  image: string;
  username: string;
  chat?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  date?: Timestamp;
  user?: DocumentData;
  setUsername?: Dispatch<SetStateAction<string>>;
  setUser?: Dispatch<SetStateAction<DocumentData | null | undefined>>;
};

export type inboxesType = [
  string,
  {
    date: Timestamp;
    userInfo: userInfoType;
    lastMessage?: string;
    blocked?: boolean;
    blocker?: string;
  }
];

export type InputPropTypes = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type: string;
  name: string;
  value?: string;
  error?: boolean;
  helperText?: ReactNode;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>
    | undefined;
  forgotPassword?: boolean;
};
