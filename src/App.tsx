import { useEffect, useState, useRef } from 'react';
import './App.css';
import './lib/react-widget-wrapper.tsx';
import { WebSocketClient } from './lib/websocket/client.ts';
import { WebSocketConfig } from './lib/types/websocket/client.types.ts';
import { setupConnectionStatusHandlers } from './lib/websocket/connectionStatus.ts';

function App() {
  const webComponentRef = useRef<HTMLElement | null>(null);
  const ws = new WebSocketClient({} as WebSocketConfig);
  setupConnectionStatusHandlers(ws);

  useEffect(() => {
    if (customElements.get('react-chat-widget')) {
      const webComponent = document.createElement('react-chat-widget') as HTMLElement;
      document.body.appendChild(webComponent);
      webComponentRef.current = webComponent;
    }
    
    return () => {
      if (webComponentRef.current) {
        document.body.removeChild(webComponentRef.current);
        webComponentRef.current = null;
      }
    };
  }, []);

  const [selectedArticle, setSelectedArticle] = useState("Chunk 1 of document");
  const [searchQuery, setSearchQuery] = useState("");
  const [content, setContent] = useState("Test body of the article");

  const handleArticleClick = (article: string) => {
    setSelectedArticle(article);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-title">RAG</h2>
        
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search in documents"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button className="add-button">
          <span style={{ marginRight: '5px' }}>+</span>
          Add new document
        </button>
        
        <div className="article-list">
          <div className="article-group">Name of the document</div>
          <div 
            className={`article-item ${selectedArticle === "Chunk 1 of document" ? "active" : ""}`}
            onClick={() => handleArticleClick("Chunk 1 of document")}
          >
            Chunk 1 of document
          </div>
          <div 
            className={`article-item ${selectedArticle === "Chunk 2 of document" ? "active" : ""}`}
            onClick={() => handleArticleClick("Chunk 2 of document")}
          >
            Chunk 2 of document
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="editor-container">
          <div className="form-group">
            <label className="form-label">Content</label>
              <div 
                className="editor-content"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setContent(e.currentTarget.textContent || '')}
              >
                {content}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// For TypeScript - add the ReactChatWidget to the global Window interface
declare global {
  interface Window {
    ReactChatWidget: {
      version: string;
    };
  }
}

export default App;
