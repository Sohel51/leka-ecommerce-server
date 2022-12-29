const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller'); //import the controller

router.get('/all', userController.allUser)

router.post('/register', userController.registerUser) //using the controller

router.get('/get/:email', userController.getUserByEmail)

router.post('/update/:id', (req, res) =>{
    res.json('user update');
})
router.get('/delete/:email', userController.deleteUserByEmail)

module.exports = router; //export the router