const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const offerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("offer", offerSchema);
