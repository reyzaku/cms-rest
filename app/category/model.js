const moongose = require('mongoose')
const {model, Schema} = moongose

let Category = new Schema ({
    name: {
        type: String,
        minlength: [3, 'Panjang Karakter Minimal 3 '],
        maxlength: [20, 'Panjang Karakter Maksimal 20'],
        required: [true, 'Nama Harus Diisi']
    }
})

module.exports = model('Category', Category)