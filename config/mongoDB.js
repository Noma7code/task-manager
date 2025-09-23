const mongoose = require("mongoose");

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoConnect;
