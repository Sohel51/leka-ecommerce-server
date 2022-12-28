const express = require('express')
const router = express.Router();

router.get('/products', (req, res) =>{
    res.json(products);
})
router.post('/product/create', (req, res) =>{
    res.json('product create');
})
router.get('/product/get/:id', (req, res) =>{
    res.json('product get');
})
router.post('product/update/:id', (req, res) =>{
    res.json('product update');
})
router.get('/product/delete/:id', (req, res) =>{
    res.json('product delete');
})

module.exports = router;
