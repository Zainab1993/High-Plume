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
const annualIncomeSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  q_desc: {
    type: String,
    autoIncrement: true
  },
  amount: {
    type: Number
  }
});
autoIncrement.initialize(db);
annualIncomeSchema.plugin(autoIncrement.plugin, "annualIncomeSchema");
var annualIncome = mongoose.model("annualIncomeSchema", annualIncomeSchema);
module.exports = mongoose.model("annualIncome", annualIncomeSchema);
