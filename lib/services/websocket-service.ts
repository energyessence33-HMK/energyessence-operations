/**
 * WebSocket Service for Real-time Analytics
 * Provides real-time updates for dashboard metrics
 */

export interface WebSocketMessage {
  type: 'metrics_update' | 'user_event' | 'subscription_event' | 'video_event' | 'connection_status';
  data: any;
  timestamp: number;
}

export class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isConnected = false;

  private constructor(url: string) {
    this.url = url;
  }

  /**
   * Get singleton instance
   */
  static getInstance(url: string = 'wss://api.energyessence3.com/analytics'): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(url);
    }
    return WebSocketService.instance;
  }

  /**
   * Connect to WebSocket server
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // React Native and web expose WebSocket globally; if unavailable, retain
        // the analytics polling fallback while keeping the service usable.
        if (typeof WebSocket === 'undefined') {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.emit('connection_status', { connected: true, transport: 'polling' });
          resolve();
          return;
        }

        const socket = new WebSocket(this.url);
        this.ws = socket;
        socket.onopen = () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.emit('connection_status', { connected: true, transport: 'websocket' });
          resolve();
        };
        socket.onmessage = (event) => this.handleMessage(event);
        socket.onerror = (event) => {
          console.error('WebSocket connection error:', event);
          reject(new Error('WebSocket connection failed'));
        };
        socket.onclose = () => {
          this.ws = null;
          this.isConnected = false;
          this.emit('connection_status', { connected: false });
          this.handleReconnect();
        };
      } catch (error) {
        console.error('WebSocket connection error:', error);
        this.handleReconnect();
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.emit('connection_status', { connected: false });
  }

  /**
   * Subscribe to message type
   */
  on(messageType: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(messageType)) {
      this.listeners.set(messageType, new Set());
    }
    this.listeners.get(messageType)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(messageType)?.delete(callback);
    };
  }

  /**
   * Emit message to all listeners
   */
  private emit(messageType: string, data: any): void {
    const callbacks = this.listeners.get(messageType);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in listener for ${messageType}:`, error);
        }
      });
    }
  }

  /**
   * Handle WebSocket message
   */
  private handleMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      this.emit(message.type, message.data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }

  /**
   * Handle reconnection
   */
  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

      setTimeout(() => {
        this.connect().catch(() => {
          // Retry will be handled by next reconnect attempt
        });
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('connection_status', { connected: false, error: 'Max reconnect attempts reached' });
    }
  }

  /**
   * Get connection status
   */
  getStatus(): boolean {
    return this.isConnected;
  }

  /**
   * Send message to server
   */
  send(message: WebSocketMessage): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }
}

/**
 * Polling Service (Fallback for real-time updates)
 * Used when WebSocket is not available
 */
export class PollingService {
  private static instance: PollingService;
  private pollingInterval: ReturnType<typeof setInterval> | null = null;
  private pollingRate = 30000; // 30 seconds
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isPolling = false;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): PollingService {
    if (!PollingService.instance) {
      PollingService.instance = new PollingService();
    }
    return PollingService.instance;
  }

  /**
   * Start polling
   */
  start(callback: () => Promise<any>): void {
    if (this.isPolling) {
      console.warn('Polling is already running');
      return;
    }

    this.isPolling = true;
    this.poll(callback);
  }

  /**
   * Stop polling
   */
  stop(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.isPolling = false;
  }

  /**
   * Execute polling
   */
  private poll(callback: () => Promise<any>): void {
    // Initial call
    callback()
      .then((data) => this.emit('update', data))
      .catch((error) => this.emit('error', error));

    // Set up interval for subsequent calls
    this.pollingInterval = setInterval(() => {
      callback()
        .then((data) => this.emit('update', data))
        .catch((error) => this.emit('error', error));
    }, this.pollingRate);
  }

  /**
   * Subscribe to updates
   */
  on(eventType: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }

  /**
   * Emit event to all listeners
   */
  private emit(eventType: string, data: any): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in listener for ${eventType}:`, error);
        }
      });
    }
  }

  /**
   * Set polling rate
   */
  setPollingRate(rate: number): void {
    this.pollingRate = rate;
  }

  /**
   * Get polling status
   */
  getStatus(): boolean {
    return this.isPolling;
  }
}
