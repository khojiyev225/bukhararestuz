const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: '' },
    category: { type: String, default: 'main' },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', MenuItemSchema);
