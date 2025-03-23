import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './components/Widget';
import { WidgetProps } from './types/components/Widget.types';

// Export the component for direct imports
export { Widget };
export type { WidgetProps };

// Widget API type
interface WidgetAPI {
  unmount: () => void;
}

// Export initialization function
export function initWidget(config: WidgetProps, callback?: (api: WidgetAPI) => void): WidgetAPI {
  // Create container if needed
  let container = document.getElementById('my-widget-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'my-widget-container';
    document.body.appendChild(container);
  }
  
  const root = createRoot(container);
  root.render(React.createElement(Widget, config));
  
  const api = {
    unmount: () => {
      root.unmount();
      if (container?.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  };
  
  if (typeof callback === 'function') {
    callback(api);
  }
  
  return api;
}

// For UMD builds: expose global variable
if (typeof window !== 'undefined') {
  (window as Window).MyWidget = {
    init: initWidget
  };
}
