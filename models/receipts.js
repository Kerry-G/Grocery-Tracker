var mongoose = require('mongoose');

var ReceiptsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    date: Date,
    paid: Boolean,
    description: String
});

module.exports = mongoose.model('Receipts', ReceiptsSchema);