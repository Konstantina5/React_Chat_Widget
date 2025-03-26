import { useEffect, useState, useRef } from 'react';
import './App.css';
import './lib/react-widget-wrapper.tsx';

/**
 * App Component
 * 
 * This component is only used for development and preview purposes.
 * It demonstrates how to use the React Chat Widget as a web component.
 */
function App() {
  const [authToken, setAuthToken] = useState('demo-123');
  const [apiUrl, setApiUrl] = useState('https://api.example.com/widget');
  const webComponentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Initialize the Web Component
    if (customElements.get('react-chat-widget')) {
      const webComponent = document.createElement('react-chat-widget') as HTMLElement;
      webComponent.setAttribute('auth-token', authToken);
      webComponent.setAttribute('api-url', apiUrl);
      document.body.appendChild(webComponent);
      webComponentRef.current = webComponent;
    }
    
    return () => {
      // Clean up Web Component
      if (webComponentRef.current) {
        document.body.removeChild(webComponentRef.current);
        webComponentRef.current = null;
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>React Chat Widget - Development Preview</h1>
      <p>This page demonstrates the React Chat Widget as a web component.</p>
      
      <div className="demo-controls">
        <div className="form-group">
          <label>
            Auth Token:
            <input 
              type="text" 
              value={authToken} 
              onChange={(e) => setAuthToken(e.target.value)}
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            API URL:
            <input 
              type="text" 
              value={apiUrl} 
              onChange={(e) => setApiUrl(e.target.value)}
            />
          </label>
        </div>
      </div>
      
      <h2>Integration Example</h2>
      <pre>
        {`<!-- Include the Web Component script -->
<script type="module" src="https://your-cdn.com/widget/latest/react-chat-widget.js"></script>

<!-- Use it in your HTML -->
<react-chat-widget 
  auth-token="${authToken}" 
  api-url="${apiUrl}"
></react-chat-widget>

<!-- Or create it programmatically -->
<script>
  const widget = document.createElement('react-chat-widget');
  widget.authToken = "${authToken}";
  widget.apiUrl = "${apiUrl}";
  document.body.appendChild(widget);
</script>`}
      </pre>
    </div>
  );
}

// For TypeScript - add the ReactChatWidget to the global Window interface
declare global {
  interface Window {
    ReactChatWidget: {
      version: string;
    };
  }
}

export default App;
