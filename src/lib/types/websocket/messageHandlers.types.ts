export enum MessageType {
  TEXT = 'text',
}

export interface WebSocketMessage {
  type: MessageType;
  text: string;
  isUser: boolean;
  timestamp?: string;
}
