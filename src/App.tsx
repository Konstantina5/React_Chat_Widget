import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [widgetAPI, setWidgetAPI] = useState<any>(null);

  useEffect(() => {
    // Load the widget when the demo page loads
    const loadWidget = () => {
      if (window.MyWidget) {
        const api = window.MyWidget.init({
          deploymentId: 'demo-123',
          apiUrl: 'https://api.example.com/widget',
        }, () => {
          console.log('Widget initialized via callback!');
        });
        
        setWidgetAPI(api);
      }
    };
    
    // If the library is already loaded in development mode
    if (typeof window.MyWidget !== 'undefined') {
      loadWidget();
    } else {
      // In production, load from CDN
      import('./lib/index').then((module) => {
        window.MyWidget = { init: module.initWidget };
        loadWidget();
      });
    }
    
    return () => {
      if (widgetAPI && widgetAPI.unmount) {
        widgetAPI.unmount();
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>Widget Demo Page</h1>
      <p>This page demonstrates how the widget works when embedded on a website.</p>
      
      <h2>Integration Example</h2>
      <pre>
        {`<script src="https://your-cdn.com/widget/latest/my-widget.umd.js"></script>
          <script>
            window.MyWidget.init({
              deploymentId: "<YOUR_DEPLOYMENT_ID>",
              apiUrl: "<YOUR_API_URL>",
            }, function(api) {
              console.log("Widget initialized!");
            });
          </script>`
        }
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