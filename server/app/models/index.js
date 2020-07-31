var url = 'mongodb+srv://levuhuynh:levuhuynh1@cluster0.sdlqc.mongodb.net/QLSV?retryWrites=true&w=majority';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.users = require("./users.js")(mongoose);



module.exports = db;