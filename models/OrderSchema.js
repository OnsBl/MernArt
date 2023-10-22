
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    Title: String,
    user:{ type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    buyer:{ type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    work:{ type : mongoose.Schema.Types.ObjectId, ref: 'Work'},
    Qty: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
     
}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order