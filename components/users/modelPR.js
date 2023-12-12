const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, require: true },
    token: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },

})

module.exports = mongoose.model("PasswordReset", UserSchema) || mongoose.models.PasswordReset;