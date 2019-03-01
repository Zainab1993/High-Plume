const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
// mongoose
//   .connect(
//     "mongodb://node-rest-shop:" +
//       process.env.MONGO_ALTAS_PW +
//       "@node-shop-shard-00-00-bfcde.mongodb.net:27017,node-shop-shard-00-01-bfcde.mongodb.net:27017,node-shop-shard-00-02-bfcde.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-shard-0&authSource=admin&retryWrites=true",
//     {
//       // useCreateIndex: true,
//       useMongoClient: true
//     }
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));
// const db = mongoose.connection;

//const autoIncrement = require("mongodb-autoincrement");
const questionsSchema = new Schema({
  q_ID: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  q_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
questionsSchema.plugin(autoIncrement.plugin, "question");
var question = mongoose.model("questions", questionsSchema);

module.exports = mongoose.model("questions", questionsSchema);
