import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatBubbleProps } from '../../types/components/ChatBubble.types';

const ChatBubble: FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  const bubbleClass = isUser ? 'chat-bubble user' : 'chat-bubble bot';
  
  const renderMessageContent = (text: string) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  return (
    <div className={bubbleClass}>
      <div className="chat-bubble-content">
        {renderMessageContent(message)}
      </div>
      {timestamp && <span className="chat-bubble-timestamp">{timestamp}</span>}
    </div>
  );
};

export default ChatBubble;
