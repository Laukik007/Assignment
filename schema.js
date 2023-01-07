const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
  event: {
    type: String,
  },
  triggerTime: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
