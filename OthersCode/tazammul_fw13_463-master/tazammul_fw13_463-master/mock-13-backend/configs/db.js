const mongoose = require("mongoose")

module.exports = () => mongoose.connect("mongodb+srv://tazammul:turbo-fingers@cluster0.lhn5xru.mongodb.net/turbo-fingers?retryWrites=true&w=majority")