// WebSocket client implementation
import { WebSocketConfig } from '../types/websocket/client.types';

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectCount = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectAttempts: 5,
      reconnectInterval: 3000,
      ...config,
    };
  }

  public connect(): void {
    
  }

  public disconnect(): void {
    this.socket?.close()
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): boolean { 
    if (this.socket) {
      try {
        this.socket.send(data)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
    return false
   }

  public isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  private handleReconnect(): void { }
}

let wsClientInstance: WebSocketClient | null = null;

export const getWebSocketClient = (config?: WebSocketConfig): WebSocketClient => {
  if (!wsClientInstance && config) {
    wsClientInstance = new WebSocketClient(config);
  } else if (!wsClientInstance) {
    throw new Error('WebSocket client not initialized');
  }
  return wsClientInstance;
};

export const initWebSocketClient = (config: WebSocketConfig): WebSocketClient => {
  if (wsClientInstance) {
    wsClientInstance.disconnect();
  }
  wsClientInstance = new WebSocketClient(config);
  return wsClientInstance;
};
