import { io } from "socket.io-client";
import { host } from "./config";
import { sendMessageRoute, recieveMessageRoute } from "./config.js";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(user_id) {
    this.socket = io(host);
    this.socket.emit("add-user", user_id);

    this.socket.on("msg-recieve", (msg) => {
      console.log("############################################");
      //guardar mensangem na global store
      console.log(msg);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  async recieveMessage(from_id, to_id) {
    const response = await fetch(recieveMessageRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ from: from_id, to: to_id }),
    });
    const data = await response.json();

    return data;
  }

  async sendMessage(from_id, to_id, message) {
    //1 - envia mensangem para o socket
    this.socket.emit("send-msg", { to: to_id, from: from_id, message });

    //2 - guarda na bd
    const response = await fetch(sendMessageRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ from: from_id, to: to_id, message: message }),
    });
    const data = await response.json();

    return data;
  }
}

export default new SocketioService();
