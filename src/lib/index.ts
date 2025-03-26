// Export the web component definition
import './react-widget-wrapper.tsx';

// Export types for TypeScript users
export type { WidgetProps } from './types/components/Widget.types';

// Re-export the custom element for programmatic usage
export { default as ReactChatWidgetElement } from './react-widget-wrapper.tsx';

// For UMD builds: expose global variable
if (typeof window !== 'undefined') {
  (window as any).ReactChatWidget = {
    version: '1.0.0'
  };
}
