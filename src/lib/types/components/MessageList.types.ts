export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp?: string;
}

export interface MessageListProps {
  messages: Message[];
}
