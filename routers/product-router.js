const express = require('express')
const router = express.Router();
const productController = require('../controllers/product-controller')
const {
    check
} = require('express-validator');

router.get('/all', productController.allProduct)

router.post('/create', [
    check('title')
        .not().isEmpty().withMessage('Title is Required'),

    check('price')
        .not().isEmpty().withMessage('Price is Required'),

    check('category')
        .not().isEmpty().withMessage('Category is Required'),

    check('image')
        .custom((value, { req }) => {
            if (req.files.image.size == 0) {
                return Promise.reject('Image is Required');
            } else {
                return true;
            }
        }),
    
    check ('description')
        .not().isEmpty().withMessage('Description is Required'),

], productController.createProduct)

router.get('/get/:id', productController.getProduct)
router.post('/update/:id', productController.updateProduct)
router.get('/delete/:id', productController.deleteProduct)

module.exports = router;
