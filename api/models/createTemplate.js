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
const TemplateSchema = new Schema({
  Template_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  Template_cat_name: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
TemplateSchema.plugin(autoIncrement.plugin, "Template");
var Template = mongoose.model("Template", TemplateSchema);

module.exports = mongoose.model("Template", TemplateSchema);
