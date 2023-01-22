const {
    validationResult
} = require('express-validator');
const productModel = require('../models/productModel');

const allProduct = async (req, res, next) => {
    let products = await productModel.find()
        .populate('category')
        .populate('creator');
    return res.status(200).json(products);
}

async function createProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const {
        title,
        category,
        price,
        discount,
        discountPrice,
        discountDate,
        description,
    } = req.body;

    let newProduct = await new productModel({
        title,
        category,
        price,
        discount,
        discountPrice,
        discountDate,
        description,
        image: 'https://lh3.googleusercontent.com/ogw/AAEL6sh0WEhDDJQsqCy_4t2bEx5gfVbXTDaa186rBAMG0Q=s32-c-mo',
        // creator: req.userData._id,
    }).save();
    res.status(201).json(newProduct)
}

const getProduct = async (req, res, next) => {
}

const updateProduct = async (req, res, next) => {
}

const deleteProduct = async (req, res, next) => {
}



exports.allProduct = allProduct;
exports.createProduct = createProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;