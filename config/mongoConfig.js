const mongoose = require("mongoose");

let mongoConfig = () => {
    mongoose 
  .connect("mongodb+srv://akashsarker210:pJiEbLm5ysfZmudL@cluster0.0e3am1c.mongodb.net/")
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error: ", err));
}

module.exports = mongoConfig;