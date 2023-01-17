const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongooseConnection = require("./config/mongoose.config");

const app = express();

const routes = require("./routes/index");
const userRoutes = require("./routes/user.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(morgan("dev"));
app.use(cors());

app.set("mongoose connection", mongooseConnection);

app.use(routes);
app.use("/api/v1/", userRoutes);

module.exports = app;
