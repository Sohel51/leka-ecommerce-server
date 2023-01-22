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

    return res.json(req.body);

    const {
        title,
        parent,
    } = req.body;

    let newProduct = await new productModel({
        title,
        parent,
        creator: req.userData._id,
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