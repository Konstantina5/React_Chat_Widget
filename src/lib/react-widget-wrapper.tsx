/**
 * React Widget Wrapper
 * 
 * Wrap the existing React components
 * in a Web Component to use them in non-React applications.
 */

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './components/Widget';
import { WidgetProps } from './types/components/Widget.types';

class ReactChatWidgetElement extends HTMLElement {
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
  
  // Get CSS styles
  private _getStyles(): string {
    return `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      
      div {
        width: 100%;
        height: 100%;
      }
      
      /* Widget styles */
      .widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
      }
      
      .widget-open-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #0073e6;
        color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        border: none;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .widget-open-button:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
      }
      
      .widget-content {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        width: 300px;
        height: 400px;
        background-color: #222;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      
      .widget-close-button {
        background: transparent;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
    `;
  }

  // Render the React component inside the Web Component
  private _render(): void {
    if (!this._root) {
      // Create a container for React
      const container = document.createElement('div');
      
      // Add styles to ensure proper rendering within shadow DOM
      const styleElement = document.createElement('style');
      styleElement.textContent = this._getStyles();
      
      this.shadowRoot?.appendChild(styleElement);
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
customElements.define('react-chat-widget', ReactChatWidgetElement);

export default ReactChatWidgetElement;
