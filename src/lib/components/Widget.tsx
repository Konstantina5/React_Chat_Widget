import React, { useState, useCallback } from 'react';
import { WidgetProps } from '../types/components/Widget.types';
import '../styles/Widget.css';

const Widget: React.FC<WidgetProps> = ({ 
  authToken, 
  apiUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  return (
    <div className={`${isOpen ? 'open' : 'closed'}`}>
      {!isOpen ? (
        <button
          onClick={handleOpen}
          className="widget-open-button"
        >
          Open
        </button>
      ) : (
        <div className="widget-content">
          <div className="widget-header">
            <h3 className="widget-title">My Widget</h3>
            <button
              aria-label="Close widget"
              onClick={handleClose}
              className="widget-close-button"
            >
              ×
            </button>
          </div>
          <div className="widget-body">
            <p className="widget-message">Hello from your embedded widget!</p>
            <p className="widget-info">Authorization Token: {authToken}</p>
            <p className="widget-info">API URL: {apiUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;
