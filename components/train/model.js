const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: { type: String },
    points: { type: Number },
    time: { type: Number }

})

module.exports = mongoose.model("Player", PlayerSchema) || mongoose.models.Player;