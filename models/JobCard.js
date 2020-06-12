const { Schema, model } = require("mongoose");

const jobCardSchema = new Schema ({
  employee: String,
  startTime: String,
  endTime: String,
})

module.exports = model("JobCard", jobCardSchema);