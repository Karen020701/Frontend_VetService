
export const connectWebSocket = (onMessage) => {
    const ws = new WebSocket('ws://localhost:3020');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  
    return ws;
  };
  