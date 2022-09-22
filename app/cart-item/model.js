const mongoose = require('mongoose')
const {model, Schema} = mongoose

const cartItem = new Schema({
    name:{
        type: String,
        required: [true, 'Nama wajib diisi'],
        maxlength: [50, 'Minimal 50 karakter']
    },
    qty: {
        type: Number,
        required: [true, 'Qty Wajib diisi'],
        min: [1, 'Minimal qty adalah 1']
    },
    price: {
        type: Number,
        default : 0
    },
    image_url: String,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

module.exports = model('CartItem', cartItem)