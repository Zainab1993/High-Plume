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
const individualInfoAnsSchema = new Schema({
  Ans_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  User_id: {
    type: Number
  },
  q_desc: {
    type: String
  },
  ans: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
individualInfoAnsSchema.plugin(autoIncrement.plugin, "individualInfoAns");
var individualInfoAns = mongoose.model(
  "individualInfoAns",
  individualInfoAnsSchema
);

module.exports = mongoose.model("individualInfoAns", individualInfoAnsSchema);
