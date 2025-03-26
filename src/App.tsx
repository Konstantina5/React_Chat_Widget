import { useEffect, useState, useRef } from 'react';
import './App.css';
import Widget from './lib/components/Widget';
import './react-widget-wrapper.tsx';

function App() {
  const [showReactComponent, setShowReactComponent] = useState(true);
  const [showWebComponent, setShowWebComponent] = useState(false);
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

  // Update Web Component properties
  const updateWebComponent = () => {
    if (webComponentRef.current) {
      // Using properties
      (webComponentRef.current as any).authToken = authToken;
      (webComponentRef.current as any).apiUrl = apiUrl;
    }
  };

  return (
    <div className="App">
      <h1>Chat Widget Demo Page</h1>
      <p>This page demonstrates two ways to use the Chat Widget:</p>
      <ol>
        <li>As a React component (original approach)</li>
        <li>As a Web Component (new approach)</li>
      </ol>
      
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
        
        <div className="buttons">
          <h3>React Component Demo</h3>
          <button onClick={() => setShowReactComponent(!showReactComponent)}>
            {showReactComponent ? 'Hide React Component' : 'Show React Component'}
          </button>
          
          {showReactComponent && (
            <div className="component-demo">
              <Widget 
                authToken={authToken}
                apiUrl={apiUrl}
              />
            </div>
          )}
          
          <h3>Web Component Demo</h3>
          <p><em>The Web Component is automatically added to the page. Use these controls to interact with it.</em></p>
          <button onClick={() => {
            if (webComponentRef.current) {
              (webComponentRef.current as any).open = !showWebComponent;
              setShowWebComponent(!showWebComponent);
            }
          }}>
            {showWebComponent ? 'Hide Web Component' : 'Show Web Component'}
          </button>
          <button onClick={updateWebComponent}>
            Update Web Component Properties
          </button>
        </div>
      </div>
      
      <h2>Integration Example</h2>      
      <h3>Web Component Approach</h3>
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

// For TypeScript - add the MyWidget to the global Window interface
declare global {
  interface Window {
    MyWidget: {
      init: any;
    };
  }
}

export default App;