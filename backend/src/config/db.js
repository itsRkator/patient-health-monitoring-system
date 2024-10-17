const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("Attempting to connecting to Database...");
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to database successfully..."))
    .catch((error) => {
      console.error("Failed to connect to Database: ", error.message);
      console.log("Retrying in 5 Seconds...");
      setTimeout(connectDatabase, 5000);
    });
};

module.exports = connectDatabase;
