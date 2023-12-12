const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
})

module.exports = mongoose.model("Product", ProductSchema) || mongoose.models.Product;