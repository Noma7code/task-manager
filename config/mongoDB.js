const mongoose = require("mongoose");

mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB error", err));
mongoose.connection.on("disconnected", () =>
  console.log("Mongo DB disconnected")
);

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
}

module.exports = mongoConnect;
