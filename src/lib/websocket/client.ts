// WebSocket client implementation
import { addMessage, changeConnectionStatus } from '../state/slices/chatSlice';
import { WebSocketConfig } from '../types/websocket/client.types';
import { WebSocketMessage } from '../types/websocket/messageHandlers.types';
import { Dispatch } from '@reduxjs/toolkit';

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectCount = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private dispatch: Dispatch;

  constructor(config: WebSocketConfig, dispatch: Dispatch) {
    this.config = {
      reconnectAttempts: 5,
      reconnectInterval: 3000,
      ...config,
    };

    this.dispatch = dispatch;
  }

  public connect(): void {
    if (!this.config.url) {
      console.error("WebSocket URL is not configured.");
      return;
    }
    this.disconnect();
    this.socket = new WebSocket(this.config.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.dispatch(changeConnectionStatus(true));
      this.reconnectCount = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const messageData: WebSocketMessage = JSON.parse(event.data);
        this.dispatch(addMessage(messageData));
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    this.socket.onerror = () => {
      // setError("WebSocket error occurred");
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.dispatch(changeConnectionStatus(false))
    };
  }

  public disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onerror = null;
      this.socket.onclose = null;
      this.socket.close();
      this.socket = null;
      console.log('WebSocket explicitly disconnected');
      this.dispatch(changeConnectionStatus(false));
    }
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): boolean {
    if (this.isConnected()) {
      try {
        this.socket!.send(data);
        return true;
      } catch (error) {
        console.error("Error sending message:", error);
        return false;
      }
    } else {
      console.error("Cannot send message: WebSocket is not connected.");
      return false;
    }
  }

  public isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  private handleReconnect(): void { }
}
