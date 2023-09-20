const mongoose = require('mongoose');

const orderitemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  });

const Orderitem = mongoose.model('Orderitem', orderitemSchema);

module.exports = Orderitem;