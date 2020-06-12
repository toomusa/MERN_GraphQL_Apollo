const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workLogSchema = new Schema ({
  employee: String,
  ranch: String,
  field: String,
  job: String,
  logType: String,
  startTime: String,
  endTime: String,
})

module.exports = mongoose.model("WorkLog", workLogSchema);