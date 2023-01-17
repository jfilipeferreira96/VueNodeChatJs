const mongoose = require("mongoose");
const database = require("./db.config");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

//Conexão à Base de Dados:
mongoose
  .connect(database.local.localUrlDatabase)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });
