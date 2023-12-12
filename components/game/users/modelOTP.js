const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, require: true },
    OTP: { type: Number, require: true, unique: true },
    timeCre: { type: Date, default: mongoose.now },
    confirm: { type: Boolean, default: false }

})

module.exports = mongoose.model("OTP", UserSchema) || mongoose.models.OTP;