const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true, default: this.email },
    password: { type: String, require: true },
    role: { type: String, require: true, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
    lastToken: { type: String, default: '' },
    name: { type: String, default: 'X dep trai' },
    avatar: { type: String, default: 'https://cdnb.artstation.com/p/assets/images/images/069/793/215/4k/max-viekovshynin-bwshot1-5.jpg?1701033692' },


})

module.exports = mongoose.model("User", UserSchema) || mongoose.models.User;