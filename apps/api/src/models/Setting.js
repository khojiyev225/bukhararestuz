const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, default: 'BUKHARAREST.UZ' },
    heroImageUrl: { type: String, default: '' },
    gallery: [{ type: String }],
    address: { type: String, default: '' },
    phone: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', SettingSchema);
