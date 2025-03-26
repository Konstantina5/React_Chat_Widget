/**
 * React Widget Wrapper
 * 
 * Wrap the existing React components
 * in a Web Component to use them in non-React applications.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './lib/components/Widget';
import { WidgetProps } from './lib/types/components/Widget.types';

class ReactWidgetElement extends HTMLElement {
  private _root: ReturnType<typeof createRoot> | null = null;
  
  private _authToken: string = '';
  private _apiUrl: string = '';
  
  // Define observed attributes for property reflection
  static get observedAttributes(): string[] {
    return ['auth-token', 'api-url'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  // Lifecycle: when component is added to DOM
  connectedCallback(): void {
    this._authToken = this.getAttribute('auth-token') || '';
    this._apiUrl = this.getAttribute('api-url') || '';
    
    // Initial render
    this._render();
  }
  
  // Handle attribute changes
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;
    
    // Update internal state based on attribute changes
    if (name === 'auth-token') this._authToken = newValue;
    if (name === 'api-url') this._apiUrl = newValue;
    
    // Re-render if already mounted
    if (this._root) this._render();
  }
  
  disconnectedCallback(): void {
    if (this._root) {
      this._root.unmount();
      this._root = null;
    }
  }
  
  get authToken(): string {
    return this._authToken;
  }
  
  set authToken(value: string) {
    this._authToken = value;
    this.setAttribute('auth-token', value);
  }
  
  get apiUrl(): string {
    return this._apiUrl;
  }
  
  set apiUrl(value: string) {
    this._apiUrl = value;
    this.setAttribute('api-url', value);
  }
  
  // Render the React component inside the Web Component
  private _render(): void {
    if (!this._root) {
      // Create a container for React
      const container = document.createElement('div');
      this.shadowRoot?.appendChild(container);
      this._root = createRoot(container);
    }
    
    // Create props for the React component
    const props: WidgetProps = {
      authToken: this._authToken,
      apiUrl: this._apiUrl
    };
    
    // Render the React component with props
    this._root.render(
      React.createElement(Widget, props)
    );
  }
}

// Register the custom element
customElements.define('react-chat-widget', ReactWidgetElement);

export default ReactWidgetElement;
