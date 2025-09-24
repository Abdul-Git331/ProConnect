const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    contact: {
    type: String,
    required: true,
  },
    secret: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Admin", adminSchema);
