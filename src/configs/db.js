const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://rushpandav96:7249840809r@cluster0.acime.mongodb.net/books?retryWrites=true&w=majority"
  );
};
