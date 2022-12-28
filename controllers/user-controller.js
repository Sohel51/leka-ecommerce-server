let users = [{
    email: 'user1@gmail.com',
    userName: 'user1'
  },
  { email: 'user2@gmail.com',
    userName: 'user2'
  }
]

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

exports.registerUser = registerUser;