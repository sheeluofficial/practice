const { connect } = require("mongoose");
module.exports = () =>
  connect(
    "mongodb+srv://mock-12:mock-12@cluster0.7wg64bk.mongodb.net/mock-15?retryWrites=true&w=majority"
  );
