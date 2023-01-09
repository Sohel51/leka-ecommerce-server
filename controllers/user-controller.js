const { validationResult } = require('express-validator');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = [{
  email: 'user1@gmail.com',
  userName: 'user1'
},
{
  email: 'user2@gmail.com',
  userName: 'user2'
}
]

async function allUser(req, res) {
  let dbUsers = await userModel.find();
  res.json(dbUsers).status(200);
}

async function createUser(req, res, next) {

  const {
    email,
    username,
    phone,
  } = req.body;

  let newUser = await new userModel({
    email,
    username,
    phone,
  }).save();

  res.status(201).json([
    req.body,
    users
  ])
}

// register a new user
async function registerUser(req, res, next) { //recieve the data form frontend 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  const {
    email, username, password,
  } = req.body;

  let hashPassword = await bcrypt.hash(password, 10);

  let newUser = await new userModel({
    email, username,
    password: hashPassword,
  }).save();

  let token = await jwt.sign({ email, username, _id: newUser._id }, 'do_not_share');

  return res.status(201).json({ email, username, role: newUser.role, token, });
}

// login previous user
async function loginUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  email = req.body.email;
  password = req.body.password;

  let user = await userModel.findOne({
    email
  });

  if (user) {
    // checking password
    let checkPass = await bcrypt.compare(password, user.password);
    if (checkPass) {
      const { email, username, phone, role, _id, } = user;
      let token = await jwt.sign({ email, username, _id }, 'do_not_share');
      return res.status(200).json({
        email, username, role, phone, token
      });
    } else {
      let errors = {
        errors: [{
          param: 'password',
          msg: 'Password Incorrect'
        }],
        msg: 'Validation Error'
      };
      return res.status(422).json(errors);
    }
  } else {
    return res.status(404).json("User Not Found");
  }
}

//finding the data
async function getUserByEmail(req, res, next) {
  id = req.params.id;
  // let result = users.find(i => i.email === email);
  let user = await userModel.findById(id);
  res.status(200).json({ user, data: req.userData });
}

async function checkUser(req, res, next) {
  id = req.userData._id;
  let user = await userModel.findById(id);
  res.status(200).json({
    username: user.username,
    email: user.email,
    role: user.role,
    phone: user.phone,
  });
}

async function checkUserAuth(req, res, next) {
  console.log(req.userData);
}

//delete the data
function deleteUserByEmail(req, res, next) {
  email = req.params.email;
  let index = users.findIndex(i => i.email === email);
  users.splice(index, 1)
  res.status(200).json(users);
}

exports.allUser = allUser;
exports.createUser = createUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUserByEmail = getUserByEmail;
exports.checkUser = checkUser;
exports.checkUserAuth = checkUserAuth;
exports.deleteUserByEmail = deleteUserByEmail;