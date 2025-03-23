export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
  ERROR = 'error',
  CONNECTION = 'connection',
}

export interface WebSocketMessagePayload {
  content?: string;
  message?: string;
  connected?: boolean;
  [key: string]: unknown;
}

export interface WebSocketMessage {
  type: MessageType;
  payload: WebSocketMessagePayload;
  timestamp?: string;
}
