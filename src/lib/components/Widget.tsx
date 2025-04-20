import React, { useState, useCallback } from 'react';
import { WidgetProps } from '../types/components/Widget.types';
import Header from './ui/Header';
import MessageList from './ui/MessageList';
import MessageInput from './ui/MessageInput';

const Widget: React.FC<WidgetProps> = ({
  // authToken, // Not used currently
  // apiUrl,    // Not used currently
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Placeholder messages
  const messages = [
    { id: '1', isUser: false, text: 'Welcome to this awesome chat!', timestamp: new Date().toLocaleTimeString() },
    { id: '2', isUser: true, text: 'hi there! have any new package?', timestamp: new Date().toLocaleTimeString() },
    { id: '3', isUser: false, text: 'Hello there!', timestamp: new Date().toLocaleTimeString() },
    { id: '4', isUser: false, text: 'React Chat Widget\nhttps://github.com/Wolox/react-chat-widget', timestamp: new Date().toLocaleTimeString() },
  ];

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // TODO: Add logic to send the message to the server
  };

  return (
    <div className={`widget-container ${isOpen ? 'open' : 'closed'}`}>
      {!isOpen ? (
        <button
          onClick={handleToggle}
          className="widget-toggle-button closed"
          aria-label="Open chat"
        >
          <svg width="44px" height="44px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.665 9.605H2.995C2.715 9.605 2.495 9.825 2.495 10.105V15.265C2.495 15.545 2.715 15.765 2.995 15.765H4.495V18.505L7.16501 15.765H14.665C14.945 15.765 15.165 15.545 15.165 15.265V10.105C15.165 9.825 14.935 9.605 14.665 9.605Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.175 12.655H15.165" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.83496 7.575V6.995C8.83496 6.715 9.05496 6.495 9.33496 6.495H21.005C21.275 6.495 21.505 6.715 21.505 6.995V12.325C21.505 12.505 21.365 12.655 21.185 12.655H19.505" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.83496 9.605V9.575" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.505 12.655V15.385L16.835 12.655" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      ) : (
        <div className="widget-content">
          <Header 
            title="Demo Header" 
            subtitle="A subtitle!" 
            onClose={handleToggle} 
          />
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      )}

       {isOpen && (
         <button
           onClick={handleToggle}
           className="widget-toggle-button open"
           aria-label="Close chat"
         >
            <svg width="24px" height="24px" viewBox="-0.5 0 25 25" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"/>
            </svg> 
         </button>
       )}
    </div>
  );
};

export default Widget;
