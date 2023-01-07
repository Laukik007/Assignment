const express = require("express");
const connectDB = require("./db");
var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(__dirname + "/app.log", {
  flags: "w",
});
var log_stdout = process.stdout;

//overriding console.log function to print in app.log file
console.log = function (e) {
  log_file.write(util.format("event --> %s %s", e, Date.now()) + "\n");
  log_stdout.write(util.format("event --> %s %s", e, Date.now()) + "\n");
};

const PORT = 8080;
const app = express();

// initializing mongodb server
connectDB();

class Events {
  on(eventName, callback) {
    //saving the eventName to mongoDB
    const result = new Event({
      event: eventName,
    });
    result.save();
    callback();
  }

  trigger(eventName) {
    //saving the eventName to mongoDB
    const result = new Event({
      event: eventName,
    });
    result.save();
  }

  off(eventName) {
    //saving the eventName to mongoDB
    const result = new Event({
      event: eventName,
    });
    result.save();
  }
}
//creating event object
const obj = Events();

//listening to PORT
app.listen(PORT);

// Post controllers
app.post("/on", (req, res) => {
  const { event } = res.body;
  obj.on(event);
});
app.post("/trigger", (req, res) => {
  const { event } = res.body;
  obj.trigger(event);
});
app.post("/off", (req, res) => {
  const { event } = res.body;
  obj.off(event);
});
