const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongooseConnection = require("./config/mongoose.config");

const app = express();
const authRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(morgan("dev"));
app.use(cors());

app.set("mongoose connection", mongooseConnection);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;
