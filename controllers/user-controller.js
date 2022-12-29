let users = [{
    email: 'user1@gmail.com',
    userName: 'user1'
  },
  { email: 'user2@gmail.com',
    userName: 'user2'
  }
]

function allUser(req, res){
  res.json(users).status(200);
}

function registerUser(req, res){ //recieve the data form frontend
    const {
        email,username,password,
    } = req.body;

    users.push({ email,username,password })

    return res.status(201).json([ //response the data
        req.body,
        users
    ]);
}

//finding the data
function getUserByEmail(req, res, next){
  email = req.params.email;
  let result = users.find(i=>i.email === email);
  res.json(result).status(200);
}

//delete the data
function deleteUserByEmail(req, res, next){
  email = req.params.email;
  let index = users.findIndex(i=>i.email === email);
  users.splice(index,1)
  res.json(users).status(200);
}

exports.allUser = allUser;
exports.registerUser = registerUser;
exports.getUserByEmail = getUserByEmail;
exports.deleteUserByEmail = deleteUserByEmail;