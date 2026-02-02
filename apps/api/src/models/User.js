const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true, required: true },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    role: {
      type: String,
      enum: ['admin', 'manager', 'delivery', 'client'],
      default: 'client'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
