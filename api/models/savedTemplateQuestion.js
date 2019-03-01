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
const savedTemplateQuestionSchema = new Schema({
  savedSection_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_name: {
    type: String
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
savedTemplateQuestionSchema.plugin(
  autoIncrement.plugin,
  "savedTemplateQuestion"
);
var savedTemplateQuestion = mongoose.model(
  "savedTemplateQuestion",
  savedTemplateQuestionSchema
);

module.exports = mongoose.model(
  "savedTemplateQuestion",
  savedTemplateQuestionSchema
);
