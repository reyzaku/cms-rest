const moongose = require('mongoose')
const { model, Schema } = moongose

const Product = new Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang Maksimal 3 Karakter'],
        required: [true, 'Nama Harus Diisi']
    },
    description: {
        type: String,
        maxlength: [1000, 'Panjang Karakter maksimal 1000 karakter']
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, { timestamps: true })

module.exports = model('Product', Product)