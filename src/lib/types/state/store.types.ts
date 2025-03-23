import { ChatState } from './chatSlice.types';

export interface RootState {
  chat: ChatState;
  [key: string]: any;
}

export type AppDispatch = any;
