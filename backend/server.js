const app = require("./src/app");
const port = process.env.PORT || 5000;
const socket = require("socket.io");

const server = app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

//Socket configuration
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend app
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("ENTREI");

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log("ENTREI", userId);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
