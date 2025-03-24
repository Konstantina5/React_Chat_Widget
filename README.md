# React Chat Widget

A customizable React chat widget that can be easily embedded into any website. This widget provides a modern chat interface with real-time messaging capabilities through WebSockets.

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)

## Installation

### As a dependency in your project

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

### As a UMD script (global variable)

```html
<script src="https://your-cdn.com/widget/latest/react-chat-widget.umd.js"></script>
<script>
  window.MyWidget.init({
    authToken: "<YOUR_AUTHRIZATION_TOKEN>",
    apiUrl: "<YOUR_API_URL>"
  }, function(api) {
    console.log("Widget initialized!");
    
    // You can use the api to control the widget
    // For example, to unmount it:
    // api.unmount();
  });
</script>
```

### As an ES module

```javascript
import { initWidget } from 'react-chat-widget';

const api = initWidget({
  authToken: '<YOUR_AUTHRIZATION_TOKEN>',
  apiUrl: '<YOUR_API_URL>'
});

// Later, to unmount the widget:
api.unmount();
```

### As a React component

```jsx
import { Widget } from 'react-chat-widget';

function App() {
  return (
    <div>
      <Widget 
        authToken="<YOUR_AUTHRIZATION_TOKEN>"
        apiUrl="<YOUR_API_URL>"
      />
    </div>
  );
}
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start a local development server at http://localhost:5173 with the demo application that demonstrates the widget functionality.

## Building

To build the library:

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
