const {
    validationResult
} = require('express-validator');
const productModel = require('../models/productModel');
const moment = require('moment');
const fs = require('fs-extra');
const path = require('path');

const allProduct = async (req, res, next) => {
    let products = await productModel.find()
        .populate('category')
        .populate('creator');
    products = products.map(product => {
        let today = new moment();
        let product_discount_time = moment(product.discountDate);
        let diff = product_discount_time.diff(today, 'minutes');
        if (diff <= 0) {
            product.discountPrice = null;
            product.discountDate = null;
            product.discount = null;
        }

        return product;
    })
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

    let file_name = '';
    if (req.files) {
        const images = req.files.image;
        let image_name = images.name.split('.')[0];
        let image_extension = images.name.split('.')[1];
        file_name = 'uploads/products/' + image_name + '-' + parseInt(Math.random() * 10000) + Date.now() + '.' + image_extension;
        const target_path = path.join(__dirname, '../') + "/" + file_name;
        fs.copy(images.path, target_path);
    }

    let newProduct = await new productModel({
        title,
        category,
        price,
        discount,
        discountPrice,
        discountDate,
        description,
        image: file_name,
        // creator: req.userData._id,
    }).save();
    res.status(201).json(newProduct)
}

const getProduct = async (req, res, next) => {
    let {
        id
    } = req.params;
    let category = await productModel.findOne({
        _id: id
    })
        .populate('category')
        .populate('creator');
    return res.status(200).json(category);
}

async function updateProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const {
        _id,
        title,
        category,
        price,
        discount,
        discountPrice,
        discountDate,
        description,
    } = req.body;

    let file_name = '';
    if (req.files) {
        if (req.files?.image) {
            const images = req.files.image;
            let image_name = images.name.split('.')[0];
            let image_extension = images.name.split('.')[1];
            file_name = 'uploads/products/' + image_name + '-' + parseInt(Math.random() * 10000) + Date.now() + '.' + image_extension;
            const target_path = path.join(__dirname, '../') + "/" + file_name;
            fs.copy(images.path, target_path);
        }
    }

    let updatedProduct = await productModel.updateOne({
        _id
    }, {
        title,
        category,
        price,
        discount,
        discountPrice,
        discountDate,
        description,
        image: file_name,
        // creator: req.userData._id,
    });
    res.status(201).json(updatedProduct)
}

const deleteProduct = async (req, res, next) => {
    const {
        id
    } = req.body;

    let category = await productModel.deleteOne({
        _id: id
    });

    if (category.deletedCount) {
        return res.status(200).json('Data Deleted')
    } else {
        return res.status(400).json({
            msg: 'No Data Delete',
            category
        })
    }
}



exports.allProduct = allProduct;
exports.createProduct = createProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;