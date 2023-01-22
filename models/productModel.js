const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        required: true,
        type: 'string',
    },
    category: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'categoryModel',
    },
    price: {
        required: true,
        type: 'number',
        default: 0,
    },
    discount: {
        type: 'number',
        default: 0,
    },
    discountPrice: {
        type: 'number',
        default: 0,
    },
    discountDate: {
        type: 'date',
    },
    image: {
        required: true,
        type: 'string',
    },
    description: {
        required: true,
        type: 'string',
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel',
    }
}, {
    timestamps: true
})

const productModel = mongoose.model('productModel', productSchema);
module.exports = productModel;