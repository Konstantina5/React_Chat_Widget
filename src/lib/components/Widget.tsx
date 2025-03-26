import React, { useState, useCallback, useEffect } from 'react';
import { WidgetProps } from '../types/components/Widget.types';

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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '48px',
            padding: '12px',
            backgroundColor: '#0073e6',
            color: 'white'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>My Widget</h3>
            <button
              aria-label="Close widget"
              onClick={handleClose}
              style={{marginRight: '16px'}}
              className="widget-close-button"
            >
              ×
            </button>
          </div>
          <div style={{
            padding: '16px',
            flex: '1',
            overflowY: 'auto',
            backgroundColor: 'white'
          }}>
            <p style={{ marginBottom: '8px' }}>Hello from your embedded widget!</p>
            <p style={{ fontSize: '14px', marginBottom: '4px' }}>Authorization Token: {authToken}</p>
            <p style={{ fontSize: '14px' }}>API URL: {apiUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;
