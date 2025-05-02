export class WSHandler {

  constructor(onMessageCallback) {
    const ws = new WebSocket("ws://"+location.host+"/ws");

    ws.onmessage = (event) => {
      onMessageCallback(JSON.parse(event.data));
    };

    ws.onerror = () => {
      this.connected = false;
      console.log("Failed to establish websocket connection");
    };

    ws.onopen = () => {
      this.connected = true;
      console.log("Connected to websocket");
    }

    ws.onclose = () => {
      this.connected = false;
      console.log("Websocket connection closed");
    };
  }

}

export function parseWsData(wsData) {
  return {
    "time": wsData.time ?? 0,
    "a": {
      "speed": parseFloat(wsData.a?.speed ?? 0),
      "distance": parseFloat(wsData.a?.distance ?? 0)
    },
    "b": {
      "speed": parseFloat(wsData.b?.speed ?? 0),
      "distance": parseFloat(wsData.b?.distance ?? 0)
    }
  };
}
