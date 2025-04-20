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
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    changeConnectionStatus: (state) => {
      state.isConnected = !state.isConnected;
    },
   },
});

export const { addMessage, clearMessages, changeConnectionStatus } = chatSlice.actions;

export default chatSlice.reducer;
