import React, { FC } from 'react';
import { ChatBubbleProps } from '../../types/components/ChatBubble.types';

const ChatBubble: FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  const bubbleClass = isUser ? 'chat-bubble user' : 'chat-bubble bot';
  
  // Basic handling for potential links within the message text
  const renderMessageContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
      }

      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
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
