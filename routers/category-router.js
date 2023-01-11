const express = require('express');
const authMiddleWare = require('../middleware/authMiddleWare');
const router = express.Router();
const categoryController = require ('../controllers/category-controller');

router.use(authMiddleWare);

router.get('/all', categoryController.allCategory)
router.post('/create', categoryController.createCategory)
router.get('/get/:id', categoryController.gateCategory)
router.post('/update', categoryController.updateCategory)
router.post('/delete', categoryController.deleteCategory)

module.exports = router;