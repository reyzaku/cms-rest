const moongose = require('mongoose')
const { model, Schema } = moongose

const OrderItem = new Schema({
    name: {
        type: String,
        maxlength: [50,'Panjang nama makanan minimal 50 karakter'],
        required: [true, 'nama wajib diisi']
    },
    price: {
        type: Number,
        required: [true, 'Harga item harus diisi'],
        min: [1, 'Kuantitas minimal 1']
    },
    qty: {
        type: Number,
        required: [true, 'Kuantitas harus diisi'],
        min: [1, 'Kuantitas minimal 1']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
})

module.exports = model('OrderItem', OrderItem)