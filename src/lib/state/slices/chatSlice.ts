import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from '../../types/state/chatSlice.types';
import { WebSocketMessage } from '../../types/websocket/messageHandlers.types';
import { Message } from '../../types/components/MessageList.types';

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
    // Add a message sent TO the user
    addMessage: (state, action: PayloadAction<WebSocketMessage>) => {
      const wsMessage = action.payload;
      
      const newMessage: Message = {
        id: wsMessage.timestamp || new Date().toISOString(),
        text: wsMessage.text,
        isUser: false,
        timestamp: wsMessage.timestamp || new Date().toLocaleTimeString(),
      };
      state.messages.push(newMessage);
    },

    // Add a message sent BY the user
    addUserMessage: (state, action: PayloadAction<Message>) => {
      const userMessage = { ...action.payload, isUser: true };
      state.messages.push(userMessage);
    },
    clearMessages: (state) => {
      state.messages = [];
    },

    changeConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
   },
});


export const { addMessage, addUserMessage, clearMessages, changeConnectionStatus } = chatSlice.actions;

export default chatSlice.reducer;
