const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    data: { type: String },

})

module.exports = mongoose.model("UserGame", UserSchema) || mongoose.models.UserGame;