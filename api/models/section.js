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
const sectionSchema = new Schema({
  section_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_name: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
sectionSchema.plugin(autoIncrement.plugin, "section");
var section = mongoose.model("section", sectionSchema);

module.exports = mongoose.model("section", sectionSchema);
