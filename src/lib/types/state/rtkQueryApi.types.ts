export interface Message {
  id: string;
  conversationId: string;
  content: string;
  sender: string;
  timestamp: string;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  sender: string;
}

export interface GetMessagesResponse {
  messages: Message[];
}
