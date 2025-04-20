import React, { FC, useEffect, useRef } from 'react';
import { MessageListProps } from '../../types/components/MessageList.types';
import ChatBubble from './ChatBubble';

const MessageList: FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg.text}
          isUser={msg.isUser}
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
