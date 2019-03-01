const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
mongoose
  .connect(
    "mongodb://highplume:" +
      process.env.MONGO_ALTAS_PW +
      "localhost:27017/admin",
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const db = mongoose.connection;

//const autoIncrement = require("mongodb-autoincrement");
const selectedCategoryQuestionSchema = new Schema({
  sc_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  catSection_id: {
    type: Number,
    default: ""
  },
  q_id: {
    type: Number,
    default: ""
  },
  q_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
selectedCategoryQuestionSchema.plugin(
  autoIncrement.plugin,
  "selectedCategoryQuestion"
);
var selectedCategoryQuestion = mongoose.model(
  "selectedCategoryQuestion",
  selectedCategoryQuestionSchema
);

module.exports = mongoose.model(
  "selectedCategoryQuestion",
  selectedCategoryQuestionSchema
);
