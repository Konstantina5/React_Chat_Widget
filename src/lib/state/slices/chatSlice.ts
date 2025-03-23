import { createSlice } from '@reduxjs/toolkit';
import { ChatState } from '../../types/state/chatSlice.types';

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  isConnected: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: { },
});

export const { } = chatSlice.actions;

export default chatSlice.reducer;
