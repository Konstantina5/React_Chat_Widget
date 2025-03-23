export enum ConnectionState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}

export interface ConnectionStatus {
  state: ConnectionState;
  lastConnected: Date | null;
  reconnectAttempt: number;
  error: Error | null;
}
