const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    deliveryAddress: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'in_delivery', 'completed', 'cancelled'],
      default: 'pending'
    },
    assignedDelivery: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
