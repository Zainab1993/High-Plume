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
const savedFinancialQuestionsSchema = new Schema({
  savedFinancialId: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  cat_id: {
    type: Number
  },
  q_Id: {
    type: Number
  },
  q_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
savedFinancialQuestionsSchema.plugin(
  autoIncrement.plugin,
  "savedFinancialQuestions"
);
var savedfinancial = mongoose.model(
  "savedFinancialQuestions",
  savedFinancialQuestionsSchema
);

module.exports = mongoose.model(
  "savedFinancial",
  savedFinancialQuestionsSchema
);
