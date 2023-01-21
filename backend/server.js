const app = require("./src/app");
const port = process.env.PORT || 5000;
const socket = require("socket.io");

const server = app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

//Socket configuration
const io = socket(server, {
  cors: {
    origin: "http://localhost:8080", // Frontend app
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
    console.log(sendUserSocket);
    //envia mensagem para o recipiente
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
