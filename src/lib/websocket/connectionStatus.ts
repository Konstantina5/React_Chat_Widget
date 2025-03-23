import { store } from '../state/store';
import { WebSocketClient } from './client';
import { ConnectionState, ConnectionStatus } from '../types/websocket/connectionStatus.types';

// Initial connection status
const initialStatus: ConnectionStatus = {
  state: ConnectionState.DISCONNECTED,
  lastConnected: null,
  reconnectAttempt: 0,
  error: null,
};

let currentStatus: ConnectionStatus = { ...initialStatus };

export const updateConnectionStatus = (
  state: ConnectionState,
  error: Error | null = null,
  reconnectAttempt = 0
): void => { };

export const getConnectionStatus = (): ConnectionStatus => {
  return { ...currentStatus };
};

export const setupConnectionStatusHandlers = (client: WebSocketClient): void => {
  client.connect();
};

export const resetConnectionStatus = (): void => { };
