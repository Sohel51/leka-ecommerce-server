const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller'); //import the controller

router.get('/all', (req, res) =>{
    res.json('get user');
})
router.post('/register', userController.registerUser) //using the controller

router.get('/get/:id', (req, res) =>{
    res.json('user get');
})
router.post('/update/:id', (req, res) =>{
    res.json('user update');
})
router.get('/delete/:id', (req, res) =>{
    res.json('user delete');
})

module.exports = router; //export the router