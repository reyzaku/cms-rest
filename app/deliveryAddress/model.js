const mongoose = require('mongoose')
const {model, Schema} = mongoose

const DeliveryAddress = new Schema({
    nama: {
        type: String,
        required: [true, 'Nama Harus Diisi'],
        maxlength: [255, 'Maksimal Karakter 255']
    },
    kelurahan: {
        type: String,
        required: [true, 'Kelurahan wajib diisi'],
        maxlength: [255, 'Maksimal karakter 255']
    },
    kecamatan: {
        type: String,
        required: [true, 'Kecamatan wajib diisi'],
        maxlength: [255, 'Maksimal karakter 255']
    },
    kabupaten: {
        type: String,
        required: [true, 'Kabupaten wajib diisi'],
        maxlength: [255, 'Maksimal karakter 255']
    },
    provinsi: {
        type: String,
        required: [true, 'Provinsi wajib diisi'],
        maxlength: [255, 'Maksimal karakter 255']
    },
    detail: {
        type: String,
        required: [true, 'Detail wajib diisi'],
        maxlength: [1000, 'Maksimal karakter 1000']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true})

module.exports = model('DeliveryAddress', DeliveryAddress)