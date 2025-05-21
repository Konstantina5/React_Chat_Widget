# React Chat Widget Web Component

A customizable chat widget implemented as a web component that can be easily embedded into any website, regardless of the frontend framework used. This widget provides a modern chat interface with real-time messaging capabilities through WebSockets.

## Features

- **Framework-agnostic**: Works with any website or application, regardless of the technology stack
- **Shadow DOM encapsulation**: Styles are isolated and won't conflict with your existing CSS
- **Real-time messaging**: WebSocket integration for instant communication
- **Modern UI**: Built with React and exposed as a standard web component

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)

### For development

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn
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
