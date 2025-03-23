/**
 * Loader script for the widget
 * This would be built separately and hosted on a CDN
 */
(function() {
    // Create namespace if it doesn't exist
    window.MyWidgetLoader = window.MyWidgetLoader || {};
    
    // Main initialization function
    window.MyWidgetLoader.init = function(config, callback) {
      // Prevent double initialization
      if (document.getElementById('my-widget-script')) {
        console.warn('Widget already initialized');
        return null;
      }
      
      // Load the widget script
      const script = document.createElement('script');
      script.id = 'my-widget-script';
      script.src = 'https://your-cdn.com/widget/latest/my-widget.umd.js';
      script.onload = function() {
        if (window.MyWidget && typeof window.MyWidget.init === 'function') {
          const widgetAPI = window.MyWidget.init(config, callback);
          return widgetAPI;
        }
      };
      document.head.appendChild(script);
    };
  })();