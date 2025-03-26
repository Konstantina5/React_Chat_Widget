# React Chat Widget Web Component

A customizable chat widget implemented as a web component that can be easily embedded into any website, regardless of the frontend framework used. This widget provides a modern chat interface with real-time messaging capabilities through WebSockets.

## Features

- **Framework-agnostic**: Works with any website or application, regardless of the technology stack
- **Shadow DOM encapsulation**: Styles are isolated and won't conflict with your existing CSS
- **Real-time messaging**: WebSocket integration for instant communication
- **Customizable**: Configure the widget through attributes or JavaScript properties
- **Modern UI**: Built with React and exposed as a standard web component

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)

## Installation

### Direct script inclusion

```html
<script src="https://your-cdn.com/widget/latest/react-chat-widget.umd.js"></script>
```

### As an npm package

```bash
npm install react-chat-widget
# or
yarn add react-chat-widget
```

### For development

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn
```

## Usage

### As a Web Component in HTML

```html
<!-- Include the script -->
<script src="https://your-cdn.com/widget/latest/react-chat-widget.umd.js"></script>

<!-- Use the web component -->
<react-chat-widget 
  auth-token="YOUR_AUTH_TOKEN" 
  api-url="YOUR_API_URL">
</react-chat-widget>
```

### Creating the Web Component programmatically

```html
<script src="https://your-cdn.com/widget/latest/react-chat-widget.umd.js"></script>
<script>
  // Create the element
  const widget = document.createElement('react-chat-widget');
  
  // Set properties
  widget.authToken = "YOUR_AUTH_TOKEN";
  widget.apiUrl = "YOUR_API_URL";
  
  // Add to the page
  document.body.appendChild(widget);
  
  // You can also update properties later
  widget.authToken = "NEW_AUTH_TOKEN";
</script>
```

### As an ES module in a modern application

```javascript
// Import the web component definition to register it
import 'react-chat-widget';

// Then use it in your HTML template
// <react-chat-widget auth-token="..." api-url="..."></react-chat-widget>

// Or create it programmatically
const widget = document.createElement('react-chat-widget');
widget.authToken = 'YOUR_AUTH_TOKEN';
widget.apiUrl = 'YOUR_API_URL';
document.body.appendChild(widget);
```

## API Reference

### Attributes/Properties

| Attribute (HTML) | Property (JS) | Type   | Description                                |
|------------------|---------------|--------|--------------------------------------------|
| `auth-token`     | `authToken`   | String | Authentication token for the chat service  |
| `api-url`        | `apiUrl`      | String | URL of the chat API                        |

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start a local development server at http://localhost:5173 with the demo application that demonstrates the widget functionality.

## Building

To build the web component:

```bash
npm run build
# or
yarn build
```

This will generate the following in the `dist` directory:
- UMD build: `react-chat-widget.umd.js`
- ES Module build: `react-chat-widget.es.js`
- TypeScript declarations: `index.d.ts`

## License

MIT
