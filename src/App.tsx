import { useEffect, useState, useRef } from 'react';
import './App.css';
import './lib/react-widget-wrapper.tsx';

function App() {
  const webComponentRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Function to handle file selection and upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/files', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded successfully:', result);
      } else {
        console.error('File upload failed:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Server response:', errorText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddDocumentClick = () => {
    fileInputRef.current?.click();
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
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <button className="add-button" onClick={handleAddDocumentClick}>
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
