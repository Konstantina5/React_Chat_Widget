import { WebSocketClient } from './client';
import { MessageType } from '../types/websocket/messageHandlers.types';

// Handler for incoming messages
export const handleIncomingMessage = (event: MessageEvent): void => { };

// Send a message through WebSocket
export const sendMessage = (
  client: WebSocketClient,
  content: string,
  type: MessageType = MessageType.TEXT
): boolean => { 
  return true;
};
