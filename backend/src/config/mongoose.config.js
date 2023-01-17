const mongoose = require('mongoose');
const database = require('./db.config');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

//Conexão à Base de Dados:
mongoose.connect(database.local.localUrlDatabase, function(err, db) {
    if (err) throw err;
    console.log("A Base de Dados foi conectada com sucesso!");
    db.close();
}).catch((e) => console.log("No connection"));
