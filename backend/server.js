const app = require("./src/app");
const port = process.env.PORT || 5000;
const socket = require("socket.io");

const server = app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

const frontend_app = process.env.NODE_ENV === 'development' ? "http://localhost:8080" : "https://vue-node-chat-js.vercel.app";

//Socket configuration
const io = socket(server, {
  cors: {
    origin: frontend_app, // Frontend app host
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    console.log("User connected: ", userId);
    //coloca um user como online
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    //encontra o utilizador recipiente
    const sendUserSocket = onlineUsers.get(data.to);
    //envia mensagem para o recipiente
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
