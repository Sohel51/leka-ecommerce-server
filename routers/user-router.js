const express = require('express');
const { body, check } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user-controller'); //import the controller
const userModel = require('../models/userModel');
const authMiddleWare = require('../middleware/authMiddleWare');


router.get('/all', userController.allUser)

router.post('/login',
    //  creating vaildation
    [
        body('email')
            .normalizeEmail()
            .notEmpty().withMessage('Email is Empty')
            .isEmail().withMessage('This not Email Type')
            // checking user availbe or not
            .custom(async (value) => {
                let user = await userModel.findOne({
                    email: value
                })
                if (!user) {
                    return Promise.reject('You Dont Have any Account');
                }
            }).withMessage('No User Found Login First'),

        body('password')
            .not().isEmpty().withMessage('Pasword is Required')
            .isLength({
                min: 6,
            }).withMessage('Min Length 6')
    ],
    userController.loginUser) //using the controller

router.post('/register',
    //  creating vaildation
    [
        // username must be an email
        body('email')
            .normalizeEmail()
            .notEmpty().withMessage('Email is Empty')
            .isEmail().withMessage('This not Email Type')
            // checking user availbe or not
            .custom(async (value) => {
                let user = await userModel.findOne({
                    email: value
                })
                if (user) {
                    return Promise.reject('Already Have an Account')
                }
            }).withMessage('User Already Exist'),

        // required username
        check('username')
            .not().isEmpty().withMessage('Username is Required'),

        // password must be at least 6 char long
        body('password')
            .not().isEmpty().withMessage('Pasword is Required')
            .isLength({
                min: 6,
            }).withMessage('Min Length 6')
    ],

    userController.registerUser) //using the controller

router.use(authMiddleWare);

router.get('/check-user/:id', userController.checkUser) 

router.get('/get/:id', userController.getUserByEmail) 

router.post('/update/:id', (req, res) => {
    res.json('user update');
})
router.get('/delete/:email', userController.deleteUserByEmail)

module.exports = router; //export the router