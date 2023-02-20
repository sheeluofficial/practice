const mongoose = require("mongoose");

module.exports = ()=>new mongoose.connect("mongodb+srv://mock-12:mock-12@cluster0.7wg64bk.mongodb.net/TSR?retryWrites=true&w=majority")